import React, { Component } from "react";
import { Form, Input, Button, Card, notification, Row, Col } from "antd";
import Config from "../../Config";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isRegistered: false,
    };

    this.formRef = React.createRef();
    this.onFinish = this.onFinish.bind(this);
  }

  onFinish(values) {
    this.setState({ isLoading: true });

    fetch(Config.API_URL + "auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.c_password,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            this.setState({ isLoading: false, isRegistered: true });
            notification["success"]({
              message: "Registration Successfull",
              description:
                "Thank yor registration. Please login in your account from login section.",
            });
            this.formRef.current.resetFields();
          });
        } else {
          response.json().then((data) => {
            notification["error"]({
              message: data.message,
            });
            this.setState({ isLoading: false });
          });
        }
      })
      .catch((error) => {
        notification["error"]({
          message: "Server Issue",
        });
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <Card title="User Signup">
        <Form
          name="register"
          layout="vertical"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          ref={this.formRef}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid e-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your e-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  () => ({
                    validator(rule, value) {
                      if (
                        !/^(?=.*?[A-Za-z])(?=(.*[\d]){2})(?=(.*[\W]){2})(?!.*\s).{8}$/.test(
                          value
                        )
                      ) {
                        return Promise.reject(
                          "Password should be eight characters exactly, at least two number and two special character."
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Confirm Password"
                name="c_password"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.isLoading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

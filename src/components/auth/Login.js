import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Form, Input, Button, Card, Row, Col, notification } from "antd";
import Config from "../../Config";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoggedIn: (localStorage.getItem("token") !== null) ? true : false,
    };

    this.onFinish = this.onFinish.bind(this);
  }

  onFinish(values) {
    this.setState({ isLoading: true });

    fetch(Config.API_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        remember_me: true,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            localStorage.setItem("token", data.access_token);
            window.location.href = Config.APP_URL;
          });
        } else {
          response.json().then((data) => {
            notification["error"]({
              message: data.message
            });
            this.setState({ isLoading: false });
          });
        }
      })
      .catch((error) => {
        notification["error"]({
          message: "Server Issue"
        });
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoggedIn ? <Redirect to="user-list"></Redirect> : ""}

        <Row>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12, offset: 6 }}
            md={{ span: 10, offset: 7 }}
            lg={{ span: 8, offset: 8 }}
          >
            <Card title="User Login">
              <Form
                layout="vertical"
                name="login"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={this.state.isLoading}
                  >
                    Login
                  </Button>
                  <Link className="register-page-link" to="/">Don't have an account ? Create</Link>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

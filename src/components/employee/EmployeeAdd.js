import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Select,
  Row,
  Col,
  notification,
} from "antd";

const { Option } = Select;

export default class EmployeeAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isDepartmentLoading: true,
      apiResponse: null,
      departmentList: [],
    };

    this.formRef = React.createRef();
    this.onFinish = this.onFinish.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        departmentList: nextProps.departmentList,
        isDepartmentLoading: false,
        apiResponse: nextProps.storeEmployeeRes,
      },
      this.handleResponse
    );
  }

  handleResponse = () => {
    if (this.state.apiResponse !== null) {
      this.setState({ isLoading: false });
      this.formRef.current.resetFields();

      if (this.state.apiResponse.status === 201) {
        notification["success"]({
          message: this.state.apiResponse.message,         
        });
      } else {
        notification["error"]({
          message: "server issue"
        });
      }
    }
  };

  componentDidMount() {
    this.props.GetDepartmentList();
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  onFinish(values) {
    this.setState({ isLoading: true });
    this.props.StoreEmployee(values);
  }

  render() {
    console.log("render");
    return (
      <Row>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 14, offset: 6 }}
          lg={{ span: 12, offset: 6 }}
        >
          <Card title="Add Employee">
            <Form
              name="addemployee"
              layout="vertical"
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              ref={this.formRef}
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    label="Employee Name"
                    name="employee_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your employee name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Company Name"
                    name="company_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your company name!",
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

                <Col span={12}>
                  <Form.Item
                    label="Mobile"
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: "Please input your mobile!",
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
                    label="City"
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: "Please input your city!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Department"
                    name="department_id"
                    rules={[
                      {
                        required: true,
                        message: "Please select department!",
                      },
                    ]}
                  >
                    <Select
                      onChange={this.handleChange}
                      placeholder="Select a department"
                      loading={this.state.isDepartmentLoading ? true : false}
                    >
                      {this.state.departmentList.map((department, key) => (
                        <Option value={department.department_id} key={key}>
                          {department.department_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.state.isLoading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

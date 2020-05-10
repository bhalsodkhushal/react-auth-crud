import React, { Component } from "react";
import { Card, Table, Skeleton } from "antd";

const columns = [
  {
    title: "Emp No",
    dataIndex: "employee_id",
    key: "employee_id",
  },
  {
    title: "Employee Name",
    dataIndex: "employee_name",
    key: "employee_name",
  },
  {
    title: "Company Name",
    dataIndex: "company_name",
    key: "company_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    key: "mobile",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Department",
    dataIndex: "dp",
    render: (dp) => `${dp.department_name}`,
  },
];

export default class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      employeeData: [],
      departmentList: [],
      employeeArrData: []
    };
  }

  componentDidMount() {
    this.props.GetDepartmentList();
    this.props.GetEmployeeList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        employeeList: nextProps.employeeList,
        departmentList: nextProps.departmentList,
      },
      this.handleResponse
    );
  }

  handleResponse = () => {
    if (
      this.state.employeeList.length > 0 &&
      this.state.departmentList.length > 0
    ) {
      this.state.employeeList.map(
        (department) =>
          (department.dp = this.state.departmentList.find(
            (obj) => obj.department_id === department.department_id
          ))
      );

      this.setState({
        loadingData: false,
        employeeArrData: this.state.employeeList,
      });
    }
  };

  render() {
    return (
      <Card title="Employee List">
        {this.state.loadingData ? (
          <Skeleton />
        ) : (
          <Table dataSource={this.state.employeeArrData} columns={columns} />
        )}
      </Card>
    );
  }
}

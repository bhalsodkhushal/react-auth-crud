import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Layout } from "antd";

const SubMenu = Menu.SubMenu;
const { Header } = Layout;

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    this.setState({
      isLoggedIn: token ? true : false,
    });
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo">React App</div>
          <div className="header-menu">
            
            {this.state.isLoggedIn ? (
              <Menu
                mode="horizontal"
                theme="dark"
                defaultSelectedKeys={["home"]}
              >
                <Menu.Item key="home">
                  <Link to="/">Home</Link>
                </Menu.Item>

                <SubMenu title={<span>Employee Master</span>}>
                  <Menu.Item key="addemployee">
                    <Link to="/employee-add">Add Employee</Link>
                  </Menu.Item>
                  <Menu.Item key="listemployee">
                    <Link to="/employee-list">List Employee</Link>
                  </Menu.Item>
                </SubMenu>

                <Menu.Item key="swap-color">
                  <Link to="/swap-color">Swap Color</Link>
                </Menu.Item>

                <Menu.Item key="logout">
                  <a href="/logout">Logout</a>
                </Menu.Item>
              </Menu>
            ) : (
              <Menu
                mode="horizontal"
                theme="dark"
                defaultSelectedKeys={["home"]}
              >
                <Menu.Item key="home">
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="login">
                  <Link to="/login">Login</Link>
                </Menu.Item>
              </Menu>
            )}
          </div>
        </Header>
      </Layout>
    );
  }
}

export default withRouter(TopBar);

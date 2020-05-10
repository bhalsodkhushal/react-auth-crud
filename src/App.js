import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";

import "antd/dist/antd.css";
import "./css/custom.css";

import Header from "./components/page/Topbar";
import Home from "./components/page/Home";

import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import AuthCheck from "./components/auth/AuthCheck";

import EmployeeAddContainer from "./components/employee/EmployeeAddContainer";
import EmployeeListContainer from "./components/employee/EmployeeListContainer";

import SwapColor from "./components/swapcolor/SwapColor";

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Header />
      <div className="container-fluid">
        <Content>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/employee-add">
              <AuthCheck cmp={EmployeeAddContainer} />
            </Route>
            <Route path="/employee-list">
              <AuthCheck cmp={EmployeeListContainer} />
            </Route>
            <Route path="/swap-color">
              <AuthCheck cmp={SwapColor} />
            </Route>

            {/* <Route path="*" component={Notfound}/> */}
          </Switch>
        </Content>
      </div>
    </Router>
  );
}

export default App;

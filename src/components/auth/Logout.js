import React from 'react';
import {
    Redirect
  } from "react-router-dom";

function Logout(props) {
    localStorage.clear("token");
    return <Redirect to="/"></Redirect> 
}

export default Logout;
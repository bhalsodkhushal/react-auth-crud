import React from 'react';
import {
    Redirect
  } from "react-router-dom";


function AuthChek(props) {
    const Comp = props.cmp;
    var token = localStorage.getItem("token");
    return <div>{ token ? <Comp /> : <Redirect to="login"></Redirect>} </div> 
}
  
export default AuthChek;
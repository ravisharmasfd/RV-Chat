import Cookies from "js-cookie";
import React from "react";
import {Navigate,} from "react-router-dom";




function CheckAuth({ children }) {
    const token = Cookies.get('token');
  return token? children : <Navigate to = "/login"></Navigate>;
}

export default CheckAuth;

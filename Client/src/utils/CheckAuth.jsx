import React, { Children, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import appStore from '../store/context'
import  {AppBar}  from "../components/index"



function CheckAuth({children}) {
    const {state} =  useContext(appStore);

    return state.user ? children  : <Navigate to = "/login"></Navigate>;
}

export default CheckAuth
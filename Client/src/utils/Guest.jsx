import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import appStore from '../store/context'

export default function Guest({children}) {
    const {state} =  useContext(appStore);

    return state.user ? <Navigate to = "/"></Navigate> : {children};
}
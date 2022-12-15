import { useReducer } from "react";
import appStore from "./context.js";
import reducer from "./reducer.js";
import React from 'react'
import initialState from "./initialState.js";
function Store({children}) {
    const [state,dispatch] = useReducer(reducer,initialState);
  return (
    <appStore.Provider value={{state , dispatch}}>
        {children}
    </appStore.Provider>
  )
}

export default Store
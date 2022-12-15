const reducer = (state,action)=>{
    const {type,payload} = action;
    if(type === "login"){
        state.user = payload;
        state.appData.userLogin =true;
        return state;
    }
    else if(type === 'logout'){
        state.user = null;
        state.appData.userLogin = false;
        return state;
    }
    else if(type === "refresh"){
        state.user = payload;
        return state;
    }else{
        return state;
    }
}
export default reducer;
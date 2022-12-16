import { Route, Routes, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { AppBar } from "./components"
import {Home,ProfilePage,LoginPage,RegisterPage} from "./pages/index.js"
import appStore from "./store/context"
import fetchUser from "./controllers/fetchUser"
import { useState } from "react"
import EditProfile from "./pages/EditProfile"
 

  
   function App() {
    const {state,dispatch} = useContext(appStore);
    const [refresh,setRefresh] = useState(1);
    const navigate = useNavigate();
    const fetch = async()=>{
      try {
        const user = await fetchUser();
        if(user){
          dispatch({type: "login",payload:user});
          setRefresh(refresh+1);
        }
      } catch (error) {
        console.log(error)
        navigate('/login')
      }
  }
  useEffect(()=>{
    if(!state.appData.userLogin) fetch();
  }, [])
  
  return (
    <>
    <AppBar></AppBar>
   <Routes>
    <Route path="/" element={<Home></Home>}></Route>
    <Route path="/profile/:userName" element={<ProfilePage></ProfilePage>}></Route>
    <Route path="/login" element={<LoginPage></LoginPage>}></Route>
    <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
    <Route path="/edit" element={<EditProfile></EditProfile>}></Route>
   </Routes>
   </>
  )
}

export default App

import { Route, Routes, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { AppBar } from "./components"
import {Home,ProfilePage,LoginPage,RegisterPage,EditProfile} from "./pages/index.js"
import appStore from "./store/context"
import fetchUser from "./controllers/fetchUser"
import { useState } from "react"
import CheckAuth from './utils/CheckAuth.jsx'
import Guest from "./utils/Guest"
import ChatPage from "./pages/ChatPage"
import MessagePage from "./pages/MessagePage"
import FindFriend from "./pages/FindFriend"
import FourZeroFour from "./pages/FourZeroFour"

  
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
  }, [state.user])
  
  return (
    <>
    {state.appData.userLogin && <AppBar></AppBar>}
   <Routes>
    <Route path="/" element={<CheckAuth><Home></Home></CheckAuth>}></Route>
    <Route path="/profile/:userName" element={<CheckAuth><ProfilePage></ProfilePage></CheckAuth>}></Route>
    <Route path="/login" element={<Guest><LoginPage></LoginPage></Guest>}></Route>
    <Route path="/register" element={<Guest><RegisterPage></RegisterPage></Guest>}></Route>
    <Route path="/edit" element={<CheckAuth><EditProfile></EditProfile></CheckAuth>}></Route>
    <Route path="/chat" element={<CheckAuth><ChatPage></ChatPage></CheckAuth>}></Route>
    <Route path="/message/:chatId/:personId" element={<CheckAuth><MessagePage/></CheckAuth>}></Route>
    <Route path="/find" element={<CheckAuth><FindFriend/></CheckAuth>}></Route>
    <Route path="*" element={<FourZeroFour/>}></Route>

   </Routes>
   </>
  )
}

export default App

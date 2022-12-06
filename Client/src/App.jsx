import { Route, Routes } from "react-router-dom"
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import  AppBar  from "./components/AppBar"
import Profile from "./components/Profile"
function App() {
  
  return (
    <>
    <AppBar></AppBar>
   <Routes>
    <Route path="/" element={<Home></Home>}></Route>
    <Route path="/profile" element={<Profile></Profile>}></Route>
    <Route path="/login" element={<LoginPage></LoginPage>}></Route>
    <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
   </Routes>
   </>
  )
}

export default App

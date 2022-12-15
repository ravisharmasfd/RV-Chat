import SearchBar from "./SearchBar";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import { useContext } from "react";
import appStore from "../store/context";
import { useRef } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

function AppBar() {
  const handleClose = ()=>{
    menu.current.classList.remove('absolute');
    menu.current.classList.add("hidden");
  }
  const menu = useRef();
  const {state} =useContext(appStore);
  return (
   <div className="bg-second w-full flex flex-row h-10 items-center justify-between z-10">
    <Link to="/" className="basic-1/4 flex flex-row items-center justify-center"><span className="text-white ml-10"><b>RV CHAT</b></span></Link>
    <div className="hidden sm:block basic-1/4"><SearchBar></SearchBar></div>
    <div className="basic-2/4  flex flex-row items-center justify-between mr-5">
      <div className="flex flex-row items-center justify-between mr=20 ">
        <div className="hidden sm:block w-full ">
        <ChatOutlinedIcon sx={{ color: "white" }} className="ml-2 cursor-pointer"></ChatOutlinedIcon>
        <NotificationsNoneOutlinedIcon  sx={{ color: "white" }} className="ml-2  cursor-pointer"></NotificationsNoneOutlinedIcon>
        <Link to={`/profile/${state?.user?.userName}`}><PersonIcon  className="ml-2 cursor-pointer"  sx={{ color: "white" }}></PersonIcon></Link>
        <Link ><EditIcon className="ml-2 cursor-pointer"  sx={{ color: "white" }}></EditIcon></Link>
        <Link ><LogoutIcon  className="ml-2 cursor-pointer" sx={{ color: "white" }}></LogoutIcon></Link>
        </div>
        <div className="sm:hidden" onClick={()=>{
          console.log(menu.current.classList)
          menu.current.classList.remove("hidden")
          menu.current.classList.add('absolute');
          console.log(menu.current.classList)
        }} ><MenuIcon sx={{ color: "white" }} className="ml-2 cursor-pointer"></MenuIcon></div>
        <div ref={menu} className="top-0 right-0 w-screen h-screen z-50 hidden">
          <div  className="flex flex-col justify-space opacity-90 items-center w-full h-full bg-fourth rounded-lg">
            <button onClick={handleClose} className="relative left-1/3 rounded-xl p-4 hover:bg-first  " ><CloseIcon sx={{fontSize: 50 }}></CloseIcon></button>
            <SearchBar></SearchBar>
            <div className="flex flex-col items-center w-full h-full justify-center">
            <Link onClick={handleClose} className="hover:bg-first rounded-lg p-4 m-5 text-3xl" to={`/profile/${state?.user?.userName}`}><PersonIcon></PersonIcon><span>Profile</span></Link>
            <Link onClick={handleClose} className="hover:bg-first rounded-lg p-4 m-5 text-3xl"><EditIcon></EditIcon><span>Edit Profile</span></Link>
            <Link onClick={handleClose} className="hover:bg-first rounded-lg p-4 m-5 text-3xl"><LogoutIcon></LogoutIcon> <span>Logout</span></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
 
  )
}

export default AppBar
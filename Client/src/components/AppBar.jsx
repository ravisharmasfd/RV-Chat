import SearchBar from "./SearchBar";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonIcon from '@mui/icons-material/Person';

function AppBar() {
  return (
   <div className="bg-second w-full flex flex-row h-10 items-center justify-between sticky z-10">
    <div className="basic-1/4 flex flex-row items-center justify-center"><span className="text-white ml-10"><b>RV CHAT</b></span></div>
    <div className="basic-1/4"><SearchBar></SearchBar></div>
    <div className="basic-2/4  flex flex-row items-center justify-between mr-5">
      <div className="flex flex-row items-center justify-between mr-5 text-white" >
        <span className="mr-5">Home</span> <span>Timeline</span>
      </div>
      <div className="flex flex-row items-center justify-between mr=10 ">
        <ChatOutlinedIcon sx={{ color: "white" }} className="ml-2 cursor-pointer"></ChatOutlinedIcon>
        <NotificationsNoneOutlinedIcon  sx={{ color: "white" }} className="ml-2  cursor-pointer"></NotificationsNoneOutlinedIcon>
        <PersonIcon sx={{ color: "white" }} className="ml-2 cursor-pointer"></PersonIcon>
      </div>
      <img  src="../../public/person.webp" alt="profile" className="ml-3 mr-3 w-7 h-7 rounded-full cursor-pointer " style={{}}/>
    </div>
   </div>
 
  )
}

export default AppBar
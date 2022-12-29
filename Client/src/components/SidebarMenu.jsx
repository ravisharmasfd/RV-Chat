import FeedIcon from '@mui/icons-material/Feed';
import ChatIcon from '@mui/icons-material/Chat';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Link } from 'react-router-dom';


function SidebarMenu() {
  return (
    <div className=' flex w-full flex-row items-start md:flex-col justify-evenly md:items-start  mt-10 md:mt-20 md:mb-4 z-20'>
  
      <Link to="/"
        className="md:ml-10  text-fourth mt-5 p-0 cursor-pointer hover:scale-125 hover:text-white flex flex-row gap-1"
      >
        <span className=' mr-3'>
        <FeedIcon/>
        </span>
        <span className='hidden md:block'>
          Feed
        </span>
      </Link>
      <Link to='/chat'
        className="md:ml-10 text-fourth mt-5 p-0 cursor-pointer hover:scale-125 hover:text-white flex flex-row gap-1"
      >
        <span className='mr-3'>
        <ChatIcon/>
        </span>
        <span className='hidden md:block'>
          Chats
        </span>
      </Link>

      <Link
        to="/find"
        className="md:ml-10 text-fourth mt-5 p-0 cursor-pointer hover:scale-125 hover:text-white flex flex-row gap-1"
      >
        <span className=' mr-3'>
        <Diversity3Icon/>
        </span>
        <span className='hidden md:block'>
          Find Friends
        </span>
      </Link>

      <button
      onClick={()=>{
        alert("Save post feature not availabe right now")
      }}
        className="md:ml-10 text-fourth mt-5 p-0 cursor-pointer hover:scale-125 hover:text-white flex flex-row gap-1"
      >
        <span className=' mr-3'>
        <BookmarkAddedIcon/>
        </span>
        <span className='hidden md:block'>
        Bookmarks
        </span>
      </button>
      
  
    </div>
  )
}

export default SidebarMenu
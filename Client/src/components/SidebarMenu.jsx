import FeedIcon from '@mui/icons-material/Feed';
import ChatIcon from '@mui/icons-material/Chat';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link } from 'react-router-dom';


function SidebarMenu() {
  return (
    <div className=' flex w-full flex-row overflow-hidden md:flex-col justify-evenly  md:items-center '>
  
      <Link to="/"
        className="category-btn text-white mt-5 p-0"
      >
        <span className=' mr-3'>
        <FeedIcon/>
        </span>
        <span className='hidden md:block'>
          Feed
        </span>
      </Link>
      <button
        className="category-btn text-white mt-5 p-0"
      >
        <span className='mr-3'>
        <ChatIcon/>
        </span>
        <span className='hidden md:block'>
          Chats
        </span>
      </button>

      <button
        className="category-btn text-white mt-5 p-0"
      >
        <span className=' mr-3'>
        <Diversity3Icon/>
        </span>
        <span className='hidden md:block'>
          Group
        </span>
      </button>

      <button
        className="category-btn text-white mt-5 p-0"
      >
        <span className=' mr-3'>
        <BookmarkAddedIcon/>
        </span>
        <span className='hidden md:block'>
        Bookmarks
        </span>
      </button>

      <button
        className="category-btn text-white mt-5 p-0"
      >
        <span className=' mr-3'>
        <CalendarMonthIcon/>
        </span>
        <span className='hidden md:block'>
          Events
        </span>
      </button>
      
  
    </div>
  )
}

export default SidebarMenu
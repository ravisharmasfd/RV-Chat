import FeedIcon from '@mui/icons-material/Feed';
import ChatIcon from '@mui/icons-material/Chat';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import WorkIcon from '@mui/icons-material/Work';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/CalendarMonth';

function SidebarMenu() {
  return (
    <div className=' flex flex-col justify-items-start p-0 '>
  
      <button
        className="category-btn text-white mt-5 p-0"
      >
        <span className=' mr-3'>
        <FeedIcon/>
        </span>
        <span>
          Feed
        </span>
      </button>
      <button
        className="category-btn text-white mt-5 p-0"
      >
        <span className='mr-3'>
        <ChatIcon/>
        </span>
        <span>
          Chats
        </span>
      </button>

      <button
        className="category-btn text-white mt-5 p-0 "
      >
        <span className=' mr-3'>
        <VideoLibraryIcon/>
        </span>
        <span>
          Videos
        </span>
      </button>

      <button
        className="category-btn text-white mt-5 p-0"
      >
        <span className=' mr-3'>
        <Diversity3Icon/>
        </span>
        <span>
          Group
        </span>
      </button>

      <button
        className="category-btn text-white mt-5 p-0"
      >
        <span className=' mr-3'>
        <BookmarkAddedIcon/>
        </span>
        <span>
        Bookmarks
        </span>
      </button>

      <button
        className="category-btn text-white mt-5 p-0"
      >
        <span className=' mr-3'>
        <LiveHelpIcon/>
        </span>
        <span>
          Questions
        </span>
      </button>

      <button
        className="category-btn text-white mt-5 p-0"
      >
        <span className=' mr-3'>
        <WorkIcon/>
        </span>
        <span>
          Jobs
        </span>
      </button>

      <button
        className="category-btn text-white mt-5 p-0"
      >
        <span className=' mr-3'>
        <CalendarMonthIcon/>
        </span>
        <span>
          Events
        </span>
      </button>

      <button
        className="category-btn text-white mt-5 p-0"
      >
        <span className=' mr-3'>
        <SchoolIcon/>
        </span>
        <span>
          Courses
        </span>
      </button>
      
  
    </div>
  )
}

export default SidebarMenu
import React from 'react'
import FeedIcon from '@mui/icons-material/Feed';
import ChatIcon from '@mui/icons-material/Chat';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import WorkIcon from '@mui/icons-material/Work';

import SchoolIcon from '@mui/icons-material/School';
export const categories = [
    { name: 'Feed', icon: <FeedIcon/>, },
    { name: 'Chats', icon: <ChatIcon/>, },
    { name: 'Videos', icon: <VideoLibraryIcon/>, },
    { name: 'Groups', icon: <Diversity3Icon/>, },
    { name: 'Bookmarks', icon: <BookmarkAddedIcon/>, },
    { name: 'Questions', icon: <LiveHelpIcon/> },
    { name: 'Jobs', icon: <WorkIcon/>, },
    { name: 'Events', icon: <WorkIcon/>, },
    { name: 'Courses', icon: <SchoolIcon/>, },
  ];
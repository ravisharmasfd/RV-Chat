import { appBarClasses } from '@mui/material';
import React, { useState , useEffect ,useContext} from 'react'
import appStore from '../store/context';
import Post from './Post'
import SharePost from './SharePost'
import Cookies from 'js-cookie';
import axios from 'axios';

function Feed() {
  
  const [timeline,setTimeline] = useState([]);
  async function feedTimeline(){
    const token = Cookies.get("token");
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/post/timeline/all`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
      
    })

    const timelinePost = res.data.dataUser;
    setTimeline(timelinePost);
    
  }
  useEffect(() => {
    feedTimeline();
  }, [])
  
  return (
    <div className='basis-5/6 flex flex-col items-center h-screen overflow-y-scroll '>
      <SharePost></SharePost>
      {
        timeline.map(
          (item)=>{
            return <Post key={item.postData._id} postData={item.postData} userData = {item.userData}></Post>
          }
        )
      }
      
    </div>
  )
}

export default Feed
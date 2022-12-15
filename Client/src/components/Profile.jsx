import Post from './Post'
import ProfileInfo from './ProfileInfo'
import SharePost from './SharePost'
import { useState,useContext } from "react";
import userPostController from '../controllers/userPost';
import { useEffect } from 'react';

export default function Profile({profileUser,isUserProfile}) {
  const [userPost,setUserPost] = useState([]);  
  
  async function func (){
    try {
      if(profileUser?._id && userPost.length == 0){
        const data = await userPostController(profileUser._id);
        setUserPost(data);
        
      }
    } catch (error) {
    }
  }
  useEffect(() => {
    func();
  }, []);
  

  return (
    <div className='basis-4/6 flex flex-col items-center overflow-y-scroll'>
        <ProfileInfo profileUser={profileUser} isUserProfile={isUserProfile}></ProfileInfo>
        {isUserProfile && <SharePost></SharePost>}
        {userPost.map(item => {
             return <Post postData={item} userData = {profileUser}></Post>
            })          
        }

        
        
  </div>
  )
}

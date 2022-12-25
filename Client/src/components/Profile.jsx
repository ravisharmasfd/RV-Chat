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
  }, [profileUser,isUserProfile]);
  

  return (
    <div className='basis-5/6 flex flex-col items-center h-screen '>
        <ProfileInfo profileUser={profileUser} isUserProfile={isUserProfile}></ProfileInfo>
        <div className='md:hidden'>
          </div>
        {isUserProfile && <SharePost></SharePost>}
        {userPost.map(item => {
             return <Post key= {item._id} postData={item} userData = {profileUser}></Post>
            })          
        }

        
        
  </div>
  )
}

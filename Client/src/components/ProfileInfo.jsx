import axios from 'axios';
import React, { useState, useContext, useEffect  } from 'react'
import { useNavigate } from 'react-router-dom';
import fetchUser from '../controllers/fetchUser';
import followUser from '../controllers/followUser';
import unFollowUser from '../controllers/unFollowUser';
import appStore from '../store/context';
function ProfileInfo({profileUser,isUserProfile}) {
  const navigate = useNavigate();
  const {state ,dispatch} = useContext(appStore);
  const [follow,setFollow] = useState(false);
  const {firstName,lastName,description,dp,coverPhoto} = profileUser || {firstName : "firstName",lastName : "lastName",description : "description",dp :"",coverPhoto : ''};
  useEffect(()=>{
    if(state.user?.following?.includes(profileUser?._id)) setFollow(true);
    else setFollow(false);
  })
  const handleFollow = async()=>{
    if(follow){
      await unFollowUser(profileUser?._id);
      
    }else{
      await followUser(profileUser?._id);
    }
    const payload = fetchUser();
    dispatch({type: "refresh",payload});
  }
  return (
    <div className='w-3/4 bg-second flex flex-col items-center rounded-2xl'>
        <div className="w-full overflow-hidden">
            <img className="h-40 w-full" src={coverPhoto}></img>
            <img className='dp' src={dp}></img>
        </div>
        <div className='flex flex-col justify-center items-center mb-5 text-white'>
            <span><b>{`${firstName} ${lastName}`}</b></span>
            <p>{description}</p>
            {!isUserProfile && <button onClick={handleFollow} className='mt-3 bg-first rounded-xl  p-4 hover:bg-fourth hover:text-black '>{follow ? "UnFollow":"Follow"}</button>}
            {isUserProfile && <button onClick={()=>navigate('/edituser')} className='mt-3 bg-first rounded-xl  p-4 hover:bg-fourth hover:text-black '>Edit Profile</button>}
        </div>
    </div>
  )
}

export default ProfileInfo
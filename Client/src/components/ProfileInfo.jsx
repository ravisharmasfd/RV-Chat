import AddLocationIcon from '@mui/icons-material/AddLocation';
import React, { useState, useContext, useEffect  } from 'react'
import { useNavigate } from 'react-router-dom';
import fetchUser from '../controllers/fetchUser';
import followUser from '../controllers/followUser';
import unFollowUser from '../controllers/unFollowUser';
import appStore from '../store/context';
import AddHomeIcon from '@mui/icons-material/AddHome';
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
    <div className=' bg-second flex flex-col items-center rounded-2xl md:w-3/5 '>
        <div className="w-full ">
            <img className="w-full aspect-[18/5]" src={coverPhoto}></img>
            <img className='aspect-square w-1/5 rounded-full relative bottom-[20%] left-[40%]' src={dp}></img>
        </div>
        <div className='flex flex-col justify-center items-center mb-5 text-white'>
            <span><b>{`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}</b></span>
            <p className='text-center'>{description}</p>
            {!isUserProfile && <button onClick={handleFollow} className='mt-3 bg-first rounded-xl  p-4 hover:bg-fourth hover:text-black '>{follow ? "UnFollow":"Follow"}</button>}
            {isUserProfile && <button onClick={()=>navigate('/edituser')} className='mt-3 bg-first rounded-xl  p-4 hover:bg-fourth hover:text-black '>Edit Profile</button>}
            <div className='flex flex-row justify-center items-center mt-2'>
              <div className="flex flex-row justify-center items-center mr-5">
                <span className='mr-2'>{state.user?.followers?.length}</span>
                <span>Followers</span>
              </div>
              <div className="flex flex-row justify-space items-center">
                <span className='mr-2'>{state.user?.following?.length}</span>
                <span>Following</span>
              </div>
              </div>
              <div className='w-full flex flex-row justify-between mt-2'>
              <div>
                 <AddLocationIcon/>
                <span>{state.user?.city}</span>
              </div>
              <div>
                <AddHomeIcon></AddHomeIcon>
                <span>{state.user?.from}</span>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileInfo
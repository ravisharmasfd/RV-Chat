import AddLocationIcon from '@mui/icons-material/AddLocation';
import React, { useState, useContext, useEffect  } from 'react'
import { useNavigate } from 'react-router-dom';
import fetchUser from '../controllers/fetchUser';
import followUser from '../controllers/followUser';
import unFollowUser from '../controllers/unFollowUser';
import appStore from '../store/context';
import AddHomeIcon from '@mui/icons-material/AddHome';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {Modal ,UpdateDp , UpdateCover} from './index.js';
function ProfileInfo({profileUser,isUserProfile}) {
  const [modalChild,setModalChild] = useState('');
  const [open,setOpen] = useState(false);
  const navigate = useNavigate();
  const {state ,dispatch} = useContext(appStore);
  const [follow,setFollow] = useState(false);
  const {firstName,lastName,description,dp,coverPhoto} = profileUser || {firstName : "firstName",lastName : "lastName",description : "description",dp :"",coverPhoto : ''};
  async function check(){
    if(profileUser?.followers?.includes(state.user?._id)) setFollow(true);
    else setFollow(false);
  }
  useEffect(()=>{
    check();
  } , [profileUser,isUserProfile,follow])
  const handleFollow = async()=>{
    if(follow){
      await unFollowUser(profileUser?._id);
      setFollow(!follow)
      
    }else{
      await followUser(profileUser?._id);
      setFollow(!follow)
    }
    const payload =await fetchUser();
    dispatch({type: "refresh",payload});
    navigate('/');
    navigate(-1);
  }
  return (
    <div className=' bg-second flex flex-col items-center rounded-2xl s:w-3/5 '>
        <Modal setOpen={setOpen} open={open}>{(modalChild == 'dp')?<UpdateDp/>:<UpdateCover/>}</Modal>
        <div className="w-full ">
            <div className="w-full  relative">
            {isUserProfile && <div onClick={()=>{
              setModalChild('cover');
              setOpen(true);
            }} className='absolute top-[80%] right-3 opacity-60 bg-white aspect-square rounded-full hover:opacity-100 '><EditOutlinedIcon color='primary'/></div>}
              <img  className='w-full aspect-[18/5] object-cover' src={coverPhoto}></img>
            </div>
            <div className='aspect-square w-2/5 sm:w-1/5 rounded-full relative bottom-[20%] left-[30%] sm:left-[40%]'>
            {isUserProfile && <div onClick={()=>{
              setModalChild('dp');
              setOpen(true);
            }} className=' absolute top-0 right-[-10%] opacity-60 bg-white aspect-square rounded-full hover:opacity-100 z-10'><EditOutlinedIcon color='primary'/></div>}
            <img  className='aspect-square w-full rounded-full' src={dp}></img>
            </div>
        </div>
        <div className='flex flex-col justify-center items-center mb-5 text-white'>
            <span><b>{`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}</b></span>
            <p className='text-center'>{description}</p>
            {!isUserProfile && <button onClick={handleFollow} className='mt-3 bg-first rounded-xl  p-4 hover:bg-fourth hover:text-black '>{follow ? "UnFollow":"Follow"}</button>}
            {isUserProfile && <button onClick={()=>navigate('/edit')} className='mt-3 bg-first rounded-xl  p-4 hover:bg-fourth hover:text-black '>Edit Profile</button>}
            <div className='flex flex-row justify-center items-center mt-2'>
              <div className="flex flex-row justify-center items-center mr-5">
                <span className='mr-2'>{profileUser?.followers?.length}</span>
                <span>Followers</span>
              </div>
              <div className="flex flex-row justify-space items-center">
                <span className='mr-2'>{profileUser?.following?.length}</span>
                <span>Following</span>
              </div>
              </div>
              <div className='w-full flex flex-row justify-between mt-2'>
              <div>
                 <AddLocationIcon/>
                <span>{profileUser?.city}</span>
              </div>
              <div>
                <AddHomeIcon></AddHomeIcon>
                <span>{profileUser?.from}</span>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileInfo
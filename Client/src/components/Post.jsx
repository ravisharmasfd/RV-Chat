import React, { useContext, useEffect } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import moment from 'moment'
import {Link} from 'react-router-dom'
import appStore from '../store/context';
import Cookies from 'js-cookie';
function Post({postData,userData}) {
    const {state} = useContext(appStore);
    const {_id , postDescription , image , likes, createdAt} = postData;
    const [userLike,SetUserLike] = useState(false);
    async function checkLike (){
        try{
            if(likes.includes(state?.user?._id)){
                SetUserLike(true);
            }else{
                SetUserLike(false);
            }
        }catch(err){
 
        }
     }
    const likeFunc = async()=>{
        try {
            const token = Cookies.get("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/post/like/${_id}`,{
            method: 'put', 
            headers: new Headers({
                'Authorization': `Bearer ${token}` })
            })
            if(userLike){
                const index = likes.indexOf(state?.user?._id);
                if (index > -1) {
                likes.splice(index, 1);
                }
            }else{
                likes.push(state.user._id)
            }
            checkLike();

        } catch (error) {
        }
    }
    useEffect(
        ()=>{
            checkLike();
        },[postData,userData]
    )
  return (
    <div className='post-box bg-second mt-5 rounded-xl w-2/3 flex flex-col text-white'>
        <div className='flex flex-row justify-between'>
            <Link to={`/profile/${userData?.userName}`} className='hover:scale-105  flex flex-row justify-center mt-3'>
                <img className='rounded-full w-8 h-8 mr-2 ml-2' src={userData?.dp}/>
                <span  className='name mr-3 ml-3'><b>{`${userData?.firstName} ${userData?.lastName}`}</b></span>
                <div><span>{moment(createdAt).fromNow()}</span></div>
            </Link>
            <div className='mt-3 mr-3 ml-3'><MoreVertIcon></MoreVertIcon></div>
        </div>
        <div className='text-center mt-3'>{postDescription}</div>
        <div className='hover:scale-105 p-4 flex flex-row justify-center items-center mt-3'><img className=" rounded-lg w-4/5" src={image}></img>
        </div>
        <div className='flex flex-row justify-between mt-3 mb-3'>
            <button className='ml-4 hover:scale-105' onClick={likeFunc}>
                <span className='mr-2'><FavoriteIcon sx={userLike ? {color: "#FF0078"} : { color: "white"}}></FavoriteIcon></span>
                <span className='mr-1'>{likes.length}</span>
                <span>{`People like this `}</span>
            </button>
        </div>
    </div>
  )
}

export default Post
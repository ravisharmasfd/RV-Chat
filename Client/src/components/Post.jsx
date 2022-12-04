import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
function Post() {
    const [like,SetLike] = useState(30);
    const [userLike,SetUserLike] = useState(false);
    const likeFunc = ()=>{
        if(userLike){
            SetLike(like-1);
            SetUserLike(!userLike);
        }else{
            SetLike(like+1);
            SetUserLike(!userLike);
        }
    }
  return (
    <div className='post-box bg-second mt-5 rounded-xl w-2/3 flex flex-col text-white'>
        <div className='flex flex-row justify-between  '>
            <div className='flex flex-row justify-center mt-3'>
                <img className='rounded-full w-8 h-8 mr-3 ml-3' src='../../public/person.webp'/>
                <span className='name mr-3 ml-3'><b>Ravi Sharma</b></span>
                <div><span className='mr-1'> 5</span><span>minute</span></div>
            </div>
            <div className='mt-3 mr-3 ml-3'><MoreVertIcon></MoreVertIcon></div>
        </div>
        <div className='text-center mt-3'>This is my fist post</div>
        <div className='p-4 flex flex-row justify-center items-center mt-3'><img className=" rounded-lg w-4/5" src='https://images.pexels.com/photos/14549456/pexels-photo-14549456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></img>
        </div>
        <div className='flex flex-row justify-between mt-3 mb-3'>
            <button className='ml-4' onClick={likeFunc}>
                <span className='mr-2'><FavoriteIcon sx={userLike ? {color: "#FF0078"} : { color: "white"}}></FavoriteIcon></span>
                <span className='mr-1'>{like}</span>
                <span>People like it</span>
            </button>
            <div className='mr-4'>
                <span className='mr-1'>10</span>
                <span>comments</span>
            </div>
        </div>
        
    </div>
  )
}

export default Post
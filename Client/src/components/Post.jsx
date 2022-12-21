import React, { useContext, useEffect } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import moment from 'moment'
import {Link, useNavigate} from 'react-router-dom'
import appStore from '../store/context';
import Cookies from 'js-cookie';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';

function Post({postData,userData}) {
    const Navigate = useNavigate();
    const token = Cookies.get("token");
    const [userPost,setUserPost] = useState(false);
    const {state} = useContext(appStore);
    const [menu,setMenu] = useState(false);
    const {_id , postDescription , image , likes, createdAt ,postedBy} = postData;
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
    async function deleteFunc(){
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/post/${_id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            Navigate('/profile');
            Navigate(-1);
        } catch (error) {
            console.log(error)
        }
    }
    const checkUserPost = ()=>{
        if(postedBy.toString() === state.user._id.toString()){
            setUserPost(true);
        }
    }
    useEffect(
        ()=>{
            checkUserPost();
            checkLike();
        },[postData,userData]
    )
  return (
    <div className='post-box bg-second mt-5 rounded-xl w-[95%] s:w-4/5 sm:w-2/3 md:w-1/3 flex flex-col text-white'>
        <div className='flex flex-row justify-between'>
            <Link to={`/profile/${userData?.userName}`} className='hover:scale-105  flex flex-row justify-center mt-3'>
                <img className='rounded-full w-8 h-8 mr-2 ml-2' src={userData?.dp}/>
                <span  className='name mr-3 ml-3'><b>{`${userData?.firstName} ${userData?.lastName}`}</b></span>
                <div><span>{moment(createdAt).fromNow()}</span></div>
            </Link>
            <div onClick={()=>{setMenu(!menu);console.log(menu)}}className={`mt-3 mr-3 ml-3 ${menu && "bg-first rounded-xl"}`}>{menu ? <MoreVertIcon ></MoreVertIcon> : <MoreHorizIcon></MoreHorizIcon>}</div>
        </div>
        {menu && <div onMouseLeave={()=>{setMenu(false)}} className='relative '>
            <div className="absolute bg-third rounded-md border-white border-3 border-solid w-1/2  left-[45%] top-4 z-20 overflow-hidden appBoxShadow">
                <div className='flex flex-col items-center justify-between' >
                {userPost && <button onClick={deleteFunc} className='hover:bg-slate-50 w-full border-b-2 border-white hover:border-black border-solid p-1 hover:text-black'>Delete</button>}
                <button onClick={()=>{alert("Currently, this feature is not include")}} className='hover:bg-slate-50 w-full border-b-2 border-white hover:border-black border-solid p-1 hover:text-black'>Bookmark</button>
                </div>
            </div>
            </div>}
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
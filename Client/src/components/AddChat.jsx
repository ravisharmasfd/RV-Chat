import axios from 'axios';
import Cookies from 'js-cookie';
import React, {  useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddChatUsername from './AddChatUsername.jsx';

function AddChat() {
    const token = Cookies.get('token');
    const navigate = useNavigate();
    const [following,setFollowing] = useState([]);
    async function fetch(){
        try {
            const f = await axios.get(`${import.meta.env.VITE_API_URL}/user/friends`,{
                headers:{
                    Authorization : `Bearer ${token}` 
                }
            });
            setFollowing(f.data.friends)
        } catch (error) {
            console.log(error)
        }
    }
    async function addChatChannel(id){
        const data = {_id : id}
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/chat`,data,{
            headers:{
                Authorization : `Bearer ${token}` 
            }
        });
        navigate(`/message/${res?.data?.chat?._id}/${id}`)
    }
    useEffect(()=>{
        fetch();
    },[])
  return (
  <div className='flex flex-col items-center justify-center bg-first/90 w-[85vw] md:w-[50vw] rounded-lg appBoxShadow sm:w-[75vw] overflow-hidden'>
    <div className='m-2 p-2'>
        <AddChatUsername addChatChannel={addChatChannel}/>
    </div>
    <div className='flex flex-col items-start mt-3 w-[90%] overflow-auto h-[55vh] p-5'>
            {
            following.map(
                (item)=>{
                    return <button onClick={()=>{
                        addChatChannel(item._id);
                    }} key= {item?._id} className='text-white w-full p-2 rounded-xl hover:scale-110  hover:bg-fourth hover:text-black  active:scale-110  active:bg-fourth active:text-black cursor-pointer  flex flex-row items-center justify-start bg-white border-2 border-emerald-900 border-solid mt-1 '>
                    <img className="aspect-square min-w-[2rem] w-[10%] rounded-full ml-5 mr-5" src={item?.dp} alt="photo" />
                    <span className='text-ellipsis text-black mr-5'>{`@${item?.userName}`}</span>
                    <span  className=' text-first overflow-hidden text-ellipsis overflow-x-hidden'>{`${item?.firstName}`}</span>
                </button>
                }
            )
        }</div>
  </div>
    
  )
}

export default AddChat
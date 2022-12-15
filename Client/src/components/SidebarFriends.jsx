import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom'

function SidebarFriends() {
    const [friends,setFriends] = useState([]);
    async function friend(){
        try {
            const token = Cookies.get('token')
            const f = await axios.get(`${import.meta.env.VITE_API_URL}/user/friends`,{
                headers:{
                    Authorization : `Bearer ${token}` 
                }
            });
            setFriends(f.data.friends)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        friend();
        console.log(friends);
    },[])
  return (
    <div className='flex flex-col w-3/4 m-auto bg-first p-4 rounded-lg justify-center items-center'>
        <h3 className='text-white'><b>Friends</b></h3>
        <div className='flex flex-col items-start mt-3 w-full'>
            {
            friends.map(
                (item)=>{
                    return <Link to={`/profile/${item?.userName}`} key= {item?._id} className='text-white w-full p-2 rounded-xl hover:scale-110  hover:bg-fourth hover:text-black  active:scale-110  active:bg-fourth active:text-black cursor-pointer  flex flex-row mt-3'>
                    <img className="aspect-square w-6 rounded-full mr-1" src={item?.dp} alt="photo" />
                    <span>{`@${item?.userName}`}</span>
                </Link>
                }
            )
        }</div>
        
    </div>
  )
}

export default SidebarFriends
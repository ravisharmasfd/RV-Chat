import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';





function FindFriend() {
    const [users , setUser] = useState([])
    async function fetch (){
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/findfriends`);
       setUser(res.data)
    }
    useEffect(() => {
      fetch();
    }, [])

  return (
    <div className=' w-screen h-screen overflow-y-scroll'>
        <div className='flex flex-col gap-10 mt-24 h-full w-full items-center justify-start'>
            <div className='mt-25 flex-col flex items-center justify-center gap-2 text-xl bg-white/70 rounded-3xl m-3 p-3'>
                <img className='w-1/5 rounded-xl' src="https://res.cloudinary.com/do7ueuane/image/upload/v1672233389/friend_bs8qr3.png" alt="Find Friends" />
                 <div className='flex flex-row gap-2 items-center justify-center'>
                <span className='text-black'>Find New</span>
                <span className='text-first font-bold'>Friends</span>
                </div>
            </div>
            <div className='w-full s:w-[70%] sm:w-[50%] md:w-[30%] flex flex-col gap-4 rounded-lg m-10 p-4 items-center justify-center'>
                {users.map((u)=>{
                    if(u.dp)return <Link to={`/profile/${u.userName}`} key={u?._id} className='flex flex-row w-full bg-fourth rounded-xl text-ellipsis text-sm font-bold overflow-hidden hover:bg-white gap-1 hover:scale-110'>
                    <div className='w-1/3 overflow-hidden rounded-2xl z-10'>
                        <img className="w-full aspect-square rounded-3xl" src={u?.dp} alt="logo" />
                    </div>
                    <div className='flex-col flex items-center justify-center w-2/3'>
                        <div className='flex-row gap-1 flex overflow-hidden'>
                        <span className=' text-ellipsis'>{u?.firstName}</span>
                        <span className=' text-ellipsis'>{u?.lastName}</span>
                        </div>
                        <div className='flex-row gap-1 flex overflow-hidden' >
                        <span className='text-second text-ellipsis'>{u.userName}</span>
                        </div>
                        
                        
                    </div>
                </Link>
                })}
            </div>
        </div>
    </div>
  )
}

export default FindFriend
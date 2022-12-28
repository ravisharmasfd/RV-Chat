import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import appStore from '../store/context';
import fetchPersonId from '../controllers/fetchPersonId.js'
import { Navigate, useNavigate } from 'react-router-dom';
export default function ChatSidebar({chat}) {
  const navigate = useNavigate();
  const [person,setPerson] = useState(null);
  const {state} = useContext(appStore);
  const {_id , members} = chat;
  
  async function fetch(){
    let personId;
    members.forEach(id => {
      if(id != state.user?._id){
        personId = id;
      }  
    });
    const data = await fetchPersonId(personId);
    setPerson(data);
  }
  useEffect(()=>{fetch()},[chat]);
  return (
    <button onClick={()=>{
      navigate(`/message/${_id}/${person?._id}`)
  }} key= {person?._id} className='text-white w-full p-2 rounded-xl hover:scale-110  hover:bg-fourth hover:text-black  active:scale-110  active:bg-fourth active:text-black cursor-pointer  flex flex-row items-center justify-start bg-white border-2 border-emerald-900 border-solid mt-1 '>
  <img className="aspect-square min-w-[2rem] w-[10%] rounded-full ml-5 mr-5" src={person?.dp} alt="photo" />
  <div className='flex flex-col items-center justify-center mr-3'>
  <span className='text-ellipsis text-black mr-5'>{`@${person?.userName}`}</span>
  </div>
  
  <span  className=' text-first overflow-hidden text-ellipsis overflow-x-hidden'>{`${person?.firstName}`}</span>
</button>
  )
}

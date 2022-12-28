import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useState } from "react";
import AddChat from "../components/AddChat";
import ChatSidebar from "../components/ChatSidebar";
import {Modal} from '../components/index.js';

function ChatPage() {
  
  const [chats, setChats] = useState([]);
  const [open, setOpen] = useState(false);
  
  async function getChat() {
    const token = Cookies.get("token");
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/chat`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const chatData = res.data;      
      setChats(chatData);
    } catch (error) {}
  }
  useEffect(()=>{
    getChat();
  },[])
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
        {<Modal open={open} setOpen={setOpen}>
        <AddChat></AddChat>   
        </Modal>}
      <div className="flex flex-col  items-center w-screen h-screen bg-white/75">
        <div className="flex flex-row items-center justify-evenly h-[15%] md:h-[20%] w-full bg-fourth ">
          <div onClick={()=>setOpen(true)} className="appBoxHoverShadow aspect-square overflow-hidden rounded-md hover:bg-white hover:appBoxShadow mt-5 md:mt-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col items-start mt-3 w-[90vw] sm:w-[50vw] md:w-[35vw] h-[55vh] p-5">
        {
            chats.map((item)=>{
                return <ChatSidebar key={item?._id} chat={item}/>
            })
        }
        </div>
      </div>
    </div>
  );
}

export default ChatPage;

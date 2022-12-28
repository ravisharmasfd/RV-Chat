import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useRef } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fetchPersonId from '../controllers/fetchPersonId';
import appStore from '../store/context.js';
import moment from 'moment';
import InputEmoji from 'react-input-emoji';
import { io } from "socket.io-client";

function MessagePage() {

    const socket = useRef();
    const scroll = useRef();
    const {state} = useContext(appStore);
    const [refresh , setRefresh] = useState(0);
    const token = Cookies.get('token');
    const navigate = useNavigate();
    const {chatId,personId} = useParams();
    const [person,setPerson] = useState(null);
    const [chat,setChat] = useState(null);
    const [messages,setMessages] = useState([]);
    const [msgText , setMsgText] = useState('');
    const [msgReady , setMsgReady] = useState('');
    const [onlineUsers,setOnlineUsers] = useState([]);
    const [personOnline ,setPersonOnline] = useState(false);

    function checkOnline(){
        const m = onlineUsers.find((user) => user?._id === person?._id);
        setPersonOnline(m);
    
      }

    async function sendMessage(){
        setMsgReady(msgText);        
    }
    async function fetchMsg(){
        try {
            const resMsg = await axios.get(`${import.meta.env.VITE_API_URL}/message/${chatId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            setMessages(resMsg.data);
        } catch (error) {
            
        }
    }
    async function fetch(){
        
        try {
            const resPerson = await fetchPersonId(personId);
        setPerson(resPerson);
        const resChat = await axios.get(`${import.meta.env.VITE_API_URL}/chat/find/${chatId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        setChat(resChat);
        setRefresh(refresh+1);        
        } catch (error) {
           alert("error");
        }

    }
    async function sendMsgServer(){
        if(msgReady.length <1) return;
        const data = {
            chatChannelId:chatId,
            text:msgReady
        }
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/message`,data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            setMsgText('')
            socket.current.emit("sendMessage",{
                receiverId: person?._id
            })
            setRefresh(refresh+1);
        } catch (error) {
            alert("error")
        }
    }
    useEffect(()=>{
        fetch();
    },[personId,chatId]);
    useEffect(()=>{fetchMsg();},[refresh,personId,chatId])
    useEffect(()=>{checkOnline();},[onlineUsers,person])
    useEffect(() => {
        socket.current = io(import.meta.env.VITE_SOCKET_URL);
        if(state.user?._id)socket.current.emit("addNewUser", state.user?._id);
        socket.current.on("getUser",(data)=>{
            setOnlineUsers(data);
          })
        socket.current.on("receiveNewMessage", (data) => {
            fetchMsg();
        });
        return ()=>{
            socket.current.disconnect();
        }
      }, [state.user]);
      useEffect(()=>{
        sendMsgServer();
        const mData = {receiverId:person?._id}
        socket.current.emit("sendMessage", mData)
        setRefresh(refresh+1)
      },[msgReady])
      useEffect(()=> {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
      },[messages])
    
  return (
    <div className='flex flex-col items-center justify-center w-screen h-[100Vh] bg-first'>
        <div className='h-[10%] mt-12 md:mt-24 w-full'>
        <div className="w-full h-full flex flex-row items-center justify-start bg-first ">
            <button onClick={()=>{navigate(-1)}} className='ml-5 appBoxHoverShadow hover:scale-125 hover hover:bg-second rounded-full mr-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
</svg>
</button>
            <div className=' mr-5 aspect-square w-[10%] max-w-[40px] min-w-[20px] rounded-full overflow-hidden border-white border-2 border-solid'><img src={person?.dp} alt="person" /></div>
            <div className=' flex flex-col gap-0.5 '>
            <span className='text-white text-ellipsis'>{`${person?.firstName} ${person?.lastName}`}</span>
            
            {<span className={personOnline? "text-[green]":"text-black"}>{personOnline? "online":"offline"}</span>}
            </div>
            
        </div>
        </div>
        <div className="bg-fourth w-full h-[70%] flex flex-col justify-start overflow-y-scroll overflow-x-hidden">
            {messages.map((msg)=>{
                const m = msg.senderId == state.user?._id;
                let name;
                let self;
                let bgColor
                if(m){
                    name = state.user?.firstName + " " + state.user?.lastName;
                    self = "self-end"
                    bgColor = "bg-first"
                }else{
                    name = person?.firstName + ' ' + person?.lastName;
                    self = "self-start"
                    bgColor = 'bg-second'
                }
                return <div ref={scroll}  className={self} key={msg._id}>
                    <div>
                        <div className='flex-col flex p-2 m-2'><span className='font-bold mr-1'>{name}</span>
                        <span className='text-[grey]'>{moment(msg?.createdAt).fromNow()}</span></div>
                        
                    </div>
                    <span className={`${bgColor} m-2 p-2 rounded-lg text-white border-2 border-solid border-white`}>{msg.text}</span>
                </div>
            })}
        </div>
        <div className='flex flex-row w-full h-[10%] bg-first items-center justify-center'>
            <div className='mr-1 w-[80%] bg-white flex flex-row items-center justify-center h-[8vh] rounded-xl appBoxShadow'>
                <InputEmoji value={msgText}
      onChange={(t)=>{setMsgText(t)}}
      cleanOnEnter
      onEnter={sendMessage}/>
            </div>
            <button onClick={sendMessage} className='appBoxHoverShadow hover:scale-125 hover hover:bg-second rounded-full'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>
</button>
        </div>

    </div>
  )
}

export default MessagePage
import axios from 'axios';
import React, { useContext, useRef } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom';
import appStore from '../store/context';


function LoginPage() {
  const {dispatch} = useContext(appStore);
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
      const loginForm = {
        email : emailRef.current.value,
        password : passRef.current.value
      }
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,loginForm);
      const {data} = res;
      Cookies.set("token",data.token);
      dispatch({type:"login",payload:data.user})
      navigate('/')
    }catch(err){
      alert("Check login input fields")
    }
  }
  return (
    <div className='flex flex-row w-full h-screen items-center justify-center'>
      <div className='flex flex-row items-center justify-center w-2/3 bg-white rounded-3xl'>
        <div className='w-1/2 flex flex-col   h-full text-black p-20'>
          <img src='../../public/logo.png'></img>
          <p className='text-center font-mono font-bold text-lg'>Connect to world using RV Social Media Chat App</p>
        </div>
        <div className='w-1/2  flex flex-col  bg-second  h-full p-20 m-6 rounded-2xl text-white items-center '>
            <h2 className='mt-3'>Enter your Login details</h2>
            <form onSubmit={handleLogin} className='mt-3 flex flex-col items-center justify-center' action="">
            <input ref={emailRef} required className='mt-3 bg-first no-outline rounded-md'type="email" placeholder='Email'></input>
            <input minLength = '8' ref={passRef} required className='mt-3 bg-first no-outline rounded-md' type="password" placeholder='Password'></input>
            <input className='mt-3 bg-first no-outline rounded-md p-2 cursor-pointer'type="submit"></input>
            </form>
            <Link to='/register' className='mt-3'>Create Your account</Link>
        </div>
      
      </div>

    </div>
  )
}

export default LoginPage
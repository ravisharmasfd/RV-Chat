import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
export default function RegisterPage() {
  const navigate = useNavigate();
  const initialRegisterForm = {
    email : "",
    userName : "",
    firstName : "",
    lastName : "",
    password : "",
    cPassword: "",
  }
  const [registerForm,SetRegisterForm] =useState(initialRegisterForm);
   const handelInput=(e)=>{
      SetRegisterForm({...registerForm,[e.target.name]:e.target.value})
   }
   const handelForm=async(e)=>{
    e.preventDefault();
    try{
      if(registerForm.password != registerForm.cPassword){
        throw "Password not match"
      }
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,registerForm);
      console.log(res);
      window.alert(res.data.msg);
      navigate('/login')
    }catch(err){
      window.alert("Check your credentials");
    }
  }
 
  return (
    <div className='flex flex-row w-full h-screen items-center justify-center'>
      <div className='appBoxShadow h-[95%] flex flex-col items-center justify-center w-2/3 bg-white rounded-2xl md:w-1/3  pb-5'>
        <div className='w-full flex flex-col items-center justify-between text-black p-5 h-1/3'>
          <img className='aspect-square w-1/3 basis-1/2 md:w-1/3' src='../../public/logo.png'></img>
          <p className=' basis-1/2 text-center font-mono font-bold text-md'>Connect to world using RV Social Media Chat App</p>
        </div>
        <div className='w-5/6 flex flex-col h-2/3 bg-second rounded-2xl items-center justify-evenly'>
        <h2 className='font-bold text-center p-1'>Enter details for register</h2>
            <form onSubmit={handelForm} className=' flex flex-col items-center justify-evenly w-full h-3/5' action="">
              <div className='bg-white rounded-3xl w-5/6 flex flex-row justify-center focus-within:outline-1 focus-within:outline-double focus-within:outline-black'>
              <input onChange={handelInput} name="email" value={registerForm.email} className=' w-4/5 no-outline rounded-md'type="email" placeholder='Email'></input>
              </div>
              <div className='bg-white rounded-3xl w-5/6 flex flex-row justify-center focus-within:outline-1 focus-within:outline-double focus-within:outline-black'>
              <input onChange={handelInput} name="userName" value={registerForm.userName} className=' w-4/5 no-outline rounded-md'type="text" placeholder='User Name'></input>
              </div>
              <div className='bg-white rounded-3xl w-5/6 flex flex-row justify-center focus-within:outline-1 focus-within:outline-double focus-within:outline-black'>
              <input onChange={handelInput} name="firstName" value={registerForm.firstName} className=' w-4/5 no-outline rounded-md'type="text" placeholder='First Name'></input>
              </div>
              <div className='bg-white rounded-3xl w-5/6 flex flex-row justify-center focus-within:outline-1 focus-within:outline-double focus-within:outline-black'>
              <input onChange={handelInput} name="lastName" value={registerForm.lastName} className=' w-4/5 no-outline rounded-md'type="text" placeholder='Last Name'></input>
              </div>
              <div className='bg-white rounded-3xl w-5/6 flex flex-row justify-center'>
              <input onChange={handelInput} name="password" value={registerForm.password} className=' w-4/5 no-outline rounded-md'type="password" placeholder='Password'></input>
              </div>
              <div className='bg-white rounded-3xl w-5/6 flex flex-row justify-center focus-within:outline-1 focus-within:outline-double focus-within:outline-black'>
              <input onChange={handelInput} name="cPassword" value={registerForm.cPassword} className=' w-4/5 no-outline rounded-md'type="password" placeholder='Conform Password'></input>
              </div>
              <button type="submit" class="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w=-1/2">Submit</button>
              </form>

            <Link to='/login' className='mt-3 text-center w-5/6'>Already have a account</Link>
        </div>
      
      </div>

    </div>
  )
}

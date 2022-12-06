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
  }
  const [registerForm,SetRegisterForm] =useState(initialRegisterForm);
   const handelInput=(e)=>{
      SetRegisterForm({...registerForm,[e.target.name]:e.target.value})
   }
   const handelForm=async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:8080/auth/register',registerForm);
      console.log(res);
      window.alert(res.data.msg);
      navigate('/login')
    }catch(err){
      window.alert("Check you input data");
    }
    //const res = await fetch('http://localhost:8080/auth/register',{
      //method:"POST",
      //body:JSON.stringify(registerForm),
      //headers: {
   ///     "content-type": "application/json",
      //},
   // });
  }
 
  return (
    <div className='flex flex-row w-full h-screen items-center justify-center'>
      <div className='flex flex-row items-center justify-center w-2/3 bg-white rounded-3xl'>
        <div className='w-1/2 flex flex-col   h-full text-black p-20'>
          <img src='../../public/logo.png'></img>
          <p className='text-center font-mono font-bold text-lg'>Connect to world using RV Social Media Chat App</p>
        </div>
        <div className='w-1/2  flex flex-col  bg-second  h-full p-20 m-6 rounded-2xl text-white items-center '>
            <h2 className='mt-3'>Enter your Registration  details</h2>

            <form onSubmit={handelForm} className='mt-3 flex flex-col items-center justify-center' action="">
              <input onChange={handelInput} name="email" value={registerForm.email} className='mt-3 bg-first no-outline rounded-md'type="text" placeholder='Email'></input>
              <input onChange={handelInput} name="userName" value={registerForm.userName} className='mt-3 bg-first no-outline rounded-md'type="text" placeholder='User Name'></input>
              <input onChange={handelInput} name="firstName" value={registerForm.firstName} className='mt-3 bg-first no-outline rounded-md'type="text" placeholder='First Name'></input>
              <input onChange={handelInput} name="lastName" value={registerForm.lastName} className='mt-3 bg-first no-outline rounded-md'type="text" placeholder='Last Name'></input>
              <input onChange={handelInput} name="password" value={registerForm.password} className='mt-3 bg-first no-outline rounded-md'type="password" placeholder='Password'></input>
              <input className='mt-3 bg-first no-outline rounded-md p-2 cursor-pointer'type="submit"></input>
              </form>
            <Link to='/login' className='mt-3'>Already have a account</Link>
        </div>
      
      </div>

    </div>
  )
}

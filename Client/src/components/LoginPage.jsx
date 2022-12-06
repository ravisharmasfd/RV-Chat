import React from 'react'

function LoginPage() {
  return (
    <div className='flex flex-row w-full h-screen items-center justify-center'>
      <div className='flex flex-row items-center justify-center w-2/3 bg-white rounded-3xl'>
        <div className='w-1/2 flex flex-col   h-full text-black p-20'>
          <img src='../../public/logo.png'></img>
          <p className='text-center font-mono font-bold text-lg'>Connect to world using RV Social Media Chat App</p>
        </div>
        <div className='w-1/2  flex flex-col  bg-second  h-full p-20 m-6 rounded-2xl text-white items-center '>
            <h2 className='mt-3'>Enter your Login details</h2>
            <form className='mt-3 flex flex-col items-center justify-center' action="">
            <input className='mt-3 bg-first no-outline rounded-md'type="text" placeholder='Email/UserName'></input>
            <input className='mt-3 bg-first no-outline rounded-md' type="password" placeholder='Password'></input>
            <input className='mt-3 bg-first no-outline rounded-md p-2 cursor-pointer'type="submit"></input>
            </form>
            <button className='mt-3'>Create Your account</button>
        </div>
      
      </div>

    </div>
  )
}

export default LoginPage
import React from 'react'

function ProfileInfo() {
  return (
    <div className='w-3/4 bg-second flex flex-col items-center rounded-2xl'>
        <div className="w-full">
            <img className="h-40 w-full" src='https://www.shutterstock.com/shutterstock/photos/2103443153/display_1500/stock-vector-jungle-wallpaper-with-trees-and-tropical-plant-vector-2103443153.jpg'></img>
            <img className='dp' src="../../public/person.webp"></img>
        </div>
        <div className='flex flex-col justify-center items-center mb-5 text-white'>
            <span><b>Ravi Sharma</b></span>
            <p>I am a web developer connect me for a project</p>
            <button className='mt-3 bg-first rounded-xl  p-4 hover:bg-fourth hover:text-black '>Edit Profile</button>
        </div>
    </div>
  )
}

export default ProfileInfo
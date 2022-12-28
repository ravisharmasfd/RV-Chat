import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import appStore from '../store/context';
import axios from 'axios';


export default function UpdateDp() {
  const token = Cookies.get('token')
    const {state,dispatch} = useContext(appStore);
    const [file ,setFile] = useState(null);
    async function handleDp(e){
      e.preventDefault();
      const dpData = new FormData();
      dpData.append("myFile",file);
      try {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/upload/dp`,dpData,{
          headers:{
            Authorization : `Bearer ${token}`,
            "Content-Type" : "multipart/form-data",
        }
        });
        const payload = state.user;
        payload.dp = res.data.secure_url;
        dispatch({type: "refresh",payload});
        alert("Your Profile Pitcher is updated");
        setFile(null);
      } catch (error) {
        alert("server problem");
        
      }
    }
    useEffect(()=>{},(state.user));
  return (
    <form onSubmit={handleDp} className=' flex flex-col w-2/4 m-4  p-2 rounded-2xl items-center justify-around bg-second'>
        <div className='aspect-square w-3/4 overflow-hidden rounded-2xl'><img src={state?.user?.dp} alt={`${state?.user?.userName} profile pitcher`} /></div>
        <label className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white text-center" htmlFor="file_input">Update Profile Image Upload a 1/1 aspect ratio image</label>
        <input id='uFile' required onChange={(e)=>{setFile(e.target.files[0])}} multiple={false} accept="image/png, image/jpeg" className=" block w-3/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file"></input>
        <input type='submit'  className="mt-2 mb-2 bg-first w-20 rounded hover:bg-fourth cursor-pointer text-white hover:text-black"></input>
        {file && <div className='w-1/2 aspect-square overflow-hidden m-1 rounded-3xl relative '>
            <div onClick={()=>{
                setFile(null)
            }} className='absolute top-2 right-2 z-50 bg-white aspect-square rounded-full cursor-pointer hover:scale-110 hover:bg-slate-300'><HighlightOffOutlinedIcon color="secondary"/></div>
            <img src={URL.createObjectURL(file)} alt="upload file" />
        </div>}
 
    </form>
  )
}

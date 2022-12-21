import React, { useContext, useRef, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import appStore from '../store/context';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import {useNavigate} from 'react-router-dom'
function SharePost() {
    const Navigate = useNavigate();
    const {state} = useContext(appStore);
    const textRef = useRef();
    const [myfile, setFile] = useState(null);
    const handlePost = async(e)=>{
        e.preventDefault();
        const token = Cookies.get('token');
        const postData = new FormData();
        postData.append("postDescription", textRef.current.value);
        if(!myfile){
            return;
        }
        postData.append("myFile", myfile);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload/post`,postData,{
                headers:{
                    Authorization : `Bearer ${token}`,
                    "Content-Type" : "multipart/form-data",
                }
    
            })
            const {data} = res;
            if(data.public_id){
                alert("You uploaded a file")
                Navigate('/profile');
                Navigate(-1);
            }else{throw Error("Error while upload")};
        } catch (error) {
            alert("there is some error ")
        }
    }
    const removeFile = ()=>{
            setFile(null);
    }
  return (
    <form onSubmit={handlePost} className='sharepost flex flex-col w-2/3 mt-5 rounded-2xl items-center bg-second'>
        <div className=' focus-within:border-solid focus-within:border-white focus-within:border-2 flex flex-row justify-start  mt-4  bg-third rounded-3xl w-4/5' >
            <img className="mt-3 w-10 h-10 rounded-full mr-2 ml-2" src={state.user?.dp} alt="profile photo" />
            <textarea ref={textRef} maxLength='150' className='mt-3 no-outline  bg-transparent w-4/5'></textarea>
            
        </div>
        <label className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Post Image</label>
        <input id='uFile' required onChange={(e)=>{setFile(e.target.files[0])}} multiple={false} accept="image/png, image/jpeg" className="block w-3/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file"></input>
        <input type='submit'  className="mt-2 mb-2 bg-first w-20 rounded hover:bg-fourth text-white hover:text-black"></input>
        {myfile && <div className='w-1/2 aspect-square overflow-hidden m-1 rounded-3xl relative '>
            <div onClick={removeFile} className='absolute top-2 right-2 z-50 bg-white aspect-square rounded-full cursor-pointer hover:scale-110 hover:bg-slate-300'><HighlightOffOutlinedIcon color="secondary"/></div>
            <img src={URL.createObjectURL(myfile)} alt="upload file" />
        </div>}
 
    </form>
  )
}

export default SharePost
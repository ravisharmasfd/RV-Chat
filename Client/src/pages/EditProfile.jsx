import React from 'react'
import { useContext } from 'react'
import appStore from '../store/context'
import EditIcon from '@mui/icons-material/Edit';
function EditProfile() {
    const {state,dispatch} = useContext(appStore);
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen'>
        <div className="flex flex-row bg-fourth justify-evenly w-50">
            <div className='flex flex-col justify-evenly w-1/2'>
                <div className="bg-first ">
                    <div className='relative top left-10 z-10'><EditIcon></EditIcon></div>
                    <img className='rounded-full aspect-square w-full' src={state.user?.dp} alt='profile pitcher'></img>
                </div>
                <div>
                    <img src={state.user?.cover} alt="cover photo" />
                </div>
            </div>
            <form className='flex flex-col w-1/2'>
                <input type="text" placeholder='User Name'></input>
                <input type="text" placeholder='First Name'></input>
                <input type="text" placeholder='Last Name'></input>
                <input type="text" placeholder='Short Description'></input>
                <input type="text" placeholder='Current City'></input>
                <input type="text" placeholder='Home Town'></input>
                <input type="text" placeholder='Gender'></input>
                <input type="text" placeholder='Relationship Status'></input>
            </form>
        </div>
    
    </div>
  )
}

export default EditProfile
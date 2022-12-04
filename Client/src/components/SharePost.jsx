import React from 'react'
import CollectionsIcon from '@mui/icons-material/Collections';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddReactionIcon from '@mui/icons-material/AddReaction';
function SharePost() {
  return (
    <div className='sharepost flex flex-col  mt-5 rounded-2xl items-center justify-start bg-second'>
        <div className='flex flex-row justify-start w-4.5 h-3/5 mt-4  bg-third rounded-3xl w-4/5' >
            <img className="mt-3 w-10 h-10 rounded-full mr-2 ml-2" src="../../public/person.webp" alt="profile photo" />
            <textarea className='mt-3 no-outline  bg-transparent w-4/5 h-4/5'></textarea>
        </div>
        <div className='flex flex-row items-center justify-center mt-4 text-white'>
            <button className='mr-3'>
                <span  className='mr-1 text-red-600'><CollectionsIcon /></span> 
                <span>Upload File</span>
            </button>
            <button className='mr-3'>
                <span  className='mr-1 text-green-600'><LocalOfferIcon /></span> 
                <span>Tag</span>
            </button>
            <button className='mr-3'>
                <span className='mr-1 text-blue-600'><LocationOnIcon /></span> 
                <span>Location</span>
            </button>
            <button className='mr-3'>
                <span  className='mr-1 text-yellow-300'><AddReactionIcon /></span> 
                <span>Feeling</span>
            </button>
            
        </div>
        <button class="mt-2 mb-2 bg-first w-20 rounded hover:bg-fourth text-white hover:text-black">Share</button>
 
    </div>
  )
}

export default SharePost
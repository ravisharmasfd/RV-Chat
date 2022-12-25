import React, { useRef } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useEffect } from 'react';
function Modal({setOpen,open,children}) {
  const modalRef = useRef();
  function handelOpen(){
    if(open){
      modalRef.current.classList.remove("hidden")
      modalRef.current.classList.add('fixed');
    }else{
      modalRef.current.classList.remove("fixed");
      modalRef.current.classList.add('hidden');
  }
  }
  useEffect(()=>{
    handelOpen();
  },[open])
  return (
    <div ref={modalRef} className='h-screen w-screen hidden top-0 right-0 model'>
        <div className="absolute h-full w-full  bg-white/20 ">
        <div className="flex flex-col justify-center h-full w-full items-center">
            <div onClick={()=>{
              setOpen(false);
            }} className='flex flex-row justify-end hover:animate-spin hover:scale-125 text-9xl text-red-700 hover:bg-first aspect-square rounded-full hover:text-white cursor-pointer'>
              <CancelOutlinedIcon />
            </div>
            <div className='p-2 flex flex-col justify-center items-center'>
                {children}
            </div>
        </div>
        </div>
    </div>
  )
}

export default Modal
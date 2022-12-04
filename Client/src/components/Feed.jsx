import React from 'react'
import Post from './Post'
import SharePost from './SharePost'

function Feed() {
  return (
    <div className='basis-4/6 flex flex-col items-center overflow-y-scroll'>
      <SharePost></SharePost>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      
    </div>
  )
}

export default Feed
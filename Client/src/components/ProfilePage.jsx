import Post from './Post'
import ProfileInfo from './ProfileInfo'
import SharePost from './SharePost'

export default function ProfilePage() {
  return (
    <div className='basis-4/6 flex flex-col items-center overflow-y-scroll'>
        <ProfileInfo></ProfileInfo>
        <SharePost></SharePost>
        <Post></Post>
        <Post></Post>
        <Post></Post>
        <Post></Post>
        
  </div>
  )
}

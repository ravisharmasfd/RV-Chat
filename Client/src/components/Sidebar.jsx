import {SidebarMenu,SidebarFriends} from './index'
export default function Sidebar() {
  return (

         <div className="flex flex-row  w-full h-14 md:basis-1/6  md:flex-col justify-center items-center  md:bg-second md:h-screen md:overflow-y-scroll ">
      <SidebarMenu></SidebarMenu>
      <SidebarFriends></SidebarFriends>
  </div>
   
  )
}

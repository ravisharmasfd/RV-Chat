import {SidebarMenu,SidebarFriends} from './index'
export default function Sidebar() {
  return (
    <div className="basis-1/6 flex flex-col items-center bg-second h-screen overflow-y-scroll ">
      <SidebarMenu></SidebarMenu>
      <SidebarFriends></SidebarFriends>
  </div>
  )
}

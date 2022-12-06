import Aside from "./Aside";
import ProfilePage from "./ProfilePage";
import Sidebar from "./Sidebar";


export default function Profile() {
  return (
    <div className="flex flex-row h-screen">
        <Sidebar></Sidebar>
        <ProfilePage></ProfilePage>
        <Aside></Aside>
    </div>
  )
}
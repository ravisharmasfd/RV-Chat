import Feed from "@mui/icons-material/Feed";
import Aside from "./Aside";
import ProfilePage from "./ProfilePage";
import Sidebar from "./Sidebar";


export default function Home() {
  return (
    <div className="flex flex-row h-screen">
        <Sidebar></Sidebar>
        <Feed></Feed>
        <Aside></Aside>
    </div>
  )
}

import Feed from "../components/Feed"
import Aside from "./Aside";
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

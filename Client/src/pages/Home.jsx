import {Feed,Aside,Sidebar} from "../components/index.js"

export default function Home() {
  return (
    <div className="flex flex-row h-screen">
        <Sidebar></Sidebar>
        <Feed></Feed>
        <Aside></Aside>
    </div>
  )
}

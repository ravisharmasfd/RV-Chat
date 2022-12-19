import {Feed,Sidebar} from "../components/index.js"

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row">
        <Sidebar></Sidebar>
        <Feed></Feed>
    </div>
  )
}

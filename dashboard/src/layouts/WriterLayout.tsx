import { Outlet } from "react-router-dom"
import Topbar from "../components/Topbar"
import NavSidebar from "../components/NavSidebar"

export default function WriterLayout() {
  return (
    <div className="h-screen flex flex-col">
      <Topbar />
      <div className="flex flex-1">
        <NavSidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

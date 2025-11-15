import { Outlet, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function Layout() {
   return (
      <div
         className="h-full flex"
      >
         <Sidebar />
         <main className="flex-1 bg-[#F4F4F4]">
            <Outlet />
         </main>
      </div>
   );
}

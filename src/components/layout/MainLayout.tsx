import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import { TopNav } from "./TopNav";

const MainLayout: React.FC = () => {
  // TODO: Replace with user context or auth
  const userName = "John Doe";

  // TODO: Replace with utility function or Date-fns/Day.js
  const formattedDate = "Saturday, 11th November 2022";

  return (
    <div className="Main-entry-point flex flex-row w-screen h-screen bg-gray-50 overflow-hidden">
      <SideNav />
      <section className="flex flex-col w-full h-full overflow-hidden">
        {/* Top Navbar */}
        <TopNav userName={userName} formattedDate={formattedDate} />
        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 py-4 bg-zinc-50 bg-gradient-to-b from-white/0 to-blue-500/30">
          {/*This is where the nested routes will be rendered which will be given my router dom from app.tsx  */}
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default MainLayout;

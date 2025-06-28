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
    <div className="Main-entry-point flex h-screen w-screen flex-row overflow-hidden">
      <SideNav />
      <section className="flex h-full w-full flex-col overflow-hidden">
        {/* Top Navbar */}
        <TopNav userName={userName} formattedDate={formattedDate} />
        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-zinc-50 bg-gradient-to-b from-white/0 to-blue-500/30 px-4 py-4">
          {/*This is where the nested routes will be rendered which will be given my router dom from app.tsx  */}
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default MainLayout;

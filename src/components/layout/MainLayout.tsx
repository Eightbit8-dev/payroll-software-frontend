import React from "react";
import SearchBar from "../common/SearchBar";
import NotificationCenter from "../common/NotificationCenter";
import SideNav from "../common/SideNav";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  //TODO : Utility function to get the current date and format it

  return (
    <div className="Main-entry-point flex flex-row w-screen h-screen">
      <section className="min-h-full border-r-2 border-slate-300 flex ">
        <SideNav />
      </section>
      <section className="flex w-full flex-col">
        {/* Top nav bar */}
        <header className="flex min-w-full border-b-2 border-slate-300 px-6 py-3 h-min justify-between items-center">
          {/* Welcome text */}
          <div className="welcome-text flex flex-col justify-center items-start gap-0 mr-auto">
            <h3 className="text-2xl font-medium text-zinc-800">
              Welcome John Doe{" "}
            </h3>
            <p className="text-lg font-medium text-zinc-800">
              Saturday,{" "}
              <span className="text-slate-500">11th November 2022.</span>
            </p>
          </div>
          {/* Search bar */}
          <SearchBar />
          {/* Action icons */}
          <div className="flex justify-center items-center gap-3.5 ml-auto">
            <NotificationCenter />
            <img className="w-12 h-12 rounded-full" src="/images/profile.png" />
          </div>
        </header>
        {children}
      </section>
    </div>
  );
};

export default MainLayout;

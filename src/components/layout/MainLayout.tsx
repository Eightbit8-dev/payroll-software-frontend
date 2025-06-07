import React from "react";
import SearchBar from "../common/SearchBar";
import NotificationCenter from "../common/NotificationCenter";
import SideNav from "../common/SideNav";
import { motion } from "framer-motion";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  //TODO : Utility function to get the current date and format it

  return (
    <div className="Main-entry-point flex flex-row w-screen h-screen">
      <SideNav />

      <section className="flex w-full flex-col">
        {/* Top nav bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white  border-b-2 border-zinc-200 p-4"
        >
          <div className="flex items-center justify-between">
            {/* Welcome text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col"
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-semibold text-zinc-800"
              >
                Welcome John Doe
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-zinc-600"
              >
                Saturday, 11th November 2022
              </motion.p>
            </motion.div>

            {/* Search bar */}
            <div className="flex-1 max-w-md mx-8">
              <SearchBar />
            </div>

            {/* Action icons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center space-x-3 gap-6"
            >
              <NotificationCenter notifications={3} />

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className=" bg-slate-100 rounded-full cursor-pointer transition-all ease-in-out duration-200 hover:bg-slate-200"
              >
                <img
                  className="w-12 h-12 rounded-full"
                  src="/images/profile.png"
                />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
        {children}
      </section>
    </div>
  );
};

export default MainLayout;

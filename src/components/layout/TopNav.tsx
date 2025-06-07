import { motion } from "framer-motion";
import React from "react";
import NotificationCenter from "../common/NotificationCenter";
import SearchBar from "../common/SearchBar";

interface TopNavProps {
  userName?: string;
  formattedDate?: string;
}
export const TopNav: React.FC<TopNavProps> = ({ userName, formattedDate }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border-b border-zinc-200 px-6 py-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        {/* Welcome Section */}
        <div className="flex flex-col">
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-semibold text-zinc-800"
          >
            Welcome, {userName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-zinc-500"
          >
            {formattedDate}
          </motion.p>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-lg mx-8">
          <SearchBar />
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-5"
        >
          <NotificationCenter notifications={3} />

          {/* Profile Image */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.3 }}
            className="rounded-full overflow-hidden bg-slate-100 hover:bg-slate-200 transition-all"
          >
            <img
              src="/images/profile.png"
              alt="Profile"
              className="w-10 h-10 object-cover rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/default-user.png";
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
};

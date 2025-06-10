import { motion } from "framer-motion";
import React from "react";

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="relative"
    >
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="relative  rounded-lg bg-slate-200"
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
          <motion.div
            animate={{
              color: isFocused ? "#3b82f6" : "#6b7280",
              scale: isFocused ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <img src="/icons/search-icon.svg" alt="search" />
          </motion.div>
        </div>
        <input
          type="text"
          placeholder="Search..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-12 pr-4 py-3 border text-base font-medium text-slate-700 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </motion.div>
    </motion.div>
  );
};

export default SearchBar;

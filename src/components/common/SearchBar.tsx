import React from "react";

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
  return (
    <div className="w-96 p-3  mx-auto  bg-slate-200 rounded-[10px] inline-flex justify-start items-center gap-4 overflow-hidden">
      <img src="./icons/search-icon.svg" alt="search" />
      <input
        className="text-slate-500 text-base font-normal"
        type="text"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBar;

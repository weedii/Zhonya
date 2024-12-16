"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const SearchInput = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="w-full hidden md:inline-flex flex-1 h-12 relative">
      <FaSearch className="text-md absolute left-2.5 mt-4 text-yellow-500" />

      <input
        type="text"
        name="search"
        placeholder="Search products..."
        autoFocus
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        className="flex-1 h-full outline-none bg-transparent border-[1px] border-black/20 dark:border-white/20 rounded-md pl-8 pr-28"
      />

      {searchText && (
        <IoMdClose
          className="text-black hover:text-red-700 cursor-pointer absolute right-20 top-4"
          onClick={() => setSearchText("")}
        />
      )}

      <button
        type="submit"
        className="bg-yellow-500 text-white rounded-md absolute right-0 top-2 px-3.5 py-1.5 mr-1.5 text-sm font-medium hover:opacity-85"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;

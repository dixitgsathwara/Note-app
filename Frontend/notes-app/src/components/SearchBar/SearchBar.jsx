import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

export const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className='flex items-center px-4 bg-slate-100 rounded-md w-full sm:w-80 mx-auto'>
      <input
        type="text"
        placeholder='Search Notes'
        className='w-full text-xs bg-transparent py-[11px] outline-none'
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdClose
          className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3'
          onClick={onClearSearch}
        />
      )}
      <FaMagnifyingGlass
        className='text-slate-400 cursor-pointer hover:text-black'
        onClick={handleSearch}
      />
    </div>
  );
};

import React, { useState } from 'react'
import { ProfileInfo } from '../Cards/ProfileInfo'
import {useNavigate} from 'react-router-dom'
import { SearchBar } from '../SearchBar/SearchBar'
export const Navbar = ({userInfo,onSearchNotes,handleClearSearch}) => {
  const [searchQuery,setSearchQuery]=useState("");
  const navigate=useNavigate();
  const onLogout= ()=>{
    localStorage.clear();
    navigate('/')
  }
  const handleSearch =()=>{
    if(searchQuery){
      onSearchNotes(searchQuery);
    }
  }
  const onClearSearch =()=>{
    setSearchQuery("")
    handleClearSearch();
  }
  return (
    <div className='bg-white flex flex-col sm:flex-row items-center justify-between px-6 py-2 drop-shadow-sm'>
      <h2 className='text-xl font-medium text-black py-2'>Notes</h2>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        className='order-1 sm:order-none'
      />
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} className='order-2 sm:order-none' />
    </div>
  );
}


import React from 'react';
import { getInitial } from '../../utils/helper';

export const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <div className='flex items-center gap-3'>
      <div className='w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
        {getInitial(userInfo.fullName)}
      </div>
      <div>
        <p className="text-sm font-medium">{userInfo.fullName}</p>
        <button className='text-sm text-slate-700 underline' onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from 'react-icons/md';

const ToastMessage = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    if (isShown) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 5000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isShown, onClose]);

  return (
    <div className={`fixed top-20 right-2 transition-opacity duration-500 ${isShown ? "opacity-100" : "opacity-0"}`}>
      <div className={`min-w-60 bg-white border shadow-2xl rounded-md relative after:w-[5px] after:h-full ${type === 'delete' ? "after:bg-red-500" : "after:bg-green-500"} after:absolute after:left-0 after:top-0 after:rounded-l-lg`}>
        <div className="flex items-center gap-3 px-2 py-4">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full ${type === 'delete' ? "bg-red-50" : "bg-green-50"}`}>
            {type === 'delete' ? (
              <MdDeleteOutline className='text-xl text-red-500' />
            ) : (
              <LuCheck className='text-xl text-green-500' />
            )}
          </div>
          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;

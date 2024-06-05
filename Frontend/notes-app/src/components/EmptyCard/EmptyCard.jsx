import React from 'react'

export const EmptyCard = ({img,message}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
        <img src={img} alt="No notes" width={350} height={350} />
        <p className="w-1/3 text-sm font-medium text-slate-700 text-center leading-7 mt-5">{message}</p>
    </div>
  )
}

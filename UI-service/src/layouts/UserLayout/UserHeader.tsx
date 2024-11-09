import React from 'react'
import Search from '../../components/Search'

const UserHeader = () => {
  return (
    <>
      <header className=''>
        <div className='flex justify-around mx-auto  '>
          <div className='flex items-center px-4 py-2 text-xl font-bold select-none'>NewsHub</div>
          <div className='flex gap-3 items-center'>
            <div className='px-4 py-2 hover:bg-blue-gray-50 hover:bg-opacity-70 rounded-lg'>World</div>
            <div className='px-4 py-2 hover:bg-blue-gray-50 hover:bg-opacity-70 rounded-lg'>Politics</div>
            <div className='px-4 py-2 hover:bg-blue-gray-50 hover:bg-opacity-70 rounded-lg'>Business</div>
            <div className='px-4 py-2 hover:bg-blue-gray-50 hover:bg-opacity-70 rounded-lg'>Technology</div>
            <div className='flex gap-1 items-center px-4 py-2 hover:bg-blue-gray-50 hover:bg-opacity-70 rounded-lg'>
              <div>More</div>
              <i className="fa-solid fa-chevron-down text-secondary-text"></i>
            </div>
          </div>
          <div className='flex items-center gap-4 px-4 py-2'>
            <Search></Search>
            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-green-700 text-white select-none'><a href='/admin'>MS</a></div>
          </div>
        </div>

      </header>
    </>
  )
}

export default UserHeader
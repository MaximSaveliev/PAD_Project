import React from 'react'

const Search = () => {
    return (
        <div className=''>
            <form action="" className='relative w-12 h-12 rounded-lg p-2 overflow-hidden bg-blue-gray-500'>
                <input type="search" className='border-none outline-none w-[calc(100%-40px)] h-full rounded-lg pl-3 opacity-0 pointer-events-none transition-opacity bg-deep-orange-100' placeholder="Search..." name="" id="" />
                <div className='grid w-10 h-10 absolute top-0 bottom-0 right-1 m-auto cursor-pointer place-items-center rounded-lg hover:bg-blue-gray-50 bg-amber-300'>
                    <i className="text-primary-text absolute text-lg fa-solid fa-magnifying-glass"></i>
                    <i className="text-primary-text absolute text-lg opacity-0 fa-solid fa-x"></i>
                </div>
            </form>
        </div>
    )
}

export default Search
import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const Search = ({ notResponsive }) => {
    return (
        <div
            className={`rounded flex items-center lg:border-b border-gray-700 focus-within:border-red-700 ${
                !notResponsive && 'border-b'
            }`}
        >
            <input
                className={`bg-transparent p-2 w-full py-1 outline-none lg:block ${notResponsive && 'hidden'}`}
                type='text'
                placeholder='Search by title or author'
            />
            <button title='Search' className='text-2xl p-2 text-white'>
                <FaMagnifyingGlass />
            </button>
        </div>
    );
};

export default Search;

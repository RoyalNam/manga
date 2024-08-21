import React from 'react';
import { useRouter } from 'next/navigation';
import { FaAngleRight } from 'react-icons/fa';

const SectionTitle = ({ title, bgLinear, bgRedLinear, to = '/' }) => {
    const router = useRouter();
    return (
        <div
            className={`flex justify-between py-5 ${bgLinear && 'bg-linear-red-row'} ${
                bgRedLinear && 'bg-linear-red2'
            }`}
        >
            <h4 className='font-bold uppercase pl-4 text-white text-xl'>{title}</h4>
            <button
                className='flex items-center bg-yellow text-black font-medium text-xs px-2 rounded-l-md hover:px-3 hover:rounded-l-full'
                onClick={() => router.push(to)}
            >
                <span className='ml-1'>View Alls</span>
                <span className='text-xl'>
                    <FaAngleRight />
                </span>
            </button>
        </div>
    );
};

export default SectionTitle;

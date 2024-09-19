'use client';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

const ViewerPage = () => {
    const { chapterId } = useParams();

    useEffect(() => {
        const fetchData = async () => {};
        fetchData();
    }, [chapterId]);

    return (
        <div className='flex justify-between items-center flex-col'>
            <div className='fixed top-0 left-0 right-0 bottom-0'>
                <div className='absolute inset-x-0 top-0 bg-black/80'>
                    <h4 className='text-center font-semibold  py-2'>Chu thuat hoi chien</h4>
                </div>
                <div className='absolute inset-x-0 bottom-0 bg-black/80'>
                    <div className='flex items-center'>
                        <span className='text-center'>Demo</span>
                    </div>
                </div>
            </div>
            <div className='max-w-3xl w-full pb-4'>{/* Img */}</div>
        </div>
    );
};

export default ViewerPage;

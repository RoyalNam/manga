'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaOutdent, FaXmark } from 'react-icons/fa6';
import Link from 'next/link';
import Search from './Search';
import { navLinks } from '@/constants';

const Navbar = () => {
    const pathName = usePathname();
    const [isShowNav, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    return (
        <nav className='flex items-center px-4'>
            <div className='w-24 py-2 mr-3'>
                <a className='block' href='/'>
                    <img src={'/logo.png'} alt='logo' />
                </a>
            </div>

            <div className='flex-1 hidden md:flex justify-between'>
                <div className='flex items-center uppercase'>
                    {navLinks.map((nav) => {
                        const isActive = pathName === nav.link;
                        return (
                            <Link
                                className={`p-4 text-hover ${isActive ? 'text-active' : 'text-inherit'}`}
                                key={nav.title}
                                href={nav.link}
                            >
                                {nav.title}
                            </Link>
                        );
                    })}
                </div>
                <Search notResponsive />
            </div>

            <div className='md:hidden ml-auto text-2xl'>
                <FaOutdent onClick={() => setShow(true)} />
            </div>
            {isShowNav && (
                <div className='fixed inset-0 z-10'>
                    <div className='absolute w-full h-full bg-black/50' onClick={handleClose} />
                    <div className='absolute z-20 right-0 h-full text-white bg-black/70 min-w-[400px]'>
                        <button title='Close' className='text-3xl mt-2 ml-2'>
                            <FaXmark onClick={handleClose} />
                        </button>
                        <div className='px-4 my-4'>
                            <Search />
                        </div>
                        <div className='flex flex-col'>
                            {navLinks.map((nav) => {
                                const isActive = pathName === nav.link;
                                return (
                                    <Link
                                        className={`flex items-center text-hover p-4 ${
                                            isActive ? 'text-active' : 'text-inherit'
                                        }`}
                                        key={nav.title}
                                        href={nav.link}
                                        onClick={handleClose}
                                    >
                                        <span className='text-lg mr-2'>{nav.icon}</span>
                                        <span className=''>{nav.title}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

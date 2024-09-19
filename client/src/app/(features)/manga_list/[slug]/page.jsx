'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaAngleDown } from 'react-icons/fa6';
import { mangaApi } from '@/api/modules/manga';
import MangaCard from '@/components/Card/MangaCard';
import { mangaListPaths } from '@/constants';

const MangaListPage = () => {
    const { slug } = useParams();
    const [genreTags, setGenreTags] = useState([]);
    const [genreTagId, setGenreTagId] = useState('');
    const [isShowFilter, setShowFilter] = useState(false);
    const [mangaList, setMangaList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const limit = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tagsData = await mangaApi.getTag();
                const genreTagsData = getGenreTags(tagsData);
                setGenreTags(genreTagsData);

                const mangaListData = await fetchMangaData(0);
                setMangaList(mangaListData);
            } catch (error) {
                console.error('Error fetching manga list:', error);
            }
        };

        fetchData();
        console.log('slug:', slug);
    }, [slug]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const clientHeight = window.innerHeight;

            if (scrollHeight - scrollTop <= clientHeight + 150 && !loading && offset <= 30) {
                loadMoreManga();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, offset]);

    useEffect(() => {
        const fetchData = async () => {
            setOffset(0);
            setMangaList(await fetchMangaData(0));
        };

        fetchData();
    }, [genreTagId]);

    const getGenreTags = (data) => {
        return data.filter((tag) => tag.attributes.group === 'genre');
    };

    const fetchMangaData = async (offsetValue) => {
        try {
            const paramsMap = {
                [mangaListPaths.browse.split('/').pop()]: { limit, offset: offsetValue },
                [mangaListPaths.update.split('/').pop()]: { limit, status: ['ongoing'], offset: offsetValue },
                [mangaListPaths.completed.split('/').pop()]: { limit, status: ['completed'], offset: offsetValue },
                [mangaListPaths.new.split('/').pop()]: { limit, order: { year: 'desc' }, offset: offsetValue },
            };

            const params = paramsMap[slug] || { limit, offset: offsetValue };

            if (genreTagId) {
                params.includedTags = [genreTagId];
            }

            const mangaListData = await mangaApi.getMangaList(params);

            return mangaListData;
        } catch (error) {
            console.error('Error fetching manga list:', error);
            return [];
        }
    };

    const loadMoreManga = async () => {
        setLoading(true);
        const newOffset = offset + limit;
        const newMangaList = await fetchMangaData(newOffset);

        if (newMangaList && newMangaList.length > 0) {
            setMangaList((prev) => [...prev, ...newMangaList]);
            setOffset(newOffset);
        }
        setLoading(false);
    };

    const renderButton = (id, title) => (
        <div
            key={id}
            className={`border rounded-full px-2.5 ${
                id === genreTagId ? 'text-[#ffd600] shadow-sm shadow-current' : 'border-white/40'
            }`}
            onClick={() => setGenreTagId(id === genreTagId ? '' : id)}
        >
            <button>{title}</button>
        </div>
    );

    return (
        <div>
            <div className=''>
                <div className='flex justify-between bg-linear-red-row p-4 font-medium'>
                    <h4 className='uppercase'>{slug}</h4>
                    <div>
                        <div className='flex gap-4 text-xl'>
                            <button>A-Z</button>
                            <button>Z-A</button>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setShowFilter(true)}
                    className='flex items-center ml-auto mr-4 mt-4 gap-4 rounded-full py-1 pl-6 pr-3 text-[#ffd600] border border-current'
                >
                    <span className=''>Filter</span>
                    <span>
                        <FaAngleDown />
                    </span>
                </button>
                {isShowFilter && (
                    <div className='fixed inset-0 flex justify-center select-none z-30'>
                        <div className='w-full h-full bg-black/45 z-10' onClick={() => setShowFilter(false)} />
                        <div className='absolute top-32 p-6 w-2/3 shadow-sm shadow-[#ffd600] bg-[#191919] z-20 rounded-lg'>
                            <div className=''>
                                <h5 className='font-semibold text-white text-xl mb-4'>By Genre</h5>
                                <div className='flex flex-wrap justify-start gap-3'>
                                    {genreTags.map((tag) => renderButton(tag.id, tag.attributes.name.en))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='grid px-4 py-6 grid-cols-3 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 gap-x-2 gap-y-3'>
                {Array.isArray(mangaList) &&
                    mangaList.map((manga) => <MangaCard key={manga.id} manga={manga} isChapterAvailable={false} />)}
            </div>
        </div>
    );
};

export default MangaListPage;

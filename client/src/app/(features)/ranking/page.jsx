'use client';
import React, { useEffect, useState } from 'react';
import { mangaApi } from '@/api/modules/manga';
import MangaCard from '@/components/Card/MangaCard';

const RankingPage = () => {
    const [mangaList, setMangaList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const limit = 10;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const mangaListData = await fetchMangaData(0);
                setMangaList(mangaListData);
            } catch (error) {
                console.error('Failed to fetch manga data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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

    const fetchMangaData = async (offsetValue) => {
        try {
            const mangaListData = await mangaApi.getMangaList({
                limit: limit,
                offset: offsetValue,
                order: {
                    followedCount: 'desc',
                },
            });

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

    return (
        <>
            <div className='grid px-4 py-6 grid-cols-3 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 gap-x-2 gap-y-3'>
                {Array.isArray(mangaList) &&
                    mangaList.map((manga, index) => (
                        <MangaCard key={manga.id} manga={manga} rankNumber={index + 1} isChapterAvailable={false} />
                    ))}
            </div>
            {loading && (
                <div>
                    <img src='/loading-96.png' alt='' className='mx-auto animate-spin' />
                </div>
            )}
        </>
    );
};

export default RankingPage;

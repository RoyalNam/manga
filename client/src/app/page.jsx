'use client';
import React, { useState, useEffect } from 'react';
import { mangaApi } from '@/api/modules/manga';
import MangaCard from '@/components/Card/MangaCard';
import TopRankedCard from '@/components/Card/TopRankedCard';
import SectionTitle from '@/components/SectionTitle';
import MainLayout from './(features)/layout';
import { mangaListPaths, paths } from '@/constants';

const Home = () => {
    const [updateMangaList, setUpdateMangaList] = useState([]);
    const [completeMangaList, setCompleteMangaList] = useState([]);
    const [topMangaList, setTopMangaList] = useState([]);
    const [newMangaList, setNewMangaList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadMangaData = async () => {
            setLoading(true);
            try {
                const updateMangaData = await mangaApi.getMangaList(8, undefined, ['ongoing'], undefined);
                setUpdateMangaList(updateMangaData);

                const completeMangaData = await mangaApi.getMangaList(8, undefined, ['completed'], undefined);
                setCompleteMangaList(completeMangaData);

                const topMangaData = await mangaApi.getMangaList(10, undefined, undefined, {
                    followedCount: 'desc',
                });
                setTopMangaList(topMangaData);

                const newMangaData = await mangaApi.getMangaList(8, undefined, undefined, {
                    year: 'desc',
                });
                setNewMangaList(newMangaData);
            } catch (error) {
                console.error('Failed to fetch manga data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadMangaData();
    }, []);

    return (
        <MainLayout>
            <div className='flex'>
                <div className='bg-[#131313] flex flex-col flex-1'>
                    <div>
                        <SectionTitle title='Daily Updates' bgLinear to={mangaListPaths.update} />
                        <div className='grid px-4 py-6 grid-cols-3 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 gap-x-2 gap-y-3'>
                            {Array.isArray(updateMangaList) &&
                                updateMangaList.map((manga) => <MangaCard key={manga.id} manga={manga} />)}
                        </div>
                    </div>
                    <div>
                        <SectionTitle title='Completed' bgLinear to={mangaListPaths.completed} />
                        <div className='grid px-4 py-6 grid-cols-3 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 gap-x-2 gap-y-3'>
                            {Array.isArray(completeMangaList) &&
                                completeMangaList.map((manga) => <MangaCard key={manga.id} manga={manga} />)}
                        </div>
                    </div>
                    <div>
                        <SectionTitle title='New' bgLinear to={mangaListPaths.new} />
                        <div className='grid px-4 py-6 grid-cols-3 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 gap-x-2 gap-y-3'>
                            {Array.isArray(newMangaList) &&
                                newMangaList.map((manga) => <MangaCard key={manga.id} manga={manga} />)}
                        </div>
                    </div>
                </div>
                <div className='hidden md:block md:w-[35%] xl:w-[25%] ml-4'>
                    <SectionTitle title='Hottest' bgRedLinear to={paths.ranking} />
                    <div className='flex flex-col bg-[#5d0914] max-w-full overflow-hidden'>
                        {Array.isArray(topMangaList) &&
                            topMangaList.map((manga, index) => (
                                <TopRankedCard
                                    key={manga.id}
                                    isTopThree={index < 3}
                                    rankNumber={index + 1}
                                    manga={manga}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Home;

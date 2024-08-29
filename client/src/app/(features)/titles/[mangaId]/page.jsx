'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaBookOpen } from 'react-icons/fa6';
import { getAuthor, getCover } from '@/api/modules';
import { mangaApi } from '@/api/modules/manga';
import { MANGADEX_COVERS_URL } from '@/constants';

const Title = () => {
    const router = useRouter();
    const { mangaId } = useParams();
    const [manga, setManga] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [coverImage, setCoverImage] = useState(null);
    const [authorNames, setAuthorNames] = useState('');
    const [loading, setLoading] = useState(true);

    const extractIdsByType = (relationships, type = 'cover_art') => {
        return relationships.filter((rel) => rel.type === type).map((rel) => rel.id);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const mangaData = await mangaApi.getMangaDetails(mangaId);
                setManga(mangaData);
                console.log('manga', mangaData);

                const coverArtIds = extractIdsByType(mangaData.relationships);
                if (coverArtIds.length > 0) {
                    const coverData = await getCover(coverArtIds[0]);
                    setCoverImage(coverData.attributes.fileName);
                }

                const authorIds = extractIdsByType(mangaData.relationships, 'author');
                const authorData = await Promise.all(authorIds.map((id) => getAuthor(id)));
                const names = authorData.map((author) => author.attributes.name).join(', ');

                setAuthorNames(names);

                const chapterData = await mangaApi.getChapters(mangaId);
                const allChapters = [];

                for (const volume of Object.values(chapterData.volumes)) {
                    const chapters = Object.values(volume.chapters);
                    allChapters.push(...chapters);
                }
                allChapters.sort((a, b) => parseFloat(a.chapter) - parseFloat(b.chapter));

                const chunkedChapters = [];
                for (let i = 0; i < allChapters.length; i += 50) {
                    const chunk = allChapters.slice(i, i + 50);
                    chunkedChapters.push(chunk);
                }
                console.log('chapter', chunkedChapters);

                setChapters(chunkedChapters);
            } catch (error) {
                console.error('Error fetching cover or author data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [mangaId]);

    if (loading)
        return (
            <div>
                <img src='/loading-96.png' alt='' className='mx-auto animate-spin' />
            </div>
        );

    return (
        manga && (
            <>
                <div className='mb-11'>
                    <div className='flex flex-col md:flex-row gap-6 px-5 pt-12 pb-6'>
                        <div className='mx-auto min-w-[250px] max-w-[270px] min-h-[375px] max-h-[405px]'>
                            <img
                                className='w-full object-cover h-full'
                                src={
                                    coverImage
                                        ? `${MANGADEX_COVERS_URL}/${manga.id}/${coverImage}.512.jpg`
                                        : '/placeholder.png'
                                }
                                alt={manga.attributes.title['en'] || Object.values(manga.attributes.title)[0]}
                            />
                        </div>
                        <div className='flex-1 mt-6 md:mt-0'>
                            <div className='bg-linear-black px-6 pt-5 pb-3'>
                                <h2 className='text-2xl font-semibold text-white'>
                                    {manga.attributes.title['en'] || Object.values(manga.attributes.title)[0]}
                                </h2>
                                <p className='uppercase text-sm line-clamp-1'>{authorNames}</p>
                            </div>
                            <div>
                                <h4 className='border-b border-gray-700 px-5 py-4 mt-3 uppercase font-semibold tracking-widest text-sm'>
                                    Summary
                                </h4>
                                <pre className='px-5 py-7 text-wrap'>
                                    {manga.attributes.description['en'] ||
                                        Object.values(manga.attributes.description)[0]}
                                </pre>
                            </div>
                            <div className='md:px-4 hover:opacity-75'>
                                <button className='bg-[#ffd600] w-full min-w-[150px] md:w-auto text-black rounded-lg font-semibold text-lg px-4 py-3'>
                                    Read Now
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=' max-w-7xl mt-6 mx-auto'>
                        <div className='flex mx-4 items-center gap-1 text-lg font-semibold pb-2 border-b border-gray-700'>
                            <FaBookOpen />
                            <span>Chapters</span>
                        </div>
                        <div className='mx-4'>
                            <div className='flex flex-wrap my-5 gap-4'>
                                {chapters.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`${
                                            selectedIndex == index && 'text-[#ffd600]'
                                        } bg-black px-3 hover:text-[#ffd600] py-1 text-sm rounded-full`}
                                        onClick={() => setSelectedIndex(index)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                                {chapters.length > 0 &&
                                    chapters[selectedIndex].map((chapter, index) => (
                                        <button
                                            key={index}
                                            className={`${
                                                false && 'text-[#ffd600]'
                                            } bg-black  px-3 hover:text-[#ffd600] py-1 text-sm rounded-full`}
                                            onClick={() => router.push(`/${chapter.id}`)}
                                        >
                                            {`Chapter ${chapter.chapter}`}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    );
};

export default Title;

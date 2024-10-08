'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthor, getChapter, getCover } from '@/api/modules';
import { MANGADEX_COVERS_URL } from '@/constants';

const MangaCard = ({ manga, rankNumber, isChapterAvailable = true }) => {
    const router = useRouter();
    const [coverImage, setCoverImage] = useState(null);
    const [authorNames, setAuthorNames] = useState('');
    const [latestChapter, setLatestChapter] = useState(null);
    const [loading, setLoading] = useState(true);

    const extractIdsByType = (relationships, type = 'cover_art') => {
        return relationships.filter((rel) => rel.type === type).map((rel) => rel.id);
    };

    useEffect(() => {
        const loadMangaData = async () => {
            try {
                const coverArtIds = extractIdsByType(manga.relationships);
                if (coverArtIds.length > 0) {
                    const coverData = await getCover(coverArtIds[0]);
                    setCoverImage(coverData.attributes.fileName);
                }

                const authorIds = extractIdsByType(manga.relationships, 'author');
                const authorData = await Promise.all(authorIds.map((id) => getAuthor(id)));
                const names = authorData.map((author) => author.attributes.name).join(', ');
                setAuthorNames(names);

                if (manga.attributes.latestUploadedChapter) {
                    const chapterData = await getChapter(manga.attributes.latestUploadedChapter);
                    setLatestChapter(chapterData);
                }
            } catch (error) {
                console.error('Error fetching cover, author, or chapter:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMangaData();
    }, [manga]);

    const renderPlaceholder = () => (
        <div className='flex flex-col text-sm max-w-full animate-pulse'>
            <div className='relative group cursor-pointer'>
                <div className='w-full aspect-2/3 bg-[#212121]'></div>
                <div className='absolute pt-7 overflow-hidden w-full h-[72px] bottom-0 px-2 leading-none bg-gradient-to-t from-black'>
                    <div className='bg-[#3c3c3c] rounded-full h-4 w-3/4 mb-2'></div>
                    <div className='bg-[#3c3c3c] rounded-full h-3 w-1/2'></div>
                </div>
            </div>
            {isChapterAvailable && (
                <div className='bg-[#212121] px-2 pb-2 rounded-b-lg border-t border-white/30'>
                    <p className='bg-[#3c3c3c] rounded-full mt-2 h-4 w-3/4 inline-block'></p>
                    <p className='bg-[#3c3c3c] rounded-full h-3 w-1/2 mt-1 inline-block'></p>
                </div>
            )}
        </div>
    );

    const renderContent = () => (
        <div className='flex flex-col text-sm max-w-full'>
            <div className='relative group cursor-pointer' onClick={() => router.push(`/titles/${manga.id}`)}>
                <div className='w-full aspect-2/3'>
                    <img
                        className='object-cover w-full h-full'
                        src={
                            coverImage ? `${MANGADEX_COVERS_URL}/${manga.id}/${coverImage}.256.jpg` : '/placeholder.png'
                        }
                        alt={manga.attributes.title['en'] || Object.values(manga.attributes.title)[0]}
                    />
                    {rankNumber && (
                        <span className='absolute bg-black flex items-center justify-center rounded-full w-8 h-8 -top-3 left-1/2 -translate-x-1/2'>
                            <span className='absolute inset-0 flex items-center justify-center'>
                                <img src='/medal-96.png' alt='' className='w-7 h-7' />
                            </span>
                            <span className='relative text-xs font-black font-sans text-black'>{rankNumber}</span>
                        </span>
                    )}
                </div>
                <div className='absolute pt-7 overflow-hidden w-full h-[72px] bottom-0 px-2 leading-none bg-linear group-hover:h-20'>
                    <h4 className='line-clamp-1 font-semibold text-white group-hover:text-[#ffd600]'>
                        {manga.attributes.title['en'] || Object.values(manga.attributes.title)[0]}
                    </h4>
                    <div className='mt-2 text-[10px] line-clamp-1 uppercase'>{authorNames}</div>
                </div>
            </div>
            {isChapterAvailable && (
                <div
                    onClick={() => router.push('/')}
                    className='bg-linear-black px-2 pb-2 rounded-b-lg border-t bg-linear-red'
                >
                    <p className='text-white font-semibold mt-2'>
                        <span className='text-sm'>Chapter: </span>
                        <span>
                            #
                            {latestChapter && latestChapter.attributes?.chapter
                                ? latestChapter.attributes.chapter
                                : 'N/A'}
                        </span>
                    </p>
                    <p className='text-xs line-clamp-1'>
                        {latestChapter && latestChapter.attributes.title ? latestChapter.attributes.title : '___'}
                    </p>
                </div>
            )}
        </div>
    );

    return loading ? renderPlaceholder() : renderContent();
};

export default MangaCard;

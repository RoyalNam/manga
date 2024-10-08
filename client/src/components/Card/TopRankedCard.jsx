import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MANGADEX_COVERS_URL } from '@/constants';
import { getAuthor, getCover } from '@/api/modules';

const TopRankedCard = ({ isTopThree, rankNumber, manga }) => {
    const router = useRouter();
    const [coverImage, setCoverImage] = useState(null);
    const [authorNames, setAuthorNames] = useState('');
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
            } catch (error) {
                console.error('Error fetching cover or author data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMangaData();
    }, [manga]);

    const renderPlaceholder = () => (
        <div className='group flex flex-row items-center text-sm p-4 pb-2 animate-pulse bg-[#212121]'>
            <div className='relative w-20'>
                <div className='h-28 min-w-[80px] bg-[#3c3c3c]'></div>
                <span className='absolute bg-black text-white flex items-center justify-center rounded-full w-[30px] h-[30px] -top-3 left-1/2 -translate-x-1/2'>
                    <div className='bg-[#3c3c3c] h-5 w-5 rounded-full'></div>
                </span>
            </div>
            <div className='flex-1 flex flex-col ml-3'>
                <div className='leading-4'>
                    <div className='bg-[#3c3c3c] rounded-full h-5 w-3/4 mb-1 inline-block'></div>
                    <div className='bg-[#3c3c3c] rounded-full h-3 w-1/2 inline-block'></div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => (
        <div
            className='group flex flex-row items-center text-sm p-4 pb-2 hover:bg-white/10 cursor-pointer'
            onClick={() => router.push(`/titles/${manga.id}`)}
        >
            <div className='relative w-20'>
                <img
                    className='h-28 min-w-[80px] block'
                    src={coverImage ? `${MANGADEX_COVERS_URL}/${manga.id}/${coverImage}.256.jpg` : '/placeholder.png'}
                    alt={manga.attributes.title['en'] || Object.values(manga.attributes.title)[0]}
                />
                <span className='absolute bg-black text-white flex items-center justify-center rounded-full w-[30px] h-[30px] -top-3 left-1/2 -translate-x-1/2'>
                    {isTopThree && (
                        <span className='absolute inset-0 flex items-center justify-center'>
                            <img src='/medal-96.png' alt='' className='w-7 h-7' />
                        </span>
                    )}
                    <span className='relative text-xs font-semibold'>{rankNumber}</span>
                </span>
            </div>
            <div className='flex flex-col ml-3'>
                <div className='leading-4'>
                    <h4 className='font-bold text-base line-clamp-1 text-white group-hover:text-[#ffd600]'>
                        {manga.attributes.title['en'] || Object.values(manga.attributes.title)[0]}
                    </h4>
                    <p className='text-[10px] mt-1 line-clamp-1 uppercase'>{authorNames}</p>
                </div>
            </div>
        </div>
    );

    return loading ? renderPlaceholder() : renderContent();
};

export default TopRankedCard;

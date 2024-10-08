'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getChapterImages } from '@/api/modules';
import { mangaApi } from '@/api/modules/manga';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { FaAngleDown } from 'react-icons/fa6';

const ViewerPage = () => {
    const { mangaId, chapterId } = useParams();
    const router = useRouter();
    const [manga, setManga] = useState();
    const [chapterImages, setChapterImages] = useState();
    const [chapters, setChapters] = useState([]);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const mangaData = await mangaApi.getMangaDetails(mangaId);
            setManga(mangaData);

            if (chapterId) {
                const chapterImagesResp = await getChapterImages(chapterId);
                setChapterImages(chapterImagesResp);
                console.log('chapterImagesResp', chapterImagesResp);
            }

            const chapterData = await mangaApi.getChapters(mangaId);
            const allChapters = [];

            for (const volume of Object.values(chapterData.volumes)) {
                const chapters = Object.values(volume.chapters);
                allChapters.push(...chapters);
            }
            allChapters.sort((a, b) => parseFloat(a.chapter) - parseFloat(b.chapter));
            setChapters(allChapters);

            // Find the index of the current chapter
            const currentIndex = allChapters.findIndex((chap) => chap.id === chapterId);
            console.log('curr', currentIndex);

            setCurrentChapterIndex(currentIndex);
            console.log('allChapters', allChapters);
        };
        fetchData();
    }, [chapterId, mangaId]);

    const handleScrollDown = () => {
        window.scrollBy({ top: 400, behavior: 'smooth' });
    };

    const goToChapter = (chapterId) => {
        router.push(`/titles/${mangaId}/viewer/${chapterId}`);
    };

    return (
        chapterImages && (
            <div className='w-full h-full flex justify-center overflow-auto select-none'>
                <div className='fixed inset-x-0 top-0 bg-gradient-to-b from-black pb-4'>
                    <div className='w-full h-full flex gap-2'>
                        <Link href='/'>
                            <img src='/logo.png' alt='' className='w-36' />
                        </Link>
                        <div>
                            <div>
                                <h4 className='font-bold text-white text-2xl py-3'>
                                    {manga?.attributes?.title['en'] || Object.values(manga?.attributes?.title)[0]}
                                </h4>
                                <div className='relative inline-block'>
                                    <div
                                        className='flex justify-end items-center bg-black rounded border border-white/60 min-w-20 p-1 gap-3 cursor-pointer'
                                        onClick={() => setShow(!show)}
                                    >
                                        <span>#{chapters[currentChapterIndex]?.chapter || 'Unknown'}</span>
                                        <FaAngleDown className='text-xl' />
                                    </div>
                                    {show && (
                                        <div className='absolute top-full bg-black/70 inset-x-0 rounded-b-md shadow-sm shadow-white/50 z-10'>
                                            {currentChapterIndex > 0 && (
                                                <button
                                                    onClick={() => goToChapter(chapters[currentChapterIndex - 1]?.id)}
                                                    className='block w-full px-4 py-1.5 border-b border-white/30 hover:text-[#ffd600]'
                                                >
                                                    #{chapters[currentChapterIndex - 1]?.chapter || 'Unknown'}
                                                </button>
                                            )}
                                            <button className='block w-full px-4 py-1.5 border-b border-white/30 text-[#ffd600]'>
                                                #{chapters[currentChapterIndex]?.chapter || 'Unknown'}
                                            </button>
                                            {currentChapterIndex < chapters.length - 1 && (
                                                <button
                                                    onClick={() => goToChapter(chapters[currentChapterIndex + 1]?.id)}
                                                    className='block w-full px-4 py-1.5 hover:text-[#ffd600]'
                                                >
                                                    #{chapters[currentChapterIndex + 1]?.chapter || 'Unknown'}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full select-none' onClick={handleScrollDown}>
                    <div className='max-w-3xl w-full mx-auto overflow-auto pb-4'>
                        {chapterImages?.chapter?.data.map((page, index) => (
                            <img
                                key={index}
                                src={`${chapterImages.baseUrl}/data/${chapterImages.chapter.hash}/${page}`}
                                alt={`Page ${index + 1}`}
                                className='w-full h-auto'
                            />
                        ))}
                    </div>
                </div>
                <ScrollToTopButton />
            </div>
        )
    );
};

export default ViewerPage;

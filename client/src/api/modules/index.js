import { additionalEndpoints } from '../apiEndpoints';
import { fetchData } from '../apiUtils';

export const getChapter = async (chapterId) => fetchData(additionalEndpoints.getChapter, chapterId);
export const getChapterImages = async (chapterId) => fetchData(additionalEndpoints.getChapterImages, chapterId);
export const getAuthor = async (authorId) => fetchData(additionalEndpoints.getAuthor, authorId);
export const getCover = async (mangaOrCoverId) => fetchData(additionalEndpoints.getCover, mangaOrCoverId);

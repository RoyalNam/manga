import { additionalEndpoints } from '../apiEndpoints';
import { fetchData } from '../apiUtils';

export const getChapter = async (chapterId) => fetchData(additionalEndpoints.getChapter, true, chapterId);
export const getChapterImages = async (chapterId) => fetchData(additionalEndpoints.getChapterImages, false, chapterId);
export const getAuthor = async (authorId) => fetchData(additionalEndpoints.getAuthor, true, authorId);
export const getCover = async (mangaOrCoverId) => fetchData(additionalEndpoints.getCover, true, mangaOrCoverId);

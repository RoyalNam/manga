import { mangaEndpoints } from '../apiEndpoints';
import { fetchData } from '../apiUtils';
import publicClient from '../client/public.client';

export const mangaApi = {
    getMangaList: async ({ limit = 10, title, status, order, offset = 0, includedTags }) => {
        try {
            const params = { limit };
            if (title) params.title = title;
            if (status && Array.isArray(status)) params.status = status;
            if (order) params.order = order;
            if (offset) params.offset = offset;
            if (includedTags && Array.isArray(includedTags)) params.includedTags = includedTags;

            const response = await publicClient.get(mangaEndpoints.getMangaList, { params });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching manga list:', error);
            return null;
        }
    },
    getMangaDetails: (mangaId) => fetchData(mangaEndpoints.getMangaDetails, mangaId),
    getRandomManga: () => fetchData(mangaEndpoints.getRandomManga),
    // getChapters: (mangaId) => fetchData(mangaEndpoints.getChapters, mangaId),
    getTag: () => fetchData(mangaEndpoints.getTag),
    getChapters: async (mangaId) => {
        try {
            const response = await publicClient.get(mangaEndpoints.getChapters(mangaId));
            return response.data;
        } catch (error) {
            console.error('Error fetching manga list:', error);
            return null;
        }
    },
};

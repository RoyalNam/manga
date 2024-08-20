import { mangaEndpoints } from '../apiEndpoints';
import { fetchData } from '../apiUtils';
import publicClient from '../client/public.client';

export const mangaApi = {
    getMangaList: async (limit = 10, title, status, order) => {
        try {
            const params = { limit };
            if (title) params.title = title;
            if (status && Array.isArray(status)) params.status = status;
            if (order) params.order = order;

            const response = await publicClient.get(mangaEndpoints.getMangaList, { params });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching manga list:', error);
            return null;
        }
    },
    getMangaDetails: (mangaId) => fetchData(mangaEndpoints.getMangaDetails, mangaId),
    getRandomManga: () => fetchData(mangaEndpoints.getRandomManga),
    getChapters: (mangaId) => fetchData(mangaEndpoints.getChapters, mangaId),
};

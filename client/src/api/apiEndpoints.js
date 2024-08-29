const mangaBaseUrl = '/manga';

export const mangaEndpoints = {
    getMangaList: mangaBaseUrl,
    getMangaDetails: (mangaId) => `${mangaBaseUrl}/${mangaId}`,
    getRandomManga: () => `${mangaBaseUrl}/random`,
    getChapters: (mangaId) => `${mangaBaseUrl}/${mangaId}/aggregate`,
    getTag: () => `${mangaBaseUrl}/tag`,
};

export const additionalEndpoints = {
    getAuthor: (authorId) => `/author/${authorId}`,
    getCover: (mangaOrCoverId) => `/cover/${mangaOrCoverId}`,
    getChapter: (chapterId) => `/chapter/${chapterId}`,
    getChapterImages: (chapterId) => `/at-home/server/${chapterId}`,
};

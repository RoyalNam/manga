import { FaChessKing, FaCrown, FaHeart, FaHome } from 'react-icons/fa';

export const MANGADEX_API_URL = 'https://api.mangadex.org';
export const MANGADEX_COVERS_URL = 'https://uploads.mangadex.org/covers';

export const mangaListPaths = {
    browse: '/manga_list/browse',
    completed: '/manga_list/completed',
    new: '/manga_list/new',
    update: '/manga_list/update',
};

export const paths = {
    home: '/',
    ranking: '/ranking',
    mangaList: mangaListPaths.browse,
    favorite: '/favorite',
};

export const navLinks = [
    {
        title: 'Home',
        link: paths.home,
        icon: <FaHome />,
    },
    {
        title: 'Ranking',
        link: paths.ranking,
        icon: <FaChessKing />,
    },
    {
        title: 'Manga List',
        link: paths.mangaList,
        icon: <FaCrown />,
    },
    {
        title: 'Favorite',
        link: paths.favorite,
        icon: <FaHeart />,
    },
];

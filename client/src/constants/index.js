import { FaChessKing, FaCrown, FaHeart, FaHome } from 'react-icons/fa';

export const MANGADEX_API_URL = 'https://api.mangadex.org';
export const MANGADEX_COVERS_URL = 'https://uploads.mangadex.org/covers';

export const path = {
    home: '/',
    ranking: '/ranking',
    manga_list: '/manga_list/browse',
    favorite: '/favorite',
};

export const navLinks = [
    {
        title: 'Home',
        link: path.home,
        icon: <FaHome />,
    },
    {
        title: 'Ranking',
        link: path.ranking,
        icon: <FaChessKing />,
    },
    {
        title: 'Manga List',
        link: path.manga_list,
        icon: <FaCrown />,
    },
    {
        title: 'Favorite',
        link: path.favorite,
        icon: <FaHeart />,
    },
];

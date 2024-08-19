import { FaChessKing, FaCrown, FaHeart, FaHome } from 'react-icons/fa';

export const path = {
    update: '/update',
    completed: '/completed',
    genres: '/genres',
    favorite: '/favorite',
};

export const navLinks = [
    {
        title: 'Update',
        link: path.update,
        icon: <FaHome />,
    },
    {
        title: 'Completed',
        link: path.completed,
        icon: <FaChessKing />,
    },
    {
        title: 'Genres',
        link: path.genres,
        icon: <FaCrown />,
    },
    {
        title: 'Favorite',
        link: path.favorite,
        icon: <FaHeart />,
    },
];

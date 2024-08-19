import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Manga',
    description:
        'Explore a vast collection of manga, from classic series to the latest releases. Dive into your favorite genres, discover new stories, and enjoy a seamless reading experience.',
};

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body className={inter.className}>{children}</body>
        </html>
    );
};

export default RootLayout;

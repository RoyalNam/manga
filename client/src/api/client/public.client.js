import axios from 'axios';
import { MANGADEX_API_URL } from '@/constants';

const publicClient = axios.create({
    baseURL: MANGADEX_API_URL,
});

publicClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
        },
    };
});

publicClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        throw err;
    },
);

export default publicClient;

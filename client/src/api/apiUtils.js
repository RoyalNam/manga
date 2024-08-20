import publicClient from './client/public.client';

export const fetchData = async (endpointFunction, ...params) => {
    try {
        const response = await publicClient.get(endpointFunction(...params));
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching data from ${endpointFunction(...params)}:`, error);
        return null;
    }
};

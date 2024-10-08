import publicClient from './client/public.client';

export const fetchData = async (endpointFunction, returnNestedData = true, ...params) => {
    try {
        const response = await publicClient.get(endpointFunction(...params));
        return returnNestedData ? response.data.data : response.data;
    } catch (error) {
        console.error(`Error fetching data from ${endpointFunction(...params)}:`, error);
        return null;
    }
};

export const fetcher = (url) => fetch(url).then((res) => res.json());

 export const swrOptions = {
        revalidateOnMount: true,
        revalidateOnFocus: true,
        errorRetryCount: 5,
        loadingTimeout: 2000,
        refreshInterval: 5000,
    };
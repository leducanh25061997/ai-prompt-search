import { useEffect, useState } from "react";

// TODO: implement retry  
const useFetchRetry = (url: string, retry: number, options: any) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setResponse(json);
                setIsLoading(false)
            } catch (error: any) {
                setError(error);
            }
        };
        fetchData();
    }, []);
    return { response, error, isLoading };
};

export default useFetchRetry; 
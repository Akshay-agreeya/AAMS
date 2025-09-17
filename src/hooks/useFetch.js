import React, { useEffect, useState } from 'react'
import { getData } from '../utils/CommonApi';

const useFetch = (url) => {

    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (url)
            fetchData();
    }, [url]);

    const fetchData = async () => {

        try {
            setLoading(true);
            const resp = await getData(url);
            setResponse(resp);
        } catch (error) {
            console.log(error);
            setError(error);
        }
        finally {
            setLoading(false);
        }
    };

    // Expose refetch so parent can reload data
    return { response, loading, error, setResponse, refetch: fetchData };
}

export default useFetch;
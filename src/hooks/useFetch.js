import React, { useEffect, useState } from 'react'
import { getData } from '../utils/CommonApi';

const useFetch = (url) => {

    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
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

    return { response, loading, error,setResponse };
}

export default useFetch;
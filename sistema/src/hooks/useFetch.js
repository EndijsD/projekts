import { useState, useEffect } from 'react';

const useFetch = (url, deletedRow) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(url, { signal: abortController.signal })
      .then((response) => {
        if (!response.ok) {
          throw Error('nevarēja dabūt datus priekš tā resursa');
        }
        return response.json();
      })
      .then((data) => {
        // Lai imitētu ilgu datu iegūšanu no datubāzes
        // setTimeout(() => {
        setData(data);
        setIsPending(false);
        setError(null);
        // }, 1000);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortController.abort();
  }, [url, deletedRow]);

  return { data, isPending, error };
};

export default useFetch;

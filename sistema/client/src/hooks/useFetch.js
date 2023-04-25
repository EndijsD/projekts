import { useState, useEffect } from 'react';

const useFetch = (url, modifiedRow) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setIsPending(true);
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
        setInitialLoad(false);
        setError(null);
        // }, 2000);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setIsPending(false);
          setInitialLoad(false);
          setError(err.message);
        }
      });

    return () => abortController.abort();
  }, [url, modifiedRow]);

  return { data, isPending, error, setData, initialLoad };
};

export default useFetch;

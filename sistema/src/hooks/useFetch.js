import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(url, { signal: abortController.signal })
      .then((response) => {
        if (!response.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortController.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;

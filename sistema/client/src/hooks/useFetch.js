// Importē nepieciešamās funkcijas
import { useState, useEffect } from 'react';

// Izveido React paštaisītā āķa funkciju (angļu val. Custom hook), kurš pieņem divas vērtības
const useFetch = (url, modifiedRow) => {
  // Tiek definēti mainīgie
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  // Tiek pielietots React āķis, padodot tam attiecīgo funkciju,
  // kurš veiks darbības, balstoties uz divu atkarīgo mainīgo izmaiņām
  useEffect(() => {
    setIsPending(true);
    // Tiek definēts kontrolieris, priekš pieprasījumu atcelšanas
    const abortController = new AbortController();

    // Veic pieprasījumu uz mainīgā "url" vērtību
    // un signāla pārvaldību uzstāda uz iepriekš nodefinēto kontrolieri
    fetch(url, { signal: abortController.signal })
      .then((response) => {
        // Kad ir saņemta atbilde, tad ja ir problēma tiek izvadīta kļūda,
        // savādāk atgriež iegūto informāciju JSON formā
        if (!response.ok) {
          throw Error('nevarēja dabūt datus priekš tā resursa');
        }
        return response.json();
      })
      .then((data) => {
        // Lai imitētu ilgu datu iegūšanu no datubāzes
        // setTimeout(() => {
        // Saņemot datus nomaina attiecīgo mainīgo vērtības
        setData(data);
        setIsPending(false);
        setInitialLoad(false);
        setError(null);
        // }, 2000);
      })
      .catch((err) => {
        // Problēmas gadījumā, kura nav "AbortError" problēma, nomaina attiecīgo mainīgo vērtības
        if (err.name !== 'AbortError') {
          setIsPending(false);
          setInitialLoad(false);
          setError(err.message);
        }
      });

    // Atgriež funkciju, kura atceļ pieprasījumu
    return () => abortController.abort();
  }, [url, modifiedRow]);

  // Atgriež mainīgos
  return { data, isPending, error, setData, initialLoad };
};

// Padara funkciju pieejamu importēt citos sistēmas failos
export default useFetch;

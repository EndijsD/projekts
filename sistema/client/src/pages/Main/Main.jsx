import * as S from './style';
import { useEffect, useState } from 'react';
import GridLayout from '../../components/GridLayout';
import MagicCard from '../../components/MagicCard';
import useFetch from '../../hooks/useFetch';
import url from '../../url';

const Main = () => {
  const [popularData, setPopularData] = useState(null);
  const [popularIsPending, setPopularIsPending] = useState(true);
  const [popularError, setPopularError] = useState(null);

  const { data: popularDataIDs, error: popularIDError } = useFetch(
    url + 'special/popular/8'
  );

  const {
    data: newestData,
    isPending: newestIsPending,
    error: newestError,
  } = useFetch(url + 'special/newest/8');

  useEffect(() => {
    if (popularIDError) {
      setPopularError(popularIDError);
      setPopularIsPending(false);
    }
  }, [popularIDError]);

  useEffect(() => {
    if (popularDataIDs && !popularData) {
      for (const obj of popularDataIDs) {
        fetch(url + `preces/${obj.id_preces}`).then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            setPopularData((prev) =>
              !prev ? [].concat(data) : prev.concat(data)
            );
          }
        });
      }
      setPopularIsPending(false);
    }
  }, [popularDataIDs]);

  return (
    <S.StyledContainer>
      <MagicCard />

      <GridLayout
        title="Populārākās preces"
        data={popularData}
        error={popularError}
        isPending={popularIsPending}
      />

      <GridLayout
        title="Jaunākās preces"
        data={newestData}
        error={newestError}
        isPending={newestIsPending}
      />
    </S.StyledContainer>
  );
};

export default Main;

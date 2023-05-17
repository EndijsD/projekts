import { useEffect, useState } from 'react';
import GridLayout from '../../components/GridLayout/GridLayout';
import * as S from './style';
import url from '../../url';

const Category = ({ title }) => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url + 'special/category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title }),
    }).then(async (res) => {
      if (!res.ok) {
        setError(true);
      } else {
        const data = await res.json();
        setData(data);
      }
      setIsPending(false);
    });
  }, []);

  return (
    <S.StyledContainer>
      <GridLayout
        title={title}
        data={data}
        error={error}
        isPending={isPending}
      />
    </S.StyledContainer>
  );
};

export default Category;

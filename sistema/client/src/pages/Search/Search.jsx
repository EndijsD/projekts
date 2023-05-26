import * as S from './style';
import GridLayout from '../../components/GridLayout';
import url from '../../url';
import useFetch from '../../hooks/useFetch';
import useData from '../../hooks/useData';

const Search = () => {
  const { data, isPending, error } = useFetch(url + 'preces');
  const { search } = useData();

  return (
    <S.StyledContainer>
      <GridLayout
        title={`Meklēšanas rezultāti frāzei "${search.trim()}" (${
          data &&
          data.filter((item) =>
            item.nosaukums.toLowerCase().includes(search.trim().toLowerCase())
          ).length
        })`}
        data={
          data &&
          data.filter((item) =>
            item.nosaukums.toLowerCase().includes(search.trim().toLowerCase())
          )
        }
        error={error}
        isPending={isPending}
      />
    </S.StyledContainer>
  );
};

export default Search;

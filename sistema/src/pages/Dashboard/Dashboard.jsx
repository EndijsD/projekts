import { Typography, useTheme } from '@mui/material';
import Card from '../../components/Card';
import useFetch from '../../hooks/useFetch';
import url from '../../url';
import * as S from './style';
import { HashLoader } from 'react-spinners';

const Dashboard = () => {
  const theme = useTheme();
  const { data, isPending, error } = useFetch(url + 'special/dashboard');

  return (
    <S.CenterBox>
      {!isPending && !error && (
        <S.container
          container
          rowSpacing={{ xs: 1, sm: 2, md: 3 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 10 }}
        >
          {[
            {
              title: Number(data.lietotaji)
                ? 'Kopējais lietotāju  skaits'
                : data.lietotaji,
              count: Number(data.lietotaji) ? data.lietotaji : false,
            },
            {
              title: Number(data.pasutijumi)
                ? 'Kopējais pasūtījumu skaits'
                : data.pasutijumi,
              count: Number(data.pasutijumi) ? data.pasutijumi : false,
            },
            {
              title: Number(data.preces)
                ? 'Kopējais preču skaits'
                : data.preces,
              count: Number(data.preces) ? data.preces : false,
            },
            {
              title: Number(data.atsauksmes)
                ? 'Kopējais atsauksmju skaits'
                : data.atsauksmes,
              count: Number(data.atsauksmes) ? data.atsauksmes : false,
            },
          ].map((item) => {
            return (
              <Card key={item.title} title={item.title} count={item.count} />
            );
          })}
        </S.container>
      )}
      {error && <Typography>{error}</Typography>}
      <HashLoader color={theme.palette.primary.main} loading={isPending} />
    </S.CenterBox>
  );
};

export default Dashboard;

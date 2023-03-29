import Card from '../../components/Card';
import * as S from './style';

const Dashboard = () => {
  return (
    <S.container
      container
      rowSpacing={{ xs: 1, sm: 2, md: 3 }}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 10 }}
    >
      {[
        { title: 'Kopējais lietotāju  skaits', count: 0 },
        { title: 'Kopējais pasūtījumu skaits', count: 0 },
        { title: 'Kopējais preču skaits', count: 0 },
        { title: 'Kopējais atsauksmju skaits', count: 0 },
      ].map((item) => {
        return <Card key={item.title} title={item.title} count={item.count} />;
      })}
    </S.container>
  );
};

export default Dashboard;

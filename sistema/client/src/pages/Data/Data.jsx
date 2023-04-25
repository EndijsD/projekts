import DataAccordion from '../../components/DataAccordion';
import * as S from './style';

const Data = ({ about }) => {
  return (
    <S.paper>
      {about.map((item) => {
        return <DataAccordion key={item.title} about={item} />;
      })}
    </S.paper>
  );
};

export default Data;

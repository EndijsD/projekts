import DataAccordion from '../../components/DataAccordion';
import * as S from './style';

const Data = ({ about }) => {
  return (
    <S.box>
      {about.map((item) => {
        return <DataAccordion key={item.title} about={item} />;
      })}
    </S.box>
  );
};

export default Data;

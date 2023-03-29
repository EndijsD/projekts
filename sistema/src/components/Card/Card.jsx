import { Grid } from '@mui/material';
import * as S from './style';

const Card = ({ title, count }) => {
  return (
    <Grid item xs={4}>
      <S.Item>
        <S.number>{count}</S.number>
        <S.title>{title}</S.title>
      </S.Item>
    </Grid>
  );
};

export default Card;

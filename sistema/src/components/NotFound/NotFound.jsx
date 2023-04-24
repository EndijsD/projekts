import { Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

const NotFound = ({ desc, displayButton, buttonText, buttonLink }) => {
  const nav = useNavigate();

  return (
    <S.MUIPaper>
      <S.Title variant="h5">Atvainojiet,</S.Title>
      <Typography>{desc}</Typography>
      {displayButton && (
        <S.MUIButton variant="contained" onClick={() => nav(buttonLink)}>
          {buttonText}
        </S.MUIButton>
      )}
    </S.MUIPaper>
  );
};

export default NotFound;

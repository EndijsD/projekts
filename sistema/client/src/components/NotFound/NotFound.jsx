import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

const NotFound = ({
  title,
  desc,
  displayButton,
  buttonText,
  buttonLink,
  descButtonText,
  desc2,
  descButtonLink,
}) => {
  const nav = useNavigate();

  return (
    <S.StyledContainer>
      <S.MUIPaper>
        <Box>
          {title && <S.Title variant="h5">{title}</S.Title>}
          <Typography variant="subtitle1" display="inline">
            {desc}{' '}
          </Typography>
          {descButtonText && (
            <Button
              sx={{
                textTransform: 'none',
              }}
              onClick={() => nav(descButtonLink)}
            >
              {descButtonText}
            </Button>
          )}
          {desc2 && (
            <Typography variant="subtitle1" display="inline">
              {' '}
              {desc2}
            </Typography>
          )}
        </Box>
        {displayButton && (
          <S.MUIButton variant="outlined" onClick={() => nav(buttonLink)}>
            {buttonText}
          </S.MUIButton>
        )}
      </S.MUIPaper>
    </S.StyledContainer>
  );
};

export default NotFound;

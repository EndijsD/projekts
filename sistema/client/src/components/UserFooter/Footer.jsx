import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Store,
} from '@mui/icons-material';
import * as S from './style';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const nav = useNavigate();
  const theme = useTheme();

  return (
    <S.StyledPaper>
      <S.MUIContainer maxWidth="xl" sx={{ pt: '1rem', pb: '.5rem' }}>
        <Button
          sx={{
            color:
              theme.palette.mode == 'light' ? theme.palette.common.white : '',
            p: 0,
            '&:hover': { backgroundColor: 'transparent' },
          }}
          disableRipple
          onClick={() => nav('/')}
        >
          <Store sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
            }}
          >
            VEIKALS
          </Typography>
        </Button>
        <Button
          sx={{
            color: theme.palette.common.white,
          }}
          onClick={() => nav('/about-us')}
        >
          Par Mums
        </Button>
      </S.MUIContainer>

      <Container maxWidth="xl">
        <Divider
          color={
            theme.palette.mode == 'light' ? theme.palette.common.white : ''
          }
        />
      </Container>

      <S.MUIContainer maxWidth="xl" sx={{ pt: '.5rem', pb: '1rem' }}>
        <Typography
          color={
            theme.palette.mode == 'light' ? theme.palette.common.white : ''
          }
        >
          &copy; 2023 "VEIKALS". Visas tiesības aizsargātas.
        </Typography>
        <Box>
          <S.StyledIconButton target="_blank" href="https://www.facebook.com">
            <Facebook />
          </S.StyledIconButton>
          <S.StyledIconButton target="_blank" href="https://twitter.com">
            <Twitter />
          </S.StyledIconButton>
          <S.StyledIconButton target="_blank" href="https://www.instagram.com">
            <Instagram />
          </S.StyledIconButton>
          <S.StyledIconButton target="_blank" href="https://www.instagram.com">
            <YouTube />
          </S.StyledIconButton>
        </Box>
      </S.MUIContainer>
    </S.StyledPaper>
  );
};

export default Footer;

import { styled } from '@mui/system';
import { Typography, keyframes } from '@mui/material';

const backgroundPan = keyframes`
    from {
      background-position: 0% center;
    }
    to {
      background-position: -200% center;
    }
  `;

export const StyledContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  animation: `${backgroundPan} 10s linear infinite`,
  background:
    theme.palette.mode == 'light'
      ? `linear-gradient(to right, ${theme.palette.primary.dark}, rgb(98, 0, 234), ${theme.palette.primary.dark})`
      : `linear-gradient(to right, ${theme.palette.grey[900]}, ${theme.palette.grey[800]}, ${theme.palette.grey[900]})`,
  backgroundSize: '200%',
  overflow: 'hidden',
  display: 'flex',
  flex: 1,
}));

export const Tiles = styled('div')({
  width: '100%',
  zIndex: 2,

  display: 'grid',
  gridTemplateColumns: 'repeat(var(--columns), 1fr)',
  gridTemplateRows: 'repeat(var(--rows), 1fr)',
});

export const Title = styled(Typography)(({ theme, toggled }) => ({
  opacity: toggled ? 0 : 1,
  zIndex: 3,
  color: 'white',
  transition: 'opacity 1200ms ease',
  letterSpacing: 10,
  fontWeight: 'bold',
  marginBottom: '1rem',
  fontFamily: 'Rubik, sans-serif',

  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

export const Text = styled(Typography)(({ theme, toggled }) => ({
  opacity: toggled ? 0 : 1,
  zIndex: 3,
  color: 'white',
  transition: 'opacity 1200ms ease',
  fontSize: '1.5rem',
  maxWidth: 800,
  fontFamily: 'Rubik, sans-serif',
  padding: '2rem',

  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

export const Img = styled('img')(({ theme, toggled }) => ({
  opacity: toggled ? 0.8 : 0,
  color: 'rgba(255, 255, 255, 0.15)',
  transition: 'opacity 1200ms ease',
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  zIndex: 1,
  padding: '2rem',

  [theme.breakpoints.down('sm')]: {
    padding: 'initial',
  },
}));

export const StyledBox = styled('div')(({ theme }) => ({
  position: 'absolute',
  height: '100%',
  width: '100%',
  pointerEvents: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
}));

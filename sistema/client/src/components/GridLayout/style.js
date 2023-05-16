import { styled, alpha } from '@mui/system';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from '@mui/material';
import { PropagateLoader } from 'react-spinners';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',

  [theme.breakpoints.down(500)]: {
    padding: 5,
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  background:
    theme.palette.mode == 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
  padding: '2rem',
  borderRadius: theme.shape.borderRadius,
  letterSpacing: 4,
  textShadow:
    theme.palette.mode == 'light'
      ? `2px 2px 5px ${theme.palette.grey[500]}`
      : `3px 3px 5px black`,
  fontSize: '2em',
  fontWeight: 800,
  textAlign: 'center',

  [theme.breakpoints.down(700)]: {
    fontSize: '1.6rem',
  },

  [theme.breakpoints.down(400)]: {
    padding: '1rem',
  },
}));

export const BuyButton = styled(Button)({
  display: 'none',
});

export const StyledCard = styled(Card)(({ theme }) => ({
  background:
    theme.palette.mode == 'light'
      ? 'rgba(0, 0, 0, 0.1)'
      : 'rgba(255, 255, 255, 0.1)',
  position: 'relative',
  cursor: 'pointer',
  padding: 1,

  '&:hover .buyButton': {
    display: 'inline-flex',
  },

  '&:hover .divider': {
    display: 'none',
  },

  '&:after': {
    background: `radial-gradient(250px circle at var(--mouse-x) var(--mouse-y), ${
      theme.palette.mode == 'light' ? theme.palette.primary.main : 'white'
    }, transparent 40%)`,
    borderRadius: 'inherit',
    content: '""',
    left: 0,
    top: 0,
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    width: '100%',
    opacity: 0,
    transition: 'opacity 500ms',
  },

  '&:hover:after': {
    opacity: 1,
  },
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 'inherit',
  zIndex: 2,
  position: 'relative',

  '&:last-child': { paddingBottom: 16 },

  '&:before': {
    background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), ${
      theme.palette.mode == 'light'
        ? alpha(theme.palette.primary.main, 0.1)
        : 'rgba(255, 255, 255, 0.2)'
    }, transparent 40%)`,
    borderRadius: 'inherit',
    content: '""',
    left: 0,
    top: 0,
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 0,
    transition: 'opacity 500ms',
  },

  '&:hover:before': {
    opacity: 1,
  },
}));

export const StyledPropagateLoader = styled(PropagateLoader)({
  justifyContent: 'center',
  padding: '2rem',
});

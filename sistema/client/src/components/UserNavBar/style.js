import { styled, alpha } from '@mui/system';
import {
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),

  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  [theme.breakpoints.down(700)]: {
    order: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode == 'light' && 'white',
  padding: 0,

  '&:hover': { backgroundColor: 'transparent' },

  [theme.breakpoints.down(700)]: {
    order: 1,
  },
}));

export const IconBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down(700)]: {
    order: 2,
  },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: '0 12px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    color: '#fff',
    width: '50vw',
    '&:focus': {
      width: '55vw',
    },

    [theme.breakpoints.down('md')]: {
      width: '40vw',
      '&:focus': {
        width: '45vw',
      },
    },
    [theme.breakpoints.down(700)]: {
      width: '75vw',
      '&:focus': {
        width: '80vw',
      },
    },
    [theme.breakpoints.down(600)]: {
      width: '70vw',
      '&:focus': {
        width: '75vw',
      },
    },
    [theme.breakpoints.down(400)]: {
      width: '60vw',
      '&:focus': {
        width: '65vw',
      },
    },
  },
}));

export const StyledToolbar = styled(Toolbar)(({ theme, location }) => ({
  justifyContent: location == '/checkout' ? 'center' : 'space-between',
  flexWrap: 'wrap',

  [theme.breakpoints.down(700)]: {
    gap: 13,
  },
  [theme.breakpoints.down(350)]: {
    flexDirection: 'column',
    gap: 5,
  },
}));

export const StyledContainer = styled(Container)(({ theme, location }) => ({
  [theme.breakpoints.down(700)]: {
    padding: location != '/checkout' && '1rem',
  },
}));

export const WhiteIconButton = styled(IconButton)`
  color: inherit;
`;

export const StyledImg = styled('img')({
  width: 70,
});

export const StyledMenuItem = styled(MenuItem)({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1rem',
});

export const StyledMenuBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  maxWidth: 200,
});

export const ItemTitle = styled(Typography)({
  whiteSpace: 'pre-line',
});

export const ItemPriceCount = styled(Typography)({
  fontWeight: 'bold',
  pointerEvents: 'none',
});

export const StyledItemButton = styled(Button)(({ theme }) => ({
  color:
    theme.palette.mode == 'light'
      ? theme.palette.common.black
      : theme.palette.common.white,
  textTransform: 'lowercase',
  justifyContent: 'start',

  '&:hover': {
    background: 'rgb(200, 10, 10)',
    color: theme.palette.common.white,
  },
}));

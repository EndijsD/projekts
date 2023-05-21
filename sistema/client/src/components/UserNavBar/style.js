import { styled, alpha } from '@mui/system';
import {
  Box,
  Button,
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
      width: '80vw',
      '&:focus': {
        width: '85vw',
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

export const DesktopToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',

  [theme.breakpoints.down(700)]: {
    display: 'none',
  },
}));

export const MobileToolbar = styled(Toolbar)(({ theme }) => ({
  flexDirection: 'column',
  padding: '1rem',

  [theme.breakpoints.up(700)]: {
    display: 'none',
  },
  [theme.breakpoints.down(350)]: {
    gap: 13,
  },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',

  [theme.breakpoints.down(350)]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
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

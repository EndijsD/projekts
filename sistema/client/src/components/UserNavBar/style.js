import { styled, alpha } from '@mui/system';
import { IconButton, InputBase, Toolbar } from '@mui/material';

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

    [theme.breakpoints.down(700)]: {
      width: '80vw',
      '&:focus': {
        width: '85vw',
      },
    },
    [theme.breakpoints.down(400)]: {
      width: '70vw',
      '&:focus': {
        width: '75vw',
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
  paddingBottom: '1rem',

  [theme.breakpoints.up(700)]: {
    display: 'none',
  },
}));

export const StyledBox = styled(Toolbar)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const WhiteIconButton = styled(IconButton)`
  color: inherit;
`;

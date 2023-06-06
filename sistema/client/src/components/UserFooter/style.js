import { styled } from '@mui/system';
import { Button, Container, IconButton, Paper } from '@mui/material';

export const MUIContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'center',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
    gap: '.5rem',
  },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode == 'light' && theme.palette.primary.main,
  borderRadius: 0,
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.mode == 'light' && theme.palette.common.white,
}));

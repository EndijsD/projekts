import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const paper = styled(Box)(({ theme }) => ({
  margin: '3rem',

  [theme.breakpoints.down('sm')]: {
    margin: '1rem 0',
  },
}));

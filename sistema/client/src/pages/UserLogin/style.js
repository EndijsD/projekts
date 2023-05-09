import { styled } from '@mui/system';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

export const box = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
});

export const LoginBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  boxShadow:
    theme.palette.mode == 'light'
      ? `0px 0px 10px ${theme.palette.grey[500]}`
      : `0px 0px 10px black`,
  borderRadius: 20,

  [theme.breakpoints.down('sm')]: {
    boxShadow: 'none',
  },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  borderTopLeftRadius: 20,
  borderBottomLeftRadius: 20,
  boxShadow: 'none',

  [theme.breakpoints.down('md')]: {
    borderRadius: 20,
  },

  [theme.breakpoints.down('sm')]: {
    background: 'none',
  },
}));

export const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '4rem 3rem',
  width: 400,

  [theme.breakpoints.down('sm')]: {
    width: 'auto',
  },
}));

export const h1 = styled(Typography)`
  font-size: 2em;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
`;

export const textField = styled(TextField)`
  margin-bottom: 2rem;
`;

export const button = styled(Button)`
  border-radius: 50px;
  font-weight: 700;
`;

export const StyledImg = styled('img')(({ theme }) => ({
  objectFit: 'cover',
  width: 400,
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

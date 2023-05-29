import { styled, alpha } from '@mui/system';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

export const MainBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
});

export const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: '2rem 0',
  borderRadius: 20,
  width: 800,
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',

  [theme.breakpoints.down('md')]: {
    width: 700,
  },

  [theme.breakpoints.down(800)]: {
    width: 600,
  },

  [theme.breakpoints.down(700)]: {
    width: 500,
  },

  [theme.breakpoints.down('sm')]: {
    background: 'none',
    boxShadow: 'none',
  },

  [theme.breakpoints.down(500)]: {
    padding: '1rem',
  },

  [theme.breakpoints.down(400)]: {
    padding: 0,
  },
}));

export const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  background:
    theme.palette.mode == 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
  padding: 20,
  borderRadius: 20,

  [theme.breakpoints.down('sm')]: {
    background: 'none',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '2em',
  fontWeight: 800,
  textAlign: 'center',
  color: theme.palette.mode == 'light' && theme.palette.grey[800],
}));

export const SubTitle = styled(Typography)(({ theme }) => ({
  background: alpha(theme.palette.primary.main, 0.1),
  padding: '1rem 2rem',
  borderRadius: 5,
  color: theme.palette.mode == 'light' && theme.palette.grey[700],
}));

export const InputField = styled(TextField)(({ theme }) => ({
  width: '80%',
  alignSelf: 'center',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const SubmitButton = styled(Button)({
  borderRadius: 50,
  fontWeight: 700,
  width: 150,
  alignSelf: 'center',
});

export const Info = styled(Typography)({
  display: 'inline',
  verticalAlign: 'super',
  fontSize: 12,
});

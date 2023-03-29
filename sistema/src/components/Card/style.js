import { styled } from '@mui/system';
import { Paper, Typography } from '@mui/material';

export const Item = styled(Paper)(({ theme }) => ({
  boxShadow: theme.palette.mode === 'light' ? '3px 3px 10px #ddd' : '',
  padding: theme.spacing(8),
  textAlign: 'center',
}));

export const number = styled(Typography)(({ theme }) => ({
  borderRadius: '50%',
  borderStyle: 'solid',
  borderWidth: '4px',
  borderColor: theme.palette.primary.main,
  padding: theme.spacing(0.5),
  width: 60,
  height: 60,
  fontSize: 30,
  marginLeft: 'auto',
  marginRight: 'auto',
}));

export const title = styled(Typography)`
  margin-top: 2rem;
  font-weight: bold;
`;

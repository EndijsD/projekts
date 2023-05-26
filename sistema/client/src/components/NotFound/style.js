import { styled } from '@mui/system';
import { Button, Container, Paper, Typography } from '@mui/material';

export const StyledContainer = styled(Container)({
  flex: 1,
  margin: '2rem auto',
});

export const MUIPaper = styled(Paper)`
  padding: 2rem;
  text-align: center;
`;

export const Title = styled(Typography)`
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const MUIButton = styled(Button)`
  margin-top: 1rem;
`;

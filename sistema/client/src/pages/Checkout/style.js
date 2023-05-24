import { styled } from '@mui/system';
import { Container, Paper } from '@mui/material';

export const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const StyledPaper = styled(Paper)(({ theme }) => ({
  minWidth: 652,

  [theme.breakpoints.down(700)]: {
    minWidth: 'initial',
    width: '100%',
  },
}));

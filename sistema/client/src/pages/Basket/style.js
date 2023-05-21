import { styled } from '@mui/system';
import {
  Box,
  Container,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

export const StyledContainer = styled(Container)`
  flex: 1;
  margin: 2rem auto;
`;

export const TableTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  textAlign: 'center',
});

export const StyledCountBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

export const StyledTextField = styled(TextField)`
  width: 80px;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;

export const StyledTableRow = styled(TableRow)({
  '&:last-child td': {
    border: 0,
  },
});

export const StyledImg = styled('img')({
  width: 100,
});

export const StyledSup = styled('sup')({
  fontWeight: 'normal',
  fontSize: 12,
});

export const StyledTableCell = styled(TableCell)({
  textAlign: 'center',
});

export const HighlightedTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,

  '&:last-child td': {
    border: 0,
  },
}));

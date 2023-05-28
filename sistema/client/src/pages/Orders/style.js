import { styled } from '@mui/system';
import {
  AccordionSummary,
  Container,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

export const StyledContainer = styled(Container)({
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  margin: '2rem auto',
});

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  background: theme.palette.mode == 'light' && 'rgba(0, 0, 0, 0.02)',
}));

export const StyledTableCell = styled(TableCell)({
  textAlign: 'center',
});

export const HighlightedTableRow = styled(TableRow)({
  '&:last-child td': {
    border: 0,
  },
});

export const TableTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  textAlign: 'center',
});

export const StyledImg = styled('img')({
  width: 100,
});

export const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  '&:hover': {
    background: theme.palette.action.selected,
  },
}));

export const StyledSup = styled('sup')({
  fontWeight: 'normal',
  fontSize: 12,
});

export const Status = styled(Typography)(({ status }) => ({
  background:
    status == 'Atcelts'
      ? 'Tomato'
      : status == 'Izpildīts'
      ? 'MediumSeaGreen'
      : 'Orange',
  borderRadius: 50,
  padding: '.5rem 0',
  color: 'white',
  fontWeight: 'bold',
}));

export const HoverTableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',

  '&:hover': {
    background: theme.palette.action.hover,
  },
}));

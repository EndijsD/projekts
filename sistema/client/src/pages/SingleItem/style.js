import { styled } from '@mui/system';
import {
  Box,
  Container,
  Paper,
  TableCell,
  TableRow,
  TextField,
  Typography,
  tableCellClasses,
  keyframes,
  Button,
} from '@mui/material';

export const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  flex: 1;
  margin: 2rem auto;
`;

export const StyledImg = styled('img')(({ theme }) => ({
  height: '100%',
  objectPosition: 'center',
  borderRadius: theme.shape.borderRadius,
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: theme.palette.mode == 'light' && theme.palette.grey[800],
  borderRight: `1px solid ${
    theme.palette.mode == 'light'
      ? theme.palette.grey[400]
      : theme.palette.grey[600]
  }`,
}));

export const Price = styled(Typography)(({ theme }) => ({
  textAlign: 'end',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  borderLeft: `1px solid ${
    theme.palette.mode == 'light'
      ? theme.palette.grey[400]
      : theme.palette.grey[600]
  }`,
  borderTop: `1px solid ${
    theme.palette.mode == 'light'
      ? theme.palette.grey[400]
      : theme.palette.grey[600]
  }`,
}));

export const StyledCountBox = styled(Box)({
  display: 'flex',
});

export const StyledBuyBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',

  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
    gap: '1rem',
    flexDirection: 'column',
  },
}));

export const BuyButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  minWidth: '10rem',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

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

export const StyledPaper = styled(Paper)({
  padding: '2rem',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:
      theme.palette.mode == 'light'
        ? theme.palette.grey[400]
        : theme.palette.grey[700],
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const backgroundPan = keyframes`
    from {
      background-position: 0% center;
    }
    to {
      background-position: -200% center;
    }
  `;

export const GradientTextTableRow = styled(TableRow)(({ pieejamiba }) => ({
  animation: `${backgroundPan} 3s linear infinite`,
  background:
    pieejamiba >= 5
      ? `linear-gradient(to right, ForestGreen, GreenYellow, Lime, ForestGreen)`
      : `linear-gradient(to right, FireBrick, Tomato, Red, FireBrick)`,
  backgroundSize: '200%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  whiteSpace: 'nowrap',

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

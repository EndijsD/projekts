import { styled } from '@mui/system';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

export const MainBox = styled(Box)({
  flex: 1,
  position: 'relative',
  overflow: 'hidden',
});

export const CardTrack = styled(Box)({
  display: 'flex',
  gap: '4vmin',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(0%, -50%)',
  userSelect: 'none',
});

export const StyledCard = styled(Card)({
  width: '40vmin',
  height: '56vmin',
  backgroundSize: 'cover',
  backgroundPosition: '100% center',

  '&:hover .title': {
    display: 'none',
  },
  '&:hover .button': {
    display: 'block',
  },
});

export const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
});

export const Title = styled(Typography)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  fontSize: '1.5rem',
  background: 'rgba(0, 0, 0, 0.3)',
  padding: '1rem',
  color: 'white',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  display: 'none',
  padding: '1rem',
  fontSize: '1.2rem',
  color: 'white',
  background: 'rgba(0, 0, 0, 0.3)',

  '&:hover': {
    background: 'rgba(0, 0, 0, 0.5)',
  },
}));

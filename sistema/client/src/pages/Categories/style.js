import { styled } from '@mui/system';
import { Box, Button, Card, CardContent } from '@mui/material';

export const MainBox = styled(Box)({
  flex: 1,
  position: 'relative',
  overflow: 'hidden',
});

export const CardTrack = styled(Box)({
  display: 'flex',
  gap: '2.3rem',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(0%, -50%)',
  userSelect: 'none',
});

export const StyledCard = styled(Card)(({ theme }) => ({
  width: '22.7rem',
  height: '31.8rem',
  backgroundSize: 'cover',
  backgroundPosition: '100% center',

  [theme.breakpoints.down(400)]: {
    width: '17.7rem',
    height: '26.8rem',
  },
}));

export const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
});

export const StyledButton = styled(Button)({
  padding: '1rem',
  fontSize: '1.2rem',
  color: 'white',
  background: 'rgba(0, 0, 0, 0.3)',

  '&:hover': {
    background: 'rgba(0, 0, 0, 0.5)',
  },
});

import { styled, alpha } from '@mui/system';
import { Box, Button, Typography, keyframes } from '@mui/material';
import { Star } from '@mui/icons-material';

export const CategoryButton = styled(Button)(({ theme }) => ({
  background:
    theme.palette.mode == 'light'
      ? 'url("/User/Common/category_button_light.webp")'
      : 'url("/User/Common/category_button_dark.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: 0,
  '&:hover': {
    backgroundColor: 'white',
  },
}));

export const Overlay = styled(Box)(({ theme }) => ({
  padding: '4rem',
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('background-color'),

  backgroundColor: alpha(theme.palette.common.black, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.5),
  },

  [theme.breakpoints.down(700)]: {
    padding: '2rem',
  },
}));

export const Magic = styled('span')({
  display: 'inline-block',
  position: 'relative',
});

const scale = keyframes`
    from, to {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
  `;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(180deg);
}
`;

export const MagicStarWrapper = styled('div')({
  animation: `${scale} 700ms ease forwards`,
  position: 'absolute',
  display: 'block',
  top: 'var(--star-top)',
  left: 'var(--star-left)',
  color: 'Salmon',
});

export const MagicStar = styled(Star)({
  display: 'block',
  opacity: '70%',
  animation: `${rotate} 1000ms linear infinite`,
});

const backgroundPan = keyframes`
    from {
      background-position: 0% center;
    }
    to {
      background-position: -200% center;
    }
  `;

export const MagicText = styled(Typography)(({ theme }) => ({
  animation: `${backgroundPan} 3s linear infinite`,
  background: `linear-gradient(to right, BurlyWood, GoldenRod, Sienna, BurlyWood)`,
  backgroundSize: '200%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  whiteSpace: 'nowrap',

  [theme.breakpoints.down(700)]: {
    fontSize: '1.7rem',
  },
}));

import { styled } from '@mui/system';
import { Typography, keyframes } from '@mui/material';

const backgroundPan = keyframes`
    from {
      background-position: 0% center;
    }
    to {
      background-position: -200% center;
    }
  `;

export const StyledContainer = styled('div')(({ theme }) => ({
  animation: `${backgroundPan} 10s linear infinite`,
  background:
    theme.palette.mode == 'light'
      ? `linear-gradient(to right, ${theme.palette.primary.dark}, rgb(98, 0, 234), ${theme.palette.primary.dark})`
      : `linear-gradient(to right, ${theme.palette.grey[900]}, ${theme.palette.grey[800]}, ${theme.palette.grey[900]})`,
  backgroundSize: '200%',
  overflow: 'hidden',
  display: 'flex',
  flex: 1,
}));

// body.toggled {
//   animation: none;
// }

// body.toggled > #title {
//   opacity: 0;
// }

// body.toggled > #icon {
//   opacity: 1;
// }

// body.toggled > #tiles > .tile:hover {
//   opacity: 0.1 !important;
// }

export const Text = styled(Typography)({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 3,
  color: 'white',
  fontSize: '4rem',
  margin: 0,
  pointerEvents: 'none',
  transition: 'opacity 1200ms ease',
});

export const Tiles = styled('div')({
  width: '100%',
  position: 'relative',
  zIndex: 2,

  display: 'grid',
  gridTemplateColumns: 'repeat(var(--columns), 1fr)',
  gridTemplateRows: 'repeat(var(--rows), 1fr)',
});

// #title {
//   color: white;
//   font-family: "Rubik", sans-serif;
//   font-size: 6vw;
//   margin: 0px;
//   pointer-events: none;
//   transition: opacity 1200ms ease;
//   width: 50vw;
//   z-index: 3;
// }

// #title > .fancy {
//   color: var(--g2);
//   font-family: 'Dancing Script', cursive;
//   font-size: 1.5em;
//   line-height: 0.9em;
// }

// #icon {
//   color: rgba(255, 255, 255, 0.15);
//   font-size: 80vmin;
//   opacity: 0;
//   pointer-events: none;
//   transition: opacity 1200ms ease;
//   z-index: 1;
// }

export const Img = styled('img')({
  color: 'rgba(255, 255, 255, 0.15)',
  pointerEvents: 'none',
  zIndex: 1,
  transition: 'opacity 1200ms ease',
  width: 800,
  objectFit: 'contain',
});

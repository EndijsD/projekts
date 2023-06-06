import { useEffect, useState } from 'react';
import * as S from './style';
import anime from 'animejs/lib/anime.es.js';
import { Typography } from '@mui/material';

const About = () => {
  let columns = 0,
    rows = 0,
    toggled = false;
  const [toggledState, setToggledState] = useState(false);

  const toggle = () => {
    toggled = !toggled;
    setToggledState((prev) => !prev);
  };

  const handleOnClick = (index) => {
    toggle();

    anime({
      targets: '.tile',
      opacity: toggled ? 0 : 1,
      delay: anime.stagger(50, {
        grid: [columns, rows],
        from: index,
      }),
    });
  };

  const createTile = (index) => {
    const tile = document.createElement('div');

    tile.className = 'tile';
    tile.style.opacity = toggled ? 0 : 1;
    tile.onclick = () => handleOnClick(index);

    return tile;
  };

  const createTiles = (wrapper, quantity) => {
    Array.from(Array(quantity)).map((tile, index) => {
      wrapper.appendChild(createTile(index));
    });
  };

  const createGrid = (wrapper) => {
    wrapper.innerHTML = '';

    const size = wrapper.clientWidth > 800 ? 100 : 50;

    columns = Math.floor(wrapper.clientWidth / size);
    rows = Math.floor(wrapper.clientHeight / size);

    wrapper.style.setProperty('--columns', columns);
    wrapper.style.setProperty('--rows', rows);

    createTiles(wrapper, columns * rows);
  };

  useEffect(() => {
    const wrapper = document.getElementById('tiles');

    createGrid(wrapper);
    window.onresize = () => createGrid(wrapper);
  }, []);

  return (
    <S.StyledContainer>
      <S.Tiles id="tiles"></S.Tiles>
      <S.StyledBox sx={{ padding: '1rem' }}>
        <S.Title toggled={toggledState ? 1 : 0} variant="h2">
          Par projektu
        </S.Title>
        <S.Text toggled={toggledState ? 1 : 0}>
          Šo sistēmu veidoja Endijs Dārznieks. Sistēma ir moderns interneta
          veikals, kurš sastāv no mājaslapas un servera puses. Priekš mājaslapas
          tiek izmantots React.js un priekš API servera Node.js.
        </S.Text>
      </S.StyledBox>
      <S.StyledBox>
        <S.Img
          toggled={toggledState ? 1 : 0}
          src="/User/Common/guitar-shop-scaled.jpg"
        />
      </S.StyledBox>
    </S.StyledContainer>
  );
};

export default About;

import { useEffect, useState } from 'react';
import * as S from './style';
import anime from 'animejs/lib/anime.es.js';

let columns = 0,
  rows = 0;
const AboutUs = () => {
  // toggled = false;

  const [toggled, setToggled] = useState(false);

  const toggle = () => {
    // toggled = !toggled;
    setToggled((prev) => !prev);

    document.body.classList.toggle('toggled');
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

    tile.classList.add('tile');
    tile.style.opacity = toggled ? 0 : 1;
    tile.onclick = (e) => handleOnClick(index);

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
      {toggled ? (
        <div class="centered">
          <S.Img src="/User/Common/guitar-shop-scaled.jpg" />
        </div>
      ) : (
        <div class="centered">
          <S.Text id="title">Interneta veikals</S.Text>
        </div>
      )}
    </S.StyledContainer>
  );
};

export default AboutUs;

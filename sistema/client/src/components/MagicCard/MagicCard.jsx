import * as S from './style';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MagicCard = () => {
  const nav = useNavigate();

  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const animate = (star) => {
    star.style.setProperty('--star-left', `${rand(-10, 100)}%`);
    star.style.setProperty('--star-top', `${rand(-40, 80)}%`);

    star.style.animation = 'none';
    star.offsetHeight;
    star.style.animation = '';
  };

  useEffect(() => {
    let index = 0,
      interval = 1000;

    for (const star of document.getElementsByClassName('magic-star-wrapper')) {
      setTimeout(() => {
        animate(star);

        setInterval(() => animate(star), 1000);
      }, index++ * (interval / 3));
    }
  }, []);

  return (
    <S.CategoryButton
      variant="contained"
      fullWidth={true}
      onClick={() => nav('/categories')}
    >
      <S.Overlay>
        <S.Magic>
          <S.MagicText variant="h4">Kategorijas</S.MagicText>
          <S.MagicStarWrapper className="magic-star-wrapper">
            <S.MagicStar />
          </S.MagicStarWrapper>
          <S.MagicStarWrapper className="magic-star-wrapper">
            <S.MagicStar />
          </S.MagicStarWrapper>
          <S.MagicStarWrapper className="magic-star-wrapper">
            <S.MagicStar />
          </S.MagicStarWrapper>
        </S.Magic>
      </S.Overlay>
    </S.CategoryButton>
  );
};

export default MagicCard;

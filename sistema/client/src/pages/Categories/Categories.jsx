import * as S from './style';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const categoryData = [
  {
    title: 'Klasiskās ģitāras',
    link: 'classical',
    image: '/User/Categories/Common/classical.jpg',
  },
  {
    title: 'Akustiskās ģitāras',
    link: 'acoustic',
    image: '/User/Categories/Common/acoustic.jpg',
  },
  {
    title: 'Elektriskās ģitāras',
    link: 'electric',
    image: '/User/Categories/Common/electric.jpg',
  },
  {
    title: 'Basģitāras',
    link: 'bass',
    image: '/User/Categories/Common/bass.jpg',
  },
  {
    title: 'Ukuleles',
    link: 'ukuleles',
    image: '/User/Categories/Common/ukulele.jpg',
  },
];

const Categories = () => {
  const nav = useNavigate();

  const handleOnDown = (e, track) => {
    track.dataset.mouseDownAt = e.clientX;
  };

  const handleOnUp = () => {
    const track = document.getElementById('track');
    track.dataset.mouseDownAt = '0';
    track.dataset.prevPercentage = track.dataset.percentage;
  };

  const handleOnMove = (e, track) => {
    if (track.dataset.mouseDownAt == '0') return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
      maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
      nextPercentageUnconstrained =
        parseFloat(track.dataset.prevPercentage) + percentage,
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate(
      {
        transform: `translate(${nextPercentage}%, -50%)`,
      },
      { duration: 1200, fill: 'forwards' }
    );

    for (const image of track.getElementsByClassName('image')) {
      image.animate(
        {
          backgroundPosition: `${100 + nextPercentage}% center`,
        },
        { duration: 1200, fill: 'forwards' }
      );
    }
  };

  useEffect(() => {
    const main = document.getElementById('main');
    const track = document.getElementById('track');

    main.onmousedown = (e) => handleOnDown(e, track);
    main.ontouchstart = (e) => handleOnDown(e.touches[0], track);
    main.onmouseup = (e) => handleOnUp(e);
    main.ontouchend = (e) => handleOnUp(e.touches[0]);
    main.onmousemove = (e) => handleOnMove(e, track);
    main.ontouchmove = (e) => handleOnMove(e.touches[0], track);
  }, []);

  return (
    <S.MainBox id="main">
      <S.CardTrack id="track" data-mouse-down-at="0" data-prev-percentage="0">
        {categoryData.map((obj) => (
          <S.StyledCard
            key={obj.link}
            sx={{ backgroundImage: `url(${obj.image})` }}
            className="image"
          >
            <S.StyledCardContent>
              <S.Title className="title">{obj.title}</S.Title>
              <S.StyledButton
                variant="contained"
                className="button"
                onClick={() => nav('/' + obj.link)}
              >
                Atvērt
              </S.StyledButton>
            </S.StyledCardContent>
          </S.StyledCard>
        ))}
      </S.CardTrack>
    </S.MainBox>
  );
};

export default Categories;

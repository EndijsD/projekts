import {
  CardActions,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import * as S from './style';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useData from '../../hooks/useData';

const GridLayout = ({ title, data, error, isPending }) => {
  const nav = useNavigate();
  const down430 = useMediaQuery((theme) => theme.breakpoints.down(430));
  const down950 = useMediaQuery((theme) => theme.breakpoints.down(950));
  const down710 = useMediaQuery((theme) => theme.breakpoints.down(710));
  const theme = useTheme();
  const { basket, updateBasket } = useData();

  const handleOnMouseMove = (e) => {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  useEffect(() => {
    if (!error && data)
      for (const card of document.querySelectorAll('.card')) {
        card.onmousemove = (e) => handleOnMouseMove(e);
      }
  }, [data, error]);

  const putInBasket = (product) => {
    const itemID = basket.findIndex(
      (item) => item.product.preces_id == product.preces_id
    );
    let updatedBasket;

    if (itemID != -1) {
      updatedBasket = basket.map((item) =>
        item.product.preces_id == product.preces_id
          ? {
              ...item,
              count:
                item.count + 1 <= product.pieejamiba
                  ? item.count + 1
                  : item.count,
            }
          : item
      );
    } else {
      const newItem = { product: product, count: 1 };
      updatedBasket = basket.concat(newItem);
    }

    localStorage.setItem('basket', JSON.stringify(updatedBasket));
    updateBasket(updatedBasket);
  };

  return (
    <S.StyledPaper>
      <S.Title
        variant="h5"
        color={error && 'error'}
        sx={{
          color:
            !error && theme.palette.mode == 'light' && theme.palette.grey[800],
        }}
      >
        {title}
      </S.Title>
      {isPending && (
        <S.StyledPropagateLoader color={theme.palette.primary.main} />
      )}
      {!isPending && data && (
        <Grid
          container
          rowSpacing={{ xs: 1, sm: 2, md: 3 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {data.map((product) => {
            return (
              <Grid
                key={product.preces_id}
                item
                xs={down430 ? false : 6}
                sm={down710 ? 6 : 4}
                md={down950 ? 4 : 3}
              >
                <S.StyledCard
                  onClick={(e) =>
                    e.target.type != 'button' && nav('/' + product.preces_id)
                  }
                  className="card"
                >
                  <S.StyledCardContent>
                    <S.StyledCardMedia
                      component="img"
                      image={product.attelu_celi[0]}
                    />
                    <CardActions
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <S.BuyButton
                        variant="outlined"
                        onClick={() =>
                          product.pieejamiba && putInBasket(product)
                        }
                        className="buyButton"
                      >
                        Ielikt Grozā
                      </S.BuyButton>
                    </CardActions>
                    <Divider
                      className="divider"
                      sx={{ display: 'block', mt: '18px', mb: '18px' }}
                    />
                    <Typography variant="h5" sx={{ position: 'relative' }}>
                      {product.cena} €
                    </Typography>
                    <Typography sx={{ position: 'relative' }}>
                      {product.nosaukums}
                    </Typography>
                  </S.StyledCardContent>
                </S.StyledCard>
              </Grid>
            );
          })}
        </Grid>
      )}
    </S.StyledPaper>
  );
};

export default GridLayout;

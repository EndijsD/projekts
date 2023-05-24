import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import * as S from './style';
import useData from '../../hooks/useData';
import { Add, Remove } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Basket = () => {
  const { basket, updateBasket } = useData();
  const [localBasket, setLocalBasket] = useState(basket);
  const nav = useNavigate();

  const updateCount = (id, amount) => {
    const updatedBasket = localBasket.map((item) =>
      item.product.preces_id == id
        ? typeof amount == 'string'
          ? { ...item, count: Number(amount) }
          : { ...item, count: item.count + amount }
        : item
    );

    localStorage.setItem('basket', JSON.stringify(updatedBasket));
    updateBasket(updatedBasket);
  };

  useEffect(() => {
    setLocalBasket(JSON.parse(localStorage.getItem('basket')));
  }, [basket]);

  const handleRemoveItem = (id) => {
    let updatedBasket = localBasket.map((item) =>
      item.product.preces_id == id ? null : item
    );
    updatedBasket = updatedBasket.filter((item) => item != null);

    localStorage.setItem('basket', JSON.stringify(updatedBasket));
    updateBasket(updatedBasket);
  };

  return (
    <S.StyledContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <S.HighlightedTableRow>
              <TableCell>
                <S.TableTitle>Attēls</S.TableTitle>
              </TableCell>
              <TableCell>
                <S.TableTitle>Preces nosaukums</S.TableTitle>
              </TableCell>
              <TableCell>
                <S.TableTitle>
                  Cena <S.StyledSup>(gab.)</S.StyledSup>
                </S.TableTitle>
              </TableCell>
              <TableCell>
                <S.TableTitle>Daudzums</S.TableTitle>
              </TableCell>
              <TableCell>
                <S.TableTitle>Cena</S.TableTitle>
              </TableCell>
            </S.HighlightedTableRow>
          </TableHead>
          <TableBody>
            {localBasket.length ? (
              <>
                {localBasket.map((item) => (
                  <S.HoverTableRow key={item.product.preces_id}>
                    <S.SpecialTableCell
                      onClick={() => nav('/' + item.product.preces_id)}
                    >
                      <S.StyledImg src={item.product.attelu_celi[0]} />
                    </S.SpecialTableCell>
                    <S.SpecialTableCell
                      onClick={() => nav('/' + item.product.preces_id)}
                    >
                      <Typography>{item.product.nosaukums}</Typography>
                    </S.SpecialTableCell>
                    <S.StyledTableCell>
                      <Typography>{item.product.cena} €</Typography>
                    </S.StyledTableCell>
                    <TableCell>
                      <S.StyledCountBox>
                        <Button
                          onClick={() =>
                            item.count > 1
                              ? updateCount(item.product.preces_id, -1)
                              : handleRemoveItem(item.product.preces_id)
                          }
                        >
                          <Remove />
                        </Button>
                        <S.StyledTextField
                          label="Skaits"
                          value={item.count}
                          onChange={(e) =>
                            e.target.value <= item.product.pieejamiba &&
                            (e.target.value >= 1
                              ? updateCount(
                                  item.product.preces_id,
                                  e.target.value
                                )
                              : handleRemoveItem(item.product.preces_id))
                          }
                          inputProps={{ min: 1, max: item.product.pieejamiba }}
                          type="number"
                          variant="standard"
                          required
                        />

                        <Button
                          sx={{
                            visibility:
                              item.count >= item.product.pieejamiba && 'hidden',
                          }}
                          onClick={() => updateCount(item.product.preces_id, 1)}
                        >
                          <Add />
                        </Button>
                      </S.StyledCountBox>
                    </TableCell>
                    <S.StyledTableCell>
                      <Typography>
                        {(item.product.cena * item.count).toFixed(2)} €
                      </Typography>
                    </S.StyledTableCell>
                  </S.HoverTableRow>
                ))}
                <S.HighlightedTableRow>
                  <S.StyledTableCell colSpan={5}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        alignItems: 'end',
                      }}
                    >
                      <Typography fontSize="1.5rem">
                        Kopā apmaksai:{' '}
                        <b>
                          {localBasket
                            .reduce(
                              (sum, item) =>
                                sum +
                                Number(item.product.cena) *
                                  (!isNaN(item.count) ? Number(item.count) : 0),
                              0
                            )
                            .toFixed(2)}{' '}
                          €
                        </b>
                      </Typography>
                      <Button
                        sx={{
                          padding: '.5rem',
                          width: 350,
                          color: 'white',
                          fontSize: '1.2rem',
                          background: 'rgb(255, 100, 10)',

                          '&:hover': {
                            background: 'rgb(255, 120, 10)',
                          },
                        }}
                        onClick={() => nav('/checkout')}
                      >
                        Veikt apmaksu
                      </Button>
                    </Box>
                  </S.StyledTableCell>
                </S.HighlightedTableRow>
              </>
            ) : (
              <S.StyledTableRow>
                <TableCell colSpan={5}>
                  <Typography padding="1rem">Tavs grozs ir tukšs</Typography>
                </TableCell>
              </S.StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </S.StyledContainer>
  );
};

export default Basket;

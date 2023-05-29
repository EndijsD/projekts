import * as S from './style';
import { useEffect, useState } from 'react';
import url from '../../url';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { PropagateLoader } from 'react-spinners';
import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import useData from '../../hooks/useData';

const SingleItem = () => {
  const { id } = useParams();
  const { data, isPending, error } = useFetch(url + `special/prece/${id}`);
  const [count, setCount] = useState(1);
  const downMedium = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const downSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const theme = useTheme();
  const { basket, updateBasket } = useData();
  const [open, setOpen] = useState(false);

  const putInBasket = (obj) => {
    const itemID = basket.findIndex(
      (item) => item.product.preces_id == obj.preces_id
    );
    let updatedBasket;

    if (itemID != -1) {
      updatedBasket = basket.map((item) =>
        item.product.preces_id == obj.preces_id
          ? {
              ...item,
              count:
                item.count + count <= obj.pieejamiba
                  ? item.count + count
                  : item.count,
            }
          : item
      );
    } else {
      const newItem = { product: obj, count: count };
      updatedBasket = basket.concat(newItem);
    }

    localStorage.setItem('basket', JSON.stringify(updatedBasket));
    updateBasket(updatedBasket);
  };

  useEffect(() => {
    if (downSmall) {
      setOpen(false);
    }
  }, [downSmall]);

  return (
    <S.StyledContainer>
      {!isNaN(id) && (
        <>
          {!isPending && !error && (
            <>
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                onClick={() => setOpen(false)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <S.StyledImg
                  src={data.attelu_celi[0]}
                  alt="Mūzikas instrumenta attēls"
                  sx={{
                    width: '90%',
                    height: '90%',
                    objectFit: 'contain',
                    outline: 'none',
                  }}
                />
              </Modal>

              <Grid
                container
                columns={downMedium ? 1 : 2}
                rowSpacing={downMedium ? 3 : 10}
                columnSpacing={3}
              >
                <Grid
                  item
                  xs={1}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <S.StyledImg
                    onClick={() => !downSmall && setOpen(true)}
                    src={data.attelu_celi[0]}
                    alt="Mūzikas instrumenta attēls"
                    sx={{
                      width: downSmall ? '100%' : downMedium ? '30rem' : '100%',
                      cursor: !downSmall && 'pointer',
                      objectFit: downMedium ? 'contain' : 'cover',
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <S.StyledPaper>
                    <Box>
                      <S.Title variant="h5">{data.nosaukums}</S.Title>
                      <S.Price variant="h6">{data.cena} €</S.Price>
                    </Box>

                    <Divider sx={{ margin: '2rem' }} />

                    <TableContainer component={Paper}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <Typography variant="h6">Ražotājs:</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">
                                {data.razotajs}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant="h6">Modelis:</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">
                                {data.modelis}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <S.GradientTextTableRow pieejamiba={data.pieejamiba}>
                            <TableCell>
                              <Typography variant="h6">Pieejamība:</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">
                                {data.pieejamiba}
                              </Typography>
                            </TableCell>
                          </S.GradientTextTableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <Divider sx={{ margin: '2rem' }} />

                    <S.StyledBuyBox
                      sx={{ justifyContent: data.pieejamiba == 1 && 'center' }}
                    >
                      {data.pieejamiba != 1 && (
                        <S.StyledCountBox>
                          <Button
                            sx={{
                              visibility: count <= 1 && 'hidden',
                            }}
                            onClick={() => setCount((prev) => prev - 1)}
                          >
                            <Remove />
                          </Button>
                          <S.StyledTextField
                            label="Skaits"
                            value={count}
                            onChange={(e) =>
                              e.target.value <= data.pieejamiba &&
                              e.target.value >= 1 &&
                              setCount(e.target.value)
                            }
                            inputProps={{ min: 1, max: data.pieejamiba }}
                            type="number"
                            variant="standard"
                            required
                          />

                          <Button
                            sx={{
                              visibility: count >= data.pieejamiba && 'hidden',
                            }}
                            onClick={() => setCount((prev) => prev + 1)}
                          >
                            <Add />
                          </Button>
                        </S.StyledCountBox>
                      )}

                      <S.BuyButton
                        variant="outlined"
                        onClick={() =>
                          data.pieejamiba &&
                          putInBasket({
                            attelu_celi: data.attelu_celi,
                            cena: data.cena,
                            id_precu_specifikacija: data.id_precu_specifikacija,
                            nosaukums: data.nosaukums,
                            pieejamiba: data.pieejamiba,
                            pievienosanas_datums: data.pievienosanas_datums,
                            preces_id: data.preces_id,
                          })
                        }
                      >
                        Ielikt Grozā
                      </S.BuyButton>
                    </S.StyledBuyBox>
                  </S.StyledPaper>
                </Grid>
                <Grid item xs>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <S.StyledTableCell
                            colSpan={Object.entries(data.ipasibas).length}
                            sx={{ textAlign: 'center' }}
                          >
                            <Typography sx={{ fontWeight: 'bold' }}>
                              Izstrādājuma īpašības
                            </Typography>
                          </S.StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(data.ipasibas).map((arr) => (
                          <S.StyledTableRow key={arr[0]}>
                            <S.StyledTableCell>{arr[0]}</S.StyledTableCell>
                            <S.StyledTableCell>{arr[1]}</S.StyledTableCell>
                          </S.StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </>
          )}
          {isPending && <PropagateLoader color={theme.palette.primary.main} />}
          {!isPending && error && (
            <Typography variant="h5" color="error" sx={{ fontWeight: 'bold' }}>
              Nevarēja dabūt šo preci...
            </Typography>
          )}
        </>
      )}
    </S.StyledContainer>
  );
};

export default SingleItem;

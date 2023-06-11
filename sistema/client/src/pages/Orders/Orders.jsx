import { Fragment, useEffect, useState } from 'react';
import useData from '../../hooks/useData';
import url from '../../url';
import * as S from './style';
import {
  Accordion,
  AccordionDetails,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import moment from 'moment';
import { PropagateLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const orderHeadings = [
  'Pasūtījuma nr.',
  'Iesniegšanas datums',
  'Summa',
  'Status',
];

const productHeadings = [
  'Attēls',
  'Preces nosaukums',
  'Cena_gab',
  'Daudzums',
  'Cena',
];

const Orders = () => {
  const { user } = useData();
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  let doOnce = true;
  const theme = useTheme();
  const nav = useNavigate();

  useEffect(() => {
    if (user && doOnce) {
      setProducts([]);
      doOnce = false;

      fetch(url + 'special/orders', {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }).then(async (res) => {
        if (!res.ok) {
          setIsPending(false);
          setError(true);
        } else {
          const data = await res.json();
          setOrders(data);

          if (data.length) {
            for (const order of data) {
              fetch(
                url + `special/pasutijumi_preces/${order.pasutijumi_id}`
              ).then(async (res) => {
                if (res.ok) {
                  const data = await res.json();

                  if (data.length) {
                    setProducts((prev) => prev.concat(data));
                    setError(false);
                    setIsPending(false);
                  }
                }
              });
            }
          } else {
            setError(false);
            setIsPending(false);
          }
        }
      });
    }
  }, [user]);

  return (
    <S.StyledContainer sx={{ display: (isPending || error) && 'flex' }}>
      {!isPending && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <S.TableRowNoBottomBorder>
                {orderHeadings.map((heading) => (
                  <TableCell key={heading}>
                    <S.TableTitle>{heading}</S.TableTitle>
                  </TableCell>
                ))}
              </S.TableRowNoBottomBorder>
            </TableHead>
            <TableBody>
              {orders.length ? (
                orders.map((order) => (
                  <Fragment key={order.pasutijumi_id}>
                    <S.StyledTableRow>
                      <S.StyledTableCell>
                        <Typography>{order.pasutijumi_id}</Typography>
                      </S.StyledTableCell>
                      <S.StyledTableCell>
                        <Typography>
                          {moment(order.izveidosanas_datums).format(
                            'YYYY-MM-DD HH:mm:ss'
                          )}
                        </Typography>
                      </S.StyledTableCell>
                      <S.StyledTableCell>
                        <Typography>
                          {products
                            .filter(
                              (product) =>
                                product.id_pasutijumi == order.pasutijumi_id
                            )
                            .reduce(
                              (total, orderProduct) =>
                                total +
                                Number(orderProduct.cena) *
                                  Number(orderProduct.skaits),
                              0
                            )
                            .toFixed(2) + ' €'}
                        </Typography>
                      </S.StyledTableCell>
                      <S.StyledTableCell>
                        <S.Status status={order.status}>
                          {order.status}
                        </S.Status>
                      </S.StyledTableCell>
                    </S.StyledTableRow>
                    <S.StyledTableRow>
                      <S.StyledTableCell
                        sx={{ p: 0 }}
                        colSpan={orderHeadings.length}
                      >
                        <Accordion
                          sx={{
                            backgroundImage: 'none',
                            boxShadow: 'none',
                          }}
                        >
                          <S.StyledAccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>Preces</Typography>
                          </S.StyledAccordionSummary>
                          <AccordionDetails>
                            <TableContainer>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    {productHeadings.map((heading) => (
                                      <S.StyledTableCell key={heading}>
                                        {heading != 'Cena_gab' ? (
                                          <Typography>{heading}</Typography>
                                        ) : (
                                          <Typography>
                                            Cena{' '}
                                            <S.StyledSup>(gab.)</S.StyledSup>
                                          </Typography>
                                        )}
                                      </S.StyledTableCell>
                                    ))}
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {Boolean(products.length) &&
                                    products
                                      .filter(
                                        (product) =>
                                          product.id_pasutijumi ==
                                          order.pasutijumi_id
                                      )
                                      .map((orderProduct) => (
                                        <S.HoverTableRow
                                          key={
                                            orderProduct.pasutijumi_preces_id
                                          }
                                          onClick={() =>
                                            nav('/' + orderProduct.preces_id)
                                          }
                                        >
                                          <S.StyledTableCell>
                                            <S.StyledImg
                                              src={orderProduct.attelu_celi[0]}
                                            />
                                          </S.StyledTableCell>
                                          <S.StyledTableCell>
                                            <Typography>
                                              {orderProduct.nosaukums}
                                            </Typography>
                                          </S.StyledTableCell>
                                          <S.StyledTableCell>
                                            <Typography>
                                              {orderProduct.cena} €
                                            </Typography>
                                          </S.StyledTableCell>
                                          <S.StyledTableCell>
                                            <Typography>
                                              {orderProduct.skaits}
                                            </Typography>
                                          </S.StyledTableCell>
                                          <S.StyledTableCell>
                                            <Typography>
                                              {(
                                                orderProduct.cena *
                                                orderProduct.skaits
                                              ).toFixed(2) + ' €'}
                                            </Typography>
                                          </S.StyledTableCell>
                                        </S.HoverTableRow>
                                      ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </AccordionDetails>
                        </Accordion>
                      </S.StyledTableCell>
                    </S.StyledTableRow>
                  </Fragment>
                ))
              ) : (
                <S.TableRowNoBottomBorder>
                  <TableCell colSpan={orderHeadings.length}>
                    <Typography padding="1rem">
                      Jūs nēesat veicis nevienu pasūtījumu
                    </Typography>
                  </TableCell>
                </S.TableRowNoBottomBorder>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {isPending && <PropagateLoader color={theme.palette.primary.main} />}
      {!isPending && error && (
        <Typography variant="h5" color="error" sx={{ fontWeight: 'bold' }}>
          Notikusi neparedzēta kļūda...
        </Typography>
      )}
    </S.StyledContainer>
  );
};

export default Orders;

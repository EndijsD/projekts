import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  useMediaQuery,
} from '@mui/material';
import AddressForm from '../../components/AddressForm';
import PaymentForm from '../../components/PaymentForm';
import Review from '../../components/Review';
import { useEffect, useState } from 'react';
import * as S from './style';
import moment from 'moment';
import useData from '../../hooks/useData';
import url from '../../url';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const steps = ['Dati', 'Apmaksa', 'Pasūtījuma informācija'];

const initialUserValues = {
  vards: '',
  uzvards: '',
  talrunis: '',
  epasts: '',
};
const initialAddressValues = {
  pasta_indekss: '',
  pilseta: '',
  novads: '',
  pagasts: '',
  iela: '',
  majas_nos: '',
  dzivokla_nr: '',
};
const initialCardValues = {
  vards_uzvards: '',
  numurs: '',
  deriga_lidz: moment(),
  cvv: '',
};

let user_id = null;

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userValues, setUserValues] = useState(initialUserValues);
  const [addressValues, setAddressValues] = useState(initialAddressValues);
  const [cardValues, setCardValues] = useState(initialCardValues);
  const [problem, setProblem] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { user, basket, updateBasket } = useData();
  const up500 = useMediaQuery((theme) => theme.breakpoints.up(500));
  const [orderID, setOrderID] = useState(null);
  const nav = useNavigate();

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            userValues={userValues}
            setUserValues={setUserValues}
            addressValues={addressValues}
            setAddressValues={setAddressValues}
            problem={problem}
          />
        );
      case 1:
        return (
          <PaymentForm cardValues={cardValues} setCardValues={setCardValues} />
        );
      case 2:
        return (
          <Review
            userValues={userValues}
            addressValues={addressValues}
            cardValues={cardValues}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  useEffect(() => {
    user &&
      fetch(url + 'special/user_address', {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }).then(async (res) => {
        if (res.ok) {
          const data = await res.json();

          user_id = Object.entries(data).find(
            (item) => item[0] == 'lietotaji_id'
          )[1];

          const autofillArrUser = Object.entries(data).filter((item) =>
            userValues.hasOwnProperty(item[0])
          );
          const autofillObjUser = Object.fromEntries(autofillArrUser);
          setUserValues(autofillObjUser);

          let autofillArrAddress = Object.entries(data).filter((item) =>
            addressValues.hasOwnProperty(item[0])
          );
          autofillArrAddress = autofillArrAddress.map((item) =>
            item[1] == null ? [item[0], ''] : item
          );
          const autofillObjAddress = Object.fromEntries(autofillArrAddress);
          setAddressValues(autofillObjAddress);
        }
      });
  }, [user]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const notMin4AddressFields =
      Object.values(addressValues).filter((value) => value).length < 4;

    if (notMin4AddressFields) {
      setProblem('adr');
      setIsPending(false);

      setTimeout(() => {
        setProblem(null);
      }, 1500);

      return;
    }

    if (activeStep == steps.length - 1) {
      setIsPending(true);

      if (user) {
        fetch(url + 'pasutijumi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_lietotaji: user_id,
            status: 'Sagatavo izsūtīšanai',
          }),
        }).then(async (res) => {
          if (!res.ok) {
            setIsPending(false);
            setProblem('error');

            setTimeout(() => {
              setProblem(null);
            }, 1500);
          } else {
            const data = await res.json();
            const orderID = data.id;

            for (const item of basket) {
              fetch(url + 'pasutijumi_preces', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id_pasutijumi: orderID,
                  id_preces: item.product.preces_id,
                  skaits: item.count,
                }),
              });
            }

            for (const item of basket) {
              fetch(url + `preces/${item.product.preces_id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  pieejamiba: item.product.pieejamiba - item.count,
                }),
              });
            }

            setOrderID(orderID);
            setIsPending(false);
            updateBasket([]);
            localStorage.removeItem('basket');
            handleNext();
          }
        });
      } else {
        fetch(url + 'adreses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(addressValues),
        }).then(async (res) => {
          if (!res.ok) {
            setIsPending(false);
            setProblem('error');

            setTimeout(() => {
              setProblem(null);
            }, 1500);
          } else {
            const data = await res.json();
            const addressID = data.id;

            fetch(url + 'neregistreti_klienti', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...userValues,
                id_adreses: addressID,
              }),
            }).then(async (res) => {
              if (!res.ok) {
                setIsPending(false);
                setProblem('error');

                setTimeout(() => {
                  setProblem(null);
                }, 1500);
              } else {
                const data = await res.json();
                const unregisteredClientID = data.id;

                fetch(url + 'pasutijumi', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    id_neregistreti_klienti: unregisteredClientID,
                    status: 'Sagatavo izsūtīšanai',
                  }),
                }).then(async (res) => {
                  if (!res.ok) {
                    setIsPending(false);
                    setProblem('error');

                    setTimeout(() => {
                      setProblem(null);
                    }, 1500);
                  } else {
                    const data = await res.json();
                    const orderID = data.id;

                    for (const item of basket) {
                      fetch(url + 'pasutijumi_preces', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          id_pasutijumi: orderID,
                          id_preces: item.product.preces_id,
                          skaits: item.count,
                        }),
                      });
                    }

                    for (const item of basket) {
                      fetch(url + `preces/${item.product.preces_id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          pieejamiba: item.product.pieejamiba - item.count,
                        }),
                      });
                    }

                    setOrderID(orderID);
                    setIsPending(false);
                    updateBasket([]);
                    localStorage.removeItem('basket');
                    handleNext();
                  }
                });
              }
            });
          }
        });
      }
    } else {
      handleNext();
    }
  };

  return (
    <S.StyledContainer maxWidth={false} sx={{ maxWidth: 700 }}>
      <S.StyledPaper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <form onSubmit={handleFormSubmit}>
          <Typography component="h1" variant="h4" align="center">
            Pasūtījuma veikšana
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{up500 && label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep == steps.length ? (
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" gutterBottom>
                Paldies par pirkumu!
              </Typography>
              <Typography variant="subtitle1" display="inline">
                Tava pasūtījuma numurs ir #{orderID}.
                {user && ' Vari apskatīties sava pasūtījuma statusu '}
              </Typography>
              {user && (
                <Button
                  sx={{ textTransform: 'none' }}
                  onClick={() => nav('/orders')}
                >
                  "Pasūtījumi"
                </Button>
              )}
              {user && (
                <Typography variant="subtitle1" display="inline">
                  {' '}
                  sadaļā.
                </Typography>
              )}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  mt: '2rem',
                }}
              >
                <Button variant="outlined" onClick={() => nav('/')}>
                  Galvenā lapa
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button
                    onClick={handleBack}
                    sx={{ mt: 3, ml: 1 }}
                    disabled={isPending}
                  >
                    Atpakaļ
                  </Button>
                )}

                <Button
                  variant="outlined"
                  type="submit"
                  sx={{
                    mt: 3,
                    ml: 1,
                    width: 106,
                    height: 40,
                  }}
                  color={problem == 'error' && !isPending ? 'error' : 'primary'}
                >
                  {isPending ? (
                    <ClipLoader color="white" />
                  ) : activeStep == steps.length - 1 ? (
                    'Pirkt'
                  ) : (
                    'Turpināt'
                  )}
                </Button>
              </Box>
            </>
          )}
        </form>
      </S.StyledPaper>
    </S.StyledContainer>
  );
};

export default Checkout;

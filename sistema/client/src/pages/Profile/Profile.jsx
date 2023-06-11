import { Check, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import * as S from './style';
import url from '../../url';
import { PropagateLoader } from 'react-spinners';
import useData from '../../hooks/useData';
import { useNavigate } from 'react-router-dom';

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

const initialPasswordValues = {
  parole: '',
  parole_atk: '',
};

let user_id = null;
let address_id = null;

const Profile = () => {
  const [userValues, setUserValues] = useState(initialUserValues);
  const [addressValues, setAddressValues] = useState(initialAddressValues);
  const [passwordValues, setPasswordValues] = useState(initialPasswordValues);
  const [showPassword, setShowPassword] = useState([false, false]);
  const [problem, setProblem] = useState('');
  const [isPending, setIsPending] = useState('autofill');
  const [success, setSuccess] = useState('');
  const [active, setActive] = useState([false, false]);
  const { user, updateUser } = useData();
  const theme = useTheme();
  const [gotAutofill, setGotAutofill] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    user &&
      fetch(url + 'special/user_address', {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }).then(async (res) => {
        if (!res.ok) {
          setIsPending('');
          setProblem('autofill');
        } else {
          const data = await res.json();

          user_id = Object.entries(data).find(
            (item) => item[0] == 'lietotaji_id'
          )[1];
          address_id = Object.entries(data).find(
            (item) => item[0] == 'adreses_id'
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

          setGotAutofill(true);
          setIsPending('');
        }
      });
  }, [user]);

  const handleClickShowPassword = (index) => {
    setShowPassword((showPassword) =>
      showPassword.map((value, i) => (i == index ? !value : value))
    );
  };

  const handleFormSubmitUser = (e) => {
    e.preventDefault();
    setIsPending('user');

    fetch(url + 'lietotaji/' + user_id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userValues),
    }).then((res) => {
      if (!res.ok) {
        setIsPending('');
        setProblem('user');

        setTimeout(() => {
          setProblem('');
        }, 1500);
      } else {
        setIsPending('');
        setSuccess('user');

        setTimeout(() => {
          setSuccess('');
        }, 1500);
      }
    });
  };

  const handleFormSubmitAddress = (e) => {
    e.preventDefault();
    setIsPending('address');

    const notMin4AddressFields =
      Object.values(addressValues).filter((value) => value).length < 4;

    if (notMin4AddressFields) {
      setIsPending(false);
      setProblem('adrFields');

      setTimeout(() => {
        setProblem('');
      }, 1500);

      return;
    }

    fetch(url + 'adreses/' + address_id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addressValues),
    }).then((res) => {
      if (!res.ok) {
        setIsPending('');
        setProblem('address');

        setTimeout(() => {
          setProblem('');
        }, 1500);
      } else {
        setIsPending('');
        setSuccess('address');

        setTimeout(() => {
          setSuccess('');
        }, 1500);
      }
    });
  };

  const handleFormSubmitPassword = (e) => {
    e.preventDefault();
    setIsPending('password');

    const notSamePasswordTwice =
      passwordValues.parole != passwordValues.parole_atk;

    if (notSamePasswordTwice) {
      setIsPending(false);
      setProblem('pass');

      setTimeout(() => {
        setProblem('');
      }, 1500);

      return;
    }

    fetch(url + 'lietotaji/' + user_id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ parole: passwordValues.parole }),
    }).then((res) => {
      if (!res.ok) {
        setIsPending('');
        setProblem('password');

        setTimeout(() => {
          setProblem('');
        }, 1500);
      } else {
        setIsPending('');
        setSuccess('password');
        setPasswordValues(initialPasswordValues);

        setTimeout(() => {
          setSuccess('');
        }, 1500);
      }
    });
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    setIsPending('delete');

    fetch(url + 'adreses/' + address_id, {
      method: 'DELETE',
    }).then((res) => {
      if (!res.ok) {
        setIsPending('');
        setProblem('delete');

        setTimeout(() => {
          setProblem('');
        }, 1500);
      } else {
        setIsPending('');
        setSuccess('delete');

        setTimeout(() => {
          logout();
          setSuccess('');
        }, 1500);
      }
    });
  };

  const logout = () => {
    updateUser(null);
    localStorage.removeItem('user_token');
    nav('/');
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;

    userValues.hasOwnProperty(name)
      ? setUserValues({
          ...userValues,
          [name]: value,
        })
      : addressValues.hasOwnProperty(name)
      ? setAddressValues({
          ...addressValues,
          [name]: value,
        })
      : setPasswordValues({
          ...passwordValues,
          [name]: value,
        });
  };

  return (
    <S.MainBox>
      {isPending != 'autofill' && gotAutofill && (
        <S.StyledPaper>
          <S.Title>Profils</S.Title>

          <S.Form onSubmit={handleFormSubmitUser}>
            <S.SubTitle variant="h6">Jūsu personiskā informācija</S.SubTitle>

            <S.InputField
              label="Vārds"
              variant="standard"
              name="vards"
              value={userValues.vards}
              onChange={handleFormInputChange}
              required
              autoComplete="true"
              inputProps={{
                maxLength: 45,
              }}
            />

            <S.InputField
              label="Uzvārds"
              variant="standard"
              name="uzvards"
              value={userValues.uzvards}
              onChange={handleFormInputChange}
              required
              autoComplete="true"
              inputProps={{
                maxLength: 45,
              }}
            />

            <S.InputField
              label="Tālrunis"
              variant="standard"
              type="tel"
              name="talrunis"
              value={userValues.talrunis}
              onChange={handleFormInputChange}
              required
              autoComplete="true"
              inputProps={{
                maxLength: 12,
              }}
            />

            <S.InputField
              label="E-pasts"
              variant="standard"
              type="email"
              name="epasts"
              value={userValues.epasts}
              onChange={handleFormInputChange}
              required
              autoComplete="true"
              inputProps={{
                maxLength: 100,
              }}
            />

            <S.SubmitButton
              variant="outlined"
              type={success ? undefined : 'submit'}
              color={
                problem == 'user'
                  ? 'error'
                  : success == 'user'
                  ? 'success'
                  : 'primary'
              }
              disabled={Boolean(isPending)}
            >
              {isPending == 'user' ? (
                <CircularProgress />
              ) : success == 'user' ? (
                <Check />
              ) : (
                <>Saglabāt</>
              )}
            </S.SubmitButton>
          </S.Form>

          <S.Form onSubmit={handleFormSubmitAddress}>
            <S.SubTitle variant="h6">
              Jūsu adrese <S.Info>(minimums aizpildīt 4. laukus)</S.Info>
            </S.SubTitle>

            <S.InputField
              label="Pasta indekss"
              variant="standard"
              name="pasta_indekss"
              value={addressValues.pasta_indekss}
              onChange={handleFormInputChange}
              required
              autoComplete="true"
              inputProps={{
                maxLength: 7,
              }}
            />

            <S.InputField
              label="Pilsēta"
              variant="standard"
              name="pilseta"
              value={addressValues.pilseta}
              onChange={handleFormInputChange}
              error={problem == 'adrFields' && !addressValues.pilseta}
              autoComplete="true"
              inputProps={{
                maxLength: 60,
              }}
            />

            <S.InputField
              label="Novads"
              variant="standard"
              name="novads"
              value={addressValues.novads}
              onChange={handleFormInputChange}
              error={problem == 'adrFields' && !addressValues.novads}
              autoComplete="true"
              inputProps={{
                maxLength: 60,
              }}
            />

            <S.InputField
              label="Pagasts"
              variant="standard"
              name="pagasts"
              value={addressValues.pagasts}
              onChange={handleFormInputChange}
              error={problem == 'adrFields' && !addressValues.pagasts}
              autoComplete="true"
              inputProps={{
                maxLength: 60,
              }}
            />

            <S.InputField
              label="Iela"
              variant="standard"
              name="iela"
              value={addressValues.iela}
              onChange={handleFormInputChange}
              error={problem == 'adrFields' && !addressValues.iela}
              autoComplete="true"
              inputProps={{
                maxLength: 60,
              }}
            />

            <S.InputField
              label="Mājas nosaukums"
              variant="standard"
              name="majas_nos"
              value={addressValues.majas_nos}
              onChange={handleFormInputChange}
              error={problem == 'adrFields' && !addressValues.majas_nos}
              autoComplete="true"
              inputProps={{
                maxLength: 60,
              }}
            />

            <S.InputField
              label="Dzīvokļa numurs"
              variant="standard"
              name="dzivokla_nr"
              value={addressValues.dzivokla_nr}
              onChange={handleFormInputChange}
              error={problem == 'adrFields' && !addressValues.dzivokla_nr}
              autoComplete="true"
              inputProps={{
                maxLength: 60,
              }}
            />

            <S.SubmitButton
              variant="outlined"
              type={success ? undefined : 'submit'}
              color={
                problem == 'address'
                  ? 'error'
                  : success == 'address'
                  ? 'success'
                  : 'primary'
              }
              disabled={Boolean(isPending)}
            >
              {isPending == 'address' ? (
                <CircularProgress />
              ) : success == 'address' ? (
                <Check />
              ) : (
                <>Saglabāt</>
              )}
            </S.SubmitButton>
          </S.Form>

          <S.Form onSubmit={handleFormSubmitPassword}>
            <S.SubTitle variant="h6">Mainīt paroli</S.SubTitle>

            <S.InputField
              label="Jaunā parole"
              variant="standard"
              type={showPassword[0] ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClickShowPassword(0)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword[0] ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputProps={{
                pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                maxLength: 100,
              }}
              onMouseEnter={() =>
                setActive((prev) =>
                  prev.map((value, i) => (i == 0 ? true : value))
                )
              }
              onMouseLeave={() =>
                setActive((prev) =>
                  prev.map((value, i) => (i == 0 ? false : value))
                )
              }
              sx={{
                '.MuiFormHelperText-root': {
                  visibility: active[0] ? '' : 'hidden',
                },
                mb: -2,
              }}
              helperText={
                '8 rakstzīmes, kur ir vismaz 1 lielais, mazais burts un cipars'
              }
              name="parole"
              value={passwordValues.parole}
              onChange={handleFormInputChange}
              required
              error={problem == 'pass'}
              autoComplete="true"
            />

            <S.InputField
              label="Jaunā parole atkārtoti"
              variant="standard"
              type={showPassword[1] ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClickShowPassword(1)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword[1] ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputProps={{
                pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                maxLength: 100,
              }}
              onMouseEnter={() =>
                setActive((prev) =>
                  prev.map((value, i) => (i == 1 ? true : value))
                )
              }
              onMouseLeave={() =>
                setActive((prev) =>
                  prev.map((value, i) => (i == 1 ? false : value))
                )
              }
              sx={{
                '.MuiFormHelperText-root': {
                  visibility: active[1] ? '' : 'hidden',
                },
                mb: -2,
              }}
              helperText={
                '8 rakstzīmes, kur ir vismaz 1 lielais, mazais burts un cipars'
              }
              name="parole_atk"
              value={passwordValues.parole_atk}
              onChange={handleFormInputChange}
              required
              error={problem == 'pass'}
              autoComplete="true"
            />

            <S.SubmitButton
              variant="outlined"
              type={success ? undefined : 'submit'}
              color={
                problem == 'password'
                  ? 'error'
                  : success == 'password'
                  ? 'success'
                  : 'primary'
              }
              disabled={Boolean(isPending)}
            >
              {isPending == 'password' ? (
                <CircularProgress />
              ) : success == 'password' ? (
                <Check />
              ) : (
                <>Saglabāt</>
              )}
            </S.SubmitButton>
          </S.Form>

          <S.Form onSubmit={handleDeleteAccount}>
            <S.SubTitle variant="h6">Tiesības tikt aizmirstam</S.SubTitle>

            <Button
              variant="contained"
              type={success ? undefined : 'submit'}
              color={success == 'delete' ? 'success' : 'error'}
              disabled={Boolean(isPending)}
              sx={{
                background: problem == 'delete' && 'DarkRed',
                '&:hover': { background: problem == 'delete' && 'DarkRed' },
              }}
            >
              {isPending == 'delete' ? (
                <CircularProgress />
              ) : success == 'delete' ? (
                <Check />
              ) : (
                <>Dzēst kontu</>
              )}
            </Button>
          </S.Form>
        </S.StyledPaper>
      )}

      {isPending == 'autofill' && (
        <PropagateLoader color={theme.palette.primary.main} />
      )}

      {!isPending && problem == 'autofill' && (
        <Typography variant="h5" color="error" sx={{ fontWeight: 'bold' }}>
          Notikusi neparedzēta kļūda...
        </Typography>
      )}
    </S.MainBox>
  );
};

export default Profile;

import { Check, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useState } from 'react';
import * as S from './style';
import url from '../../url';
import { useNavigate } from 'react-router-dom';

const initialUserValues = {
  vards: '',
  uzvards: '',
  talrunis: '',
  epasts: '',
  parole: '',
  parole_atk: '',
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

const UserRegister = () => {
  const [userValues, setUserValues] = useState(initialUserValues);
  const [addressValues, setAddressValues] = useState(initialAddressValues);
  const [showPassword, setShowPassword] = useState([false, false]);
  const [problems, setProblems] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const nav = useNavigate();
  const [active, setActive] = useState([false, false]);

  const handleClickShowPassword = (index) => {
    setShowPassword((showPassword) =>
      showPassword.map((value, i) => (i == index ? !value : value))
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    const notMin4AddressFields =
      Object.values(addressValues).filter((value) => value).length < 4;
    const notSamePasswordTwice = userValues.parole != userValues.parole_atk;

    if (notMin4AddressFields || notSamePasswordTwice) {
      if (notMin4AddressFields) setProblems((prev) => prev.concat('adr'));
      if (notSamePasswordTwice) setProblems((prev) => prev.concat('pass'));

      setIsPending(false);

      setTimeout(() => {
        setProblems([]);
      }, 1500);

      return;
    }

    fetch(url + 'adreses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...addressValues }),
    }).then(async (res) => {
      if (!res.ok) {
        setIsPending(false);
        setProblems((prev) => prev.concat('error'));

        setTimeout(() => {
          setProblems([]);
        }, 1500);
      } else {
        const data = await res.json();

        if (data.id) {
          let finalUserValues = {};
          Object.assign(finalUserValues, userValues);

          delete finalUserValues.parole_atk;
          finalUserValues['id_adreses'] = data.id;

          fetch(url + 'lietotaji', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalUserValues),
          }).then(async (res) => {
            if (!res.ok) {
              setIsPending(false);
              setProblems('error');

              setTimeout(() => {
                setProblems([]);
              }, 1500);
            } else {
              setIsPending(false);
              setSuccess(true);

              setTimeout(() => {
                nav('/login');
              }, 1500);
            }
          });
        }
      }
    });
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;

    userValues.hasOwnProperty(name)
      ? setUserValues({
          ...userValues,
          [name]: value,
        })
      : setAddressValues({
          ...addressValues,
          [name]: value,
        });
  };

  return (
    <S.MainBox>
      <S.StyledPaper>
        <S.Form onSubmit={handleFormSubmit}>
          <S.Title>Reģistrēties</S.Title>

          <S.StyledBox>
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
          </S.StyledBox>

          <S.StyledBox>
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
              error={problems.includes('adr') && !addressValues.pilseta}
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
              error={problems.includes('adr') && !addressValues.novads}
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
              error={problems.includes('adr') && !addressValues.pagasts}
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
              error={problems.includes('adr') && !addressValues.iela}
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
              error={problems.includes('adr') && !addressValues.majas_nos}
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
              error={problems.includes('adr') && !addressValues.dzivokla_nr}
              autoComplete="true"
              inputProps={{
                maxLength: 60,
              }}
            />
          </S.StyledBox>

          <S.StyledBox>
            <S.SubTitle variant="h6">Jūsu parole</S.SubTitle>

            <S.InputField
              label="Parole"
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
              value={userValues.parole}
              onChange={handleFormInputChange}
              required
              error={problems.includes('pass')}
              autoComplete="true"
            />

            <S.InputField
              label="Parole atkārtoti"
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
              value={userValues.parole_atk}
              onChange={handleFormInputChange}
              required
              error={problems.includes('pass')}
              autoComplete="true"
            />
          </S.StyledBox>

          <S.ButtonBox>
            <S.SubmitButton
              variant="contained"
              type={success ? undefined : 'submit'}
              color={
                problems.includes('error') && !isPending
                  ? 'error'
                  : success
                  ? 'success'
                  : 'primary'
              }
              disabled={isPending}
            >
              {isPending ? (
                <CircularProgress />
              ) : success ? (
                <Check />
              ) : (
                <>Pievienoties</>
              )}
            </S.SubmitButton>

            <Button
              sx={{
                borderRadius: 50,
                maxWidth: 220,
                alignSelf: 'center',
              }}
              onClick={() => nav('/login')}
            >
              Ir konts? Autorizējies
            </Button>
          </S.ButtonBox>
        </S.Form>
      </S.StyledPaper>
    </S.MainBox>
  );
};

export default UserRegister;

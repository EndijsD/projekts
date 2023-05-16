import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useState } from 'react';
import * as S from './style';
import url from '../../url';
import useData from '../../hooks/useData';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  email: '',
  password: '',
};

const UserLogin = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const { updateUser } = useData();
  const [problem, setProblem] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const nav = useNavigate();

  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    fetch(url + 'auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formValues, table: 'lietotaji' }),
    }).then(async (res) => {
      if (!res.ok) {
        setIsPending(false);
        setProblem('error');

        setTimeout(() => {
          setProblem(null);
        }, 1500);
      } else {
        const data = await res.json();

        if (Object.keys(data).length) {
          setProblem(null);
          localStorage.setItem('user_token', data.accessToken);
          updateUser(data.accessToken);
          nav('/');
        } else {
          setIsPending(false);
          setProblem('wrong');

          setTimeout(() => {
            setProblem(null);
          }, 1500);
        }
      }
    });
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <S.box>
      <S.LoginBox>
        <S.StyledPaper>
          <S.Form onSubmit={handleFormSubmit}>
            <S.h1>Autorizēties</S.h1>

            <S.textField
              label="E-pasts"
              variant="standard"
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleFormInputChange}
              required
              error={problem == 'wrong' && true}
              autoComplete="true"
            />

            <S.textField
              label="Parole"
              variant="standard"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              name="password"
              value={formValues.password}
              onChange={handleFormInputChange}
              required
              error={problem == 'wrong' && true}
              autoComplete="true"
            />

            <S.button
              variant="contained"
              type="submit"
              color={problem == 'error' && !isPending ? 'error' : 'primary'}
              disabled={isPending}
            >
              {isPending ? <CircularProgress /> : <>Pievienoties</>}
            </S.button>

            <Button
              sx={{
                borderRadius: 50,
                mt: '1rem',
                maxWidth: 220,
                alignSelf: 'center',
              }}
              onClick={() => nav('/register')}
            >
              Nav konts? Reģistrējies
            </Button>
          </S.Form>
        </S.StyledPaper>
        <S.StyledImg src="/User/Common/login_screen.jpg" alt="Ģitāras attēls" />
      </S.LoginBox>
    </S.box>
  );
};

export default UserLogin;

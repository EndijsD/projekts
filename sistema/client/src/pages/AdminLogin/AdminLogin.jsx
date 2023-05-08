import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import * as S from './style';
import url from '../../url';
import useData from '../../hooks/useData';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  email: '',
  password: '',
};

const AdminLogin = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const { updateAdmin } = useData();
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
      body: JSON.stringify({ ...formValues, table: 'administratori' }),
    }).then(async (res) => {
      if (!res.ok) {
        setIsPending(false);
        setProblem('error');

        setTimeout(() => {
          setProblem(null);
        }, 1500);
      } else {
        const data = await res.json();

        if (data) {
          setProblem(null);
          sessionStorage.setItem('admin_token', data.accessToken);
          updateAdmin(data.accessToken);
          nav('/admin/dashboard');
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
      </S.Form>
    </S.box>
  );
};

export default AdminLogin;

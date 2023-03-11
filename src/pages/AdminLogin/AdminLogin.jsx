import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import * as S from './style';

const initialValues = {
  email: '',
  password: '',
};

const AdminLogin = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const handleFormSubmit = (e) => {
    e.preventDefault();
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
        />

        <S.button variant="contained" type="submit">
          Pievienoties
        </S.button>
      </S.Form>
    </S.box>
  );
};

export default AdminLogin;

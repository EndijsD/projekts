import { styled } from '@mui/system';
import { Box, Button, TextField, Typography } from '@mui/material';

export const box = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  background: url('Admin/AdminLogin.jpg') no-repeat;
  background-position: center;
  background-size: cover;
`;

export const Form = styled('form')`
  display: flex;
  flex-direction: column;
  padding: 4rem 3rem;

  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(15px);
`;

export const h1 = styled(Typography)`
  font-size: 2em;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  color: white;
`;

export const textField = styled(TextField)`
  width: 300px;
  margin-bottom: 2rem;
`;

export const button = styled(Button)`
  border-radius: 50px;
  font-weight: 700;
  background: white;
`;

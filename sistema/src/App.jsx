import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import UserNavBar from './components/UserNavBar';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminNavBar from './components/AdminNavBar';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import useData from './hooks/useData';
import { useState } from 'react';

function UserLayout() {
  return (
    <>
      <UserNavBar />
      <Outlet />
      <Footer />
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <AdminNavBar />
      <Outlet />
    </>
  );
}

const fixedTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const { mode } = useData();

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<UserLayout />}></Route>

          <Route path="/admin">
            <Route
              index
              element={
                <ThemeProvider theme={fixedTheme}>
                  <AdminLogin />
                </ThemeProvider>
              }
            />

            <Route path="dashboard" element={<AdminLayout />}></Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

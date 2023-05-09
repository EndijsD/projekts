import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import UserNavBar from './components/UserNavBar';
import UserFooter from './components/UserFooter';
import AdminLogin from './pages/AdminLogin';
import AdminNavBar from './components/AdminNavBar';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import useData from './hooks/useData';
import Dashboard from './pages/Dashboard';
import Data from './pages/Data';
import url from './url';
import NotFound from './components/NotFound';
import { useEffect, useState } from 'react';
import Main from './pages/Main';
import UserLogin from './pages/UserLogin/UserLogin';

function UserLayout() {
  return (
    <>
      <UserNavBar />
      <Outlet />
      <UserFooter />
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

const tableData = {
  orders: [
    { title: 'Visi pasūtījumi', link: url + 'pasutijumi', canAdd: false },
    {
      title: 'Pasūtījumu preču sasaistes tabula',
      link: url + 'pasutijumi_preces',
      canAdd: false,
    },
  ],
  products: [
    { title: 'Visas preces', link: url + 'preces', canAdd: true },
    {
      title: 'Visas preču specifikācijas',
      link: url + 'precu_specifikacija',
      canAdd: true,
    },
    {
      title: 'Preču specifikāciju un īpašību sasaistes tabula',
      link: url + 'precu_specifikacija_ipasibas',
      canAdd: true,
    },
    { title: 'Visas īpašības', link: url + 'ipasibas', canAdd: true },
  ],
  users: [
    { title: 'Visi lietotāji', link: url + 'lietotaji', canAdd: false },
    {
      title: 'Visi nereģistrētie klienti',
      link: url + 'neregistreti_klienti',
      canAdd: false,
    },
    { title: 'Visas adreses', link: url + 'adreses', canAdd: false },
  ],
  reviews: [
    { title: 'Visas atsauksmes', link: url + 'atsauksmes', canAdd: false },
  ],
};

const token = sessionStorage.getItem('token');

function App() {
  const { mode, admin, updateAdmin } = useData();
  const [isPending, setIsPending] = useState(token ? true : false);

  useEffect(() => {
    if (!admin && token) {
      fetch(url + 'auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) updateAdmin(token);
        setIsPending(false);
      });
    }
  }, []);

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
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Main />} />
            <Route path="login" element={<UserLogin />} />
          </Route>

          <Route path="/admin">
            <Route
              index
              element={
                <ThemeProvider theme={fixedTheme}>
                  <AdminLogin />
                </ThemeProvider>
              }
            />

            {admin ? (
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                {Object.keys(tableData).map((keys) => (
                  <Route
                    key={keys}
                    path={'/admin/' + keys}
                    element={<Data about={tableData[keys]} />}
                  />
                ))}
              </Route>
            ) : (
              <Route
                path="/admin/*"
                element={
                  !isPending && (
                    <NotFound desc="Jums nav piekļuve administrācijas sistēmai" />
                  )
                }
              />
            )}
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

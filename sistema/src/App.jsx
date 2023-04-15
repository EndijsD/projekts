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
import Dashboard from './pages/Dashboard';
import Data from './pages/Data';
import url from './url';

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

const tableData = {
  orders: [
    { title: 'Visi pasūtījumi', link: url + 'pasutijumi' },
    {
      title: 'Pasūtījumu preču sasaistes tabula',
      link: url + 'pasutijumi_preces',
    },
  ],
  products: [
    { title: 'Visas preces', link: url + 'preces' },
    { title: 'Visas preču specifikācijas', link: url + 'precu_specifikacija' },
    {
      title: 'Preču specifikāciju un īpašību sasaistes tabula',
      link: url + 'precu_specifikacija_ipasibas',
    },
    { title: 'Visas īpašības', link: url + 'ipasibas' },
  ],
  users: [
    { title: 'Visi lietotāji', link: url + 'lietotaji' },
    { title: 'Visi nereģistrētie klienti', link: url + 'neregistreti_klienti' },
    { title: 'Visas adreses', link: url + 'adreses' },
  ],
  reviews: [{ title: 'Visas atsauksmes', link: url + 'atsauksmes' }],
};

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
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

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
import { createTheme, ThemeProvider } from '@mui/material';

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
  return (
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
  );
}

export default App;

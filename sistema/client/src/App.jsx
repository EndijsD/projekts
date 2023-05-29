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
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Categories from './pages/Categories';
import Category from './pages/Category';
import SingleItem from './pages/SingleItem';
import Basket from './pages/Basket';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Search from './pages/Search';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';

function UserLayout({ isPendingUser }) {
  return (
    <>
      <UserNavBar isPendingUser={isPendingUser} />
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

const categoryData = [
  {
    title: 'Klasiskās ģitāras',
    link: 'classical',
    image: '/User/Categories/Common/classical.jpg',
  },
  {
    title: 'Akustiskās ģitāras',
    link: 'acoustic',
    image: '/User/Categories/Common/acoustic.jpg',
  },
  {
    title: 'Elektriskās ģitāras',
    link: 'electric',
    image: '/User/Categories/Common/electric.jpg',
  },
  {
    title: 'Basģitāras',
    link: 'bass',
    image: '/User/Categories/Common/bass.jpg',
  },
  {
    title: 'Ukuleles',
    link: 'ukuleles',
    image: '/User/Categories/Common/ukulele.jpg',
  },
];

const admin_token = sessionStorage.getItem('admin_token');
const user_token = localStorage.getItem('user_token');

function App() {
  const { mode, admin, updateAdmin, updateBasket, user, updateUser } =
    useData();
  const [isPendingAdmin, setIsPendingAdmin] = useState(
    admin_token ? true : false
  );
  const [isPendingUser, setIsPendingUser] = useState(user_token ? true : false);

  useEffect(() => {
    if (!admin && admin_token) {
      fetch(url + 'auth/verify', {
        headers: {
          Authorization: `Bearer ${admin_token}`,
        },
      }).then((res) => {
        if (res.ok) updateAdmin(admin_token);
      });
      setIsPendingAdmin(false);
    }

    if (!user && user_token) {
      fetch(url + 'auth/verify', {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      }).then((res) => {
        if (res.ok) updateUser(user_token);
      });
      setIsPendingUser(false);
    }

    const basket = localStorage.getItem('basket');
    basket && updateBasket(JSON.parse(basket));
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
          <Route
            path="/"
            element={<UserLayout isPendingUser={isPendingUser} />}
          >
            <Route index element={<Main />} />
            <Route path="login" element={<UserLogin />} />
            <Route path="register" element={<UserRegister />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="search" element={<Search />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route
              path="orders"
              element={
                isPendingUser || user ? (
                  <Orders />
                ) : (
                  <NotFound
                    desc="Lai piekļūtu pasūtījumu lapai,"
                    descButtonText="autorizējies"
                    desc2="!"
                    descButtonLink="/login"
                    displayButton
                    buttonText="Nav konts? Reģistrējies"
                    buttonLink="/register"
                  />
                )
              }
            />
            <Route
              path="profile"
              element={
                isPendingUser || user ? (
                  <Profile />
                ) : (
                  <NotFound
                    desc="Lai piekļūtu profila lapai,"
                    descButtonText="autorizējies"
                    desc2="!"
                    descButtonLink="/login"
                    displayButton
                    buttonText="Nav konts? Reģistrējies"
                    buttonLink="/register"
                  />
                )
              }
            />
            <Route
              path="categories"
              element={<Categories categoryData={categoryData} />}
            />
            {categoryData.map((obj) => (
              <Route
                key={obj.link}
                path={obj.link}
                element={<Category title={obj.title} />}
              />
            ))}
            <Route path="basket" element={<Basket />} />
            <Route path=":id" element={<SingleItem />} />
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
                  !isPendingAdmin && (
                    <NotFound
                      title="Atvainojiet,"
                      desc="Jums nav piekļuve administrācijas sistēmai"
                    />
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

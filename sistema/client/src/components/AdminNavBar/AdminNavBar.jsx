import {
  Toolbar,
  IconButton,
  List,
  Divider,
  useMediaQuery,
  Drawer,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { Menu, Brightness4, Brightness7 } from '@mui/icons-material';
import useData from '../../hooks/useData';

const pages = [
  { name: 'Pārskats', route: 'dashboard' },
  { name: 'Pasūtījumi', route: 'orders' },
  { name: 'Preces', route: 'products' },
  { name: 'Lietotāji', route: 'users' },
  { name: 'Atsauksmes', route: 'reviews' },
];

function AdminNavBar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const nav = useNavigate();
  const isAboveMedium = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const theme = useTheme();
  const { mode, changeMode, updateAdmin } = useData();

  const logout = () => {
    updateAdmin(null);
    sessionStorage.removeItem('admin_token');
    nav('/admin');
  };

  const switchDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  const navigate = (route) => {
    nav('/admin/' + route);
  };

  const navigateMobileDrawer = (route) => {
    switchDrawer();
    navigate(route);
  };

  useEffect(() => {
    if (isAboveMedium) {
      setOpenDrawer(false);
    }
  }, [isAboveMedium]);

  const switchMode = () => {
    const new_mode = mode == 'dark' ? 'light' : 'dark';
    changeMode(new_mode);
    localStorage.setItem('mode', new_mode);
  };

  return (
    <>
      <S.appBar>
        <Toolbar>
          <S.box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={switchDrawer} color="inherit">
              <Menu />
            </IconButton>
          </S.box>

          <S.box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <S.button key={page.name} onClick={() => navigate(page.route)}>
                {page.name}
              </S.button>
            ))}
          </S.box>

          <S.iconButton onClick={switchMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </S.iconButton>

          <IconButton onClick={logout}>
            <S.logoutIcon />
          </IconButton>
        </Toolbar>
      </S.appBar>

      <Drawer open={openDrawer} onClose={switchDrawer}>
        <Toolbar />
        <List>
          <Divider />
          {pages.map((page) => (
            <div key={page.name}>
              <S.listItemButton
                onClick={() => navigateMobileDrawer(page.route)}
              >
                {page.name}
              </S.listItemButton>
              <Divider />
            </div>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default AdminNavBar;

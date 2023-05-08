import {
  AppBar,
  Box,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useTheme,
} from '@mui/material';
import {
  Store,
  Search,
  Person,
  Brightness7,
  Brightness4,
  PersonOutline,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import useData from '../../hooks/useData';

function UserNavBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [settings, setSettings] = useState([
    { name: 'Autorizēties', route: 'login' },
    { name: 'Reģistrēties', route: 'register' },
  ]);
  const nav = useNavigate();
  const theme = useTheme();
  const { mode, changeMode, user, updateUser } = useData();
  const [searchText, setSearchText] = useState('');

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    handleCloseUserMenu();
    updateUser(null);
    sessionStorage.removeItem('user_token');
    nav('/login');
  };

  const switchMode = () => {
    changeMode(mode == 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (user) {
      setSettings([
        { name: 'Profils', route: 'profile' },
        { name: 'Pasūtījumi', route: 'orders' },
        { name: 'Iziet' },
      ]);
    } else {
      setSettings([
        { name: 'Autorizēties', route: 'login' },
        { name: 'Reģistrēties', route: 'register' },
      ]);
    }
  }, [user]);

  useEffect(() => {
    // console.log(searchText);
  }, [searchText]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <S.DesktopToolbar disableGutters>
          <Button
            sx={{
              color: theme.palette.mode == 'light' && 'white',
              p: 0,
              '&:hover': { backgroundColor: 'transparent' },
            }}
            disableRipple
            onClick={() => nav('/')}
          >
            <Store sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
              }}
            >
              VEIKALS
            </Typography>
          </Button>

          <S.Search>
            <S.SearchIconWrapper>
              <Search />
            </S.SearchIconWrapper>
            <S.StyledInputBase
              placeholder="Meklēt…"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </S.Search>

          <Box>
            <S.WhiteIconButton onClick={switchMode}>
              {theme.palette.mode === 'dark' ? (
                <Brightness7 />
              ) : (
                <Brightness4 />
              )}
            </S.WhiteIconButton>

            <S.WhiteIconButton onMouseEnter={handleOpenUserMenu}>
              {user ? <Person /> : <PersonOutline />}
            </S.WhiteIconButton>

            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={setting.route ? () => nav(setting.route) : logout}
                >
                  <Typography>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </S.DesktopToolbar>

        <S.MobileToolbar disableGutters>
          <S.StyledBox>
            <Button
              sx={{
                color: theme.palette.mode == 'light' && 'white',
                p: 0,
                '&:hover': { backgroundColor: 'transparent' },
              }}
              disableRipple
              onClick={() => nav('/')}
            >
              <Store sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                }}
              >
                VEIKALS
              </Typography>
            </Button>

            <Box>
              <S.WhiteIconButton onClick={switchMode}>
                {theme.palette.mode === 'dark' ? (
                  <Brightness7 />
                ) : (
                  <Brightness4 />
                )}
              </S.WhiteIconButton>

              <S.WhiteIconButton onMouseEnter={handleOpenUserMenu}>
                <Person />
              </S.WhiteIconButton>

              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={setting.route ? () => nav(setting.route) : logout}
                  >
                    <Typography>{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </S.StyledBox>

          <S.Search>
            <S.SearchIconWrapper>
              <Search />
            </S.SearchIconWrapper>
            <S.StyledInputBase
              placeholder="Meklēt…"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </S.Search>
        </S.MobileToolbar>
      </Container>
    </AppBar>
  );
}
export default UserNavBar;

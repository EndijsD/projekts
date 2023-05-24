import {
  AppBar,
  Typography,
  Menu,
  MenuItem,
  useTheme,
  Divider,
} from '@mui/material';
import {
  Store,
  Search,
  Person,
  Brightness7,
  Brightness4,
  PersonOutline,
  ShoppingCart,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './style';
import useData from '../../hooks/useData';
import { ClipLoader } from 'react-spinners';

function UserNavBar({ isPendingUser }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElBasket, setAnchorElBasket] = useState(null);
  const [settings, setSettings] = useState([
    { name: 'Autorizēties', route: 'login' },
    { name: 'Reģistrēties', route: 'register' },
  ]);
  const nav = useNavigate();
  const theme = useTheme();
  const { mode, changeMode, user, updateUser, basket, updateBasket } =
    useData();
  const [searchText, setSearchText] = useState('');
  const [priceHovered, setPriceHovered] = useState(false);
  const location = useLocation().pathname;

  const handleOpenUserMenu = (event) => {
    if (!isPendingUser) setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenBasketMenu = (event) => {
    setAnchorElBasket(event.currentTarget);
  };

  const handleCloseBasketMenu = () => {
    setAnchorElBasket(null);
  };

  const logout = () => {
    updateUser(null);
    localStorage.removeItem('user_token');
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

  const navigate = (route) => {
    if (route) {
      nav('/' + route);
    } else {
      logout();
    }
    handleCloseUserMenu();
    handleCloseBasketMenu();
  };

  const handleHoverShowcase = (id) => {
    setPriceHovered(true);

    const updatedBasket = basket.map((item) =>
      item.product.preces_id == id
        ? {
            ...item,
            count: item.count == 1 ? 'noņemt' : item.count - 1,
          }
        : item
    );

    updateBasket(updatedBasket);
  };

  const handleHoverShowcaseReset = () => {
    updateBasket(JSON.parse(localStorage.getItem('basket')));
    setPriceHovered(false);
  };

  const handleRemoveItem = (id) => {
    const tempBasket = JSON.parse(localStorage.getItem('basket'));

    let updatedBasket = tempBasket.map((item) =>
      item.product.preces_id == id && item.count != 1
        ? {
            ...item,
            count: item.count - 1,
          }
        : item.product.preces_id == id && item.count == 1
        ? null
        : item
    );
    const isNull = updatedBasket.filter((item) => item == null);
    updatedBasket = updatedBasket.filter((item) => item != null);

    localStorage.setItem('basket', JSON.stringify(updatedBasket));
    updateBasket(updatedBasket);

    isNull.length ? setPriceHovered(false) : handleHoverShowcase(id);
  };

  return (
    <AppBar position="sticky">
      <S.StyledContainer maxWidth="xl" location={location}>
        <S.StyledToolbar disableGutters location={location}>
          <S.StyledButton disableRipple onClick={() => nav('/')}>
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
          </S.StyledButton>

          {location != '/checkout' && (
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
          )}
          {location != '/checkout' && (
            <S.IconBox>
              <S.WhiteIconButton
                sx={{ cursor: 'default' }}
                onMouseEnter={handleOpenBasketMenu}
              >
                {basket.length ? <ShoppingCart /> : <ShoppingCartOutlined />}
              </S.WhiteIconButton>

              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElBasket}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElBasket)}
                onClose={handleCloseBasketMenu}
                disableScrollLock
                MenuListProps={{ onMouseLeave: handleCloseBasketMenu }}
              >
                {basket.length ? (
                  basket.map((item) => (
                    <div key={item.product.preces_id}>
                      <S.StyledMenuItem
                        disableRipple={priceHovered}
                        onClick={(e) =>
                          e.target.type != 'button' &&
                          nav('/' + item.product.preces_id)
                        }
                      >
                        <S.StyledMenuBox>
                          <S.ItemTitle>{item.product.nosaukums}</S.ItemTitle>
                          <S.StyledItemButton
                            onMouseEnter={() =>
                              handleHoverShowcase(item.product.preces_id)
                            }
                            onMouseLeave={handleHoverShowcaseReset}
                            onClick={() =>
                              handleRemoveItem(item.product.preces_id)
                            }
                          >
                            <S.ItemPriceCount>
                              {item.product.cena} € <sub>x {item.count}</sub>
                            </S.ItemPriceCount>
                          </S.StyledItemButton>
                        </S.StyledMenuBox>
                        <S.StyledImg src={item.product.attelu_celi[0]} />
                      </S.StyledMenuItem>
                      <Divider />
                    </div>
                  ))
                ) : (
                  <div>
                    <MenuItem
                      disableRipple
                      sx={{
                        '&:hover': { background: 'none' },
                        cursor: 'default',
                      }}
                    >
                      <Typography
                        textAlign="center"
                        minWidth={200}
                        padding="1rem"
                      >
                        Tavs grozs ir tukšs
                      </Typography>
                    </MenuItem>
                    <Divider />
                  </div>
                )}

                {Boolean(basket.length) && (
                  <MenuItem
                    disableRipple
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      '&:hover': { background: 'none' },
                      cursor: 'default',
                      background: priceHovered && 'rgb(200, 10, 10)',
                      color: priceHovered && 'white',
                    }}
                  >
                    <Typography fontStyle={priceHovered && 'italic'}>
                      Summa:{' '}
                      <b>
                        {basket
                          .reduce(
                            (sum, item) =>
                              sum +
                              Number(item.product.cena) *
                                (!isNaN(item.count) ? Number(item.count) : 0),
                            0
                          )
                          .toFixed(2)}{' '}
                        €
                      </b>
                    </Typography>
                  </MenuItem>
                )}
                {Boolean(basket.length) && <Divider />}

                <MenuItem
                  onClick={() => navigate('basket')}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    background: 'rgb(10, 100, 200)',
                    color: 'white',

                    '&:hover': {
                      background: 'rgb(10, 120, 200)',
                    },
                  }}
                >
                  <Typography fontWeight="bold">Apskatīt grozu</Typography>
                </MenuItem>

                {Boolean(basket.length) && <Divider />}
                {Boolean(basket.length) && (
                  <MenuItem
                    onClick={() => navigate('checkout')}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      background: 'rgb(255, 100, 10)',
                      color: 'white',

                      '&:hover': {
                        background: 'rgb(255, 120, 10)',
                      },
                    }}
                  >
                    <Typography fontWeight="bold">Pirkt</Typography>
                  </MenuItem>
                )}
              </Menu>

              <S.WhiteIconButton onClick={switchMode}>
                {theme.palette.mode === 'dark' ? (
                  <Brightness7 />
                ) : (
                  <Brightness4 />
                )}
              </S.WhiteIconButton>

              <S.WhiteIconButton
                sx={{ cursor: 'default' }}
                onMouseEnter={handleOpenUserMenu}
              >
                {isPendingUser ? (
                  <ClipLoader color="primary" />
                ) : user ? (
                  <Person />
                ) : (
                  <PersonOutline />
                )}
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
                disableScrollLock
                MenuListProps={{ onMouseLeave: handleCloseUserMenu }}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => navigate(setting.route)}
                  >
                    <Typography>{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </S.IconBox>
          )}
        </S.StyledToolbar>
      </S.StyledContainer>
    </AppBar>
  );
}
export default UserNavBar;

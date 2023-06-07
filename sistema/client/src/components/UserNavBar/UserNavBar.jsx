// Importē nepieciešamās komponentes, ikonas, funkcijas, stilus un āķus
import {
  AppBar,
  Typography,
  Menu,
  MenuItem,
  useTheme,
  Divider,
  Badge,
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

// Definē divus mainīgos
let listeningToSearch = false;
let originalLocation = '';

// Izveido jaunu funkciju/komponenti
function UserNavBar({ isPendingUser }) {
  // Definē nepieciešamos mainīgos
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElBasket, setAnchorElBasket] = useState(null);
  const [settings, setSettings] = useState([
    { name: 'Autorizēties', route: 'login' },
    { name: 'Reģistrēties', route: 'register' },
  ]);
  const nav = useNavigate();
  const theme = useTheme();
  const {
    mode,
    changeMode,
    user,
    updateUser,
    basket,
    updateBasket,
    updateSearch,
  } = useData();
  const [searchText, setSearchText] = useState('');
  const [priceHovered, setPriceHovered] = useState(false);
  const location = useLocation().pathname;

  // Tiek pielietots React āķis, padodot tam attiecīgo funkciju,
  // kurš veiks darbības, balstoties uz mainīgā izmaiņām
  useEffect(() => {
    // Ja mājaslapas atrašanās vieta nav "/search", tad nomaina mainīgo vērtību
    if (location != '/search') originalLocation = location;
  }, [location]);

  const handleOpenUserMenu = (event) => {
    // Ja ir lietotājs, tad nomaina mainīgā vērtību uz uzspiesto elementu
    if (!isPendingUser) setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    // Nomaina mainīgā vērtību uz null
    setAnchorElUser(null);
  };

  const handleOpenBasketMenu = (event) => {
    // Nomaina mainīgā vērtību uz uzspiesto elementu
    setAnchorElBasket(event.currentTarget);
  };

  const handleCloseBasketMenu = () => {
    // Nomaina mainīgā vērtību uz null
    setAnchorElBasket(null);
  };

  // Funkcija, priekš lietotāja izlogošanās
  const logout = () => {
    // Nomaina globālā "user" mainīgā vērtību uz null
    updateUser(null);
    // Noņem "user_token" atribūtu no pārlūkprogrammas lokālās atmiņas
    localStorage.removeItem('user_token');
    // Nomaina URL ceļu uz "/login"
    nav('/login');
  };

  // Funkcija, priekš motīva nomainīšanas
  const switchMode = () => {
    // Skatoties no iepriekšējās motīva vērtības, izveido jaunu mainīgo ar pretējo motīvu
    const new_mode = mode == 'dark' ? 'light' : 'dark';
    // Pārmaina globālā mainīgā "mode" vērtību uz jauno motīvu (mainīgais "new_mode")
    changeMode(new_mode);
    // Iestata pārlūkprogrammas lokālajā atmiņā atribūtu "mode" ar jaunā motīva vērtību (mainīgais "new_mode")
    localStorage.setItem('mode', new_mode);
  };

  // Tiek pielietots React āķis, padodot tam attiecīgo funkciju,
  // kurš veiks darbības, balstoties uz mainīgā izmaiņām
  useEffect(() => {
    // Ja ir lietotājs, tad nomaina iestatījumus, savādāk nomaina uz citiem iestatījumiem
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

  // Tiek pielietots React āķis, padodot tam attiecīgo funkciju,
  // kurš veiks darbības, balstoties uz mainīgā izmaiņām
  useEffect(() => {
    // Ja ir kaut kas ierakstīt meklēšanā un "listeningToSearch" ir nepatiess, tad nomaina mainīgā vērtību
    if (searchText && !listeningToSearch) listeningToSearch = true;

    if (listeningToSearch) {
      // Ja "listeningToSearch" ir patiess, tad atjauno globālo mainīgo "search"
      updateSearch(searchText);

      // Ja noņemot sākuma un beigu atstarpes, jelprojām ir teksts, tad izpildīt funkciju, kurai ir padota vērtība
      if (searchText.trim()) navigate('search');
      // Savādāk nomainīt URL ceļu uz "originalLocation", bet ja tāds nav, tad uz "/"
      else nav(originalLocation || '/');
    }
  }, [searchText]);

  // Funckija, priekš URL ceļa pārmainīšanas
  const navigate = (route) => {
    if (route) {
      // Ja ir padots ceļš, tad pārmainīt URL ceļu uz to
      nav('/' + route);
    } else {
      // Savādāk izsaukt izlogošanās funkciju
      logout();
    }
    // Izsaukt sekojošās divas funkcijas
    handleCloseUserMenu();
    handleCloseBasketMenu();
  };

  // Funkcija, priekš peles kursora uziešanas uz cenas
  const handleHoverShowcase = (id) => {
    // Nomaina mainīgā vērtību
    setPriceHovered(true);

    // Definē jaunu grozu, kur ir samazināta cena, uz kā peles kursors atrodas
    const updatedBasket = basket.map((item) =>
      item.product.preces_id == id
        ? {
            ...item,
            count: item.count == 1 ? 'noņemt' : item.count - 1,
          }
        : item
    );

    // Atjauno globālā "basket" mainīgā vērtību
    updateBasket(updatedBasket);
  };

  // Funkcija, priekš peles kursora nobīdīšanas no cenas
  const handleHoverShowcaseReset = () => {
    // Atjauno globālā "basket" mainīgā vērtību uz pārlūkprogrammas lokālās atmiņas "basket" atribūta vērtību
    updateBasket(JSON.parse(localStorage.getItem('basket')));
    // Nomaina mainīgā vērtību
    setPriceHovered(false);
  };

  // Funckija, priekš uzpiešanas uz cenas
  const handleRemoveItem = (id) => {
    // Definē jaunu mainīgo ar pārlūkprogrammas lokālās atmiņas "basket" atribūta vērtību
    const tempBasket = JSON.parse(localStorage.getItem('basket'));

    // Izveido mainīgo ar noņemtu skaitu uzpiestajai precei
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
    // Izveido mainīgo, kura vērtība ir masīvs ar nepatiess vērtībām, atkarībā vai "updatedBasket" ir null vērtības
    const isNull = updatedBasket.filter((item) => item == null);
    // Izveido mainīgo, ar izfiltrētām null vērtībām no "updatedBasket"
    updatedBasket = updatedBasket.filter((item) => item != null);

    // Iestata pārlūkprogrammas lokālās atmiņas "basket" atribūta vērtību
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
    // Atjauno globālo mainīgo
    updateBasket(updatedBasket);

    // Ja "isNull" masīvā ir kāda vērtība, tad izpildīt funkciju, savādāk izpildīt otro funkciju
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
                onKeyUp={(e) => e.key == 'Enter' && navigate('search')}
              />
            </S.Search>
          )}
          {location != '/checkout' && (
            <S.IconBox>
              <S.WhiteIconButton
                sx={{ cursor: 'default' }}
                onMouseEnter={handleOpenBasketMenu}
              >
                <Badge badgeContent={basket.length}>
                  {basket.length ? <ShoppingCart /> : <ShoppingCartOutlined />}
                </Badge>
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

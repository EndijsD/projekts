import { styled } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Button, IconButton, ListItemButton } from '@mui/material';

export const appBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  position: 'sticky',
}));

export const logoutIcon = styled(LogoutIcon)`
  color: white;
`;

export const listItemButton = styled(ListItemButton)`
  width: 200px;
`;

export const box = styled(Box)`
  flex-grow: 1;
`;

export const button = styled(Button)`
  color: white;
`;

export const iconButton = styled(IconButton)`
  color: inherit;
`;

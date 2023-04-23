import { styled } from '@mui/system';
import { Box, Button } from '@mui/material';
import { GridFooterContainer, GridToolbarContainer } from '@mui/x-data-grid';

export const StyledBox = styled(Box)`
  display: flex;
  justify-content: center;
`;

export const StyledButton = styled(Button)`
  margin-left: 8px;
`;

export const StyledGridFooterContainer = styled(GridFooterContainer)`
  flex-wrap: wrap;
`;

export const MUIGridToolbarContainer = styled(GridToolbarContainer)`
  justify-content: center;
`;

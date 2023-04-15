import { Box, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import useFetch from '../../hooks/useFetch';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import useColumns from './useColumns';

const DataItem = ({ link }) => {
  const [deletedRow, setDeletedRow] = useState(null);
  const { data, isPending, error } = useFetch(link, deletedRow);
  const { columns, setEditedRowID, setSelectedRowID } = useColumns(
    link,
    setDeletedRow
  );

  return (
    <Box>
      {!isPending && !error && (
        <DataGrid
          autoHeight={data.length < 7 ? true : false}
          rows={data}
          columns={columns}
          rowHeight={60}
          hideFooterSelectedRowCount
          getRowId={(row) =>
            row[Object.keys(row).filter((key) => key.includes('_id'))[0]]
          }
          pageSizeOptions={[10, 20, 30]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          sx={{
            height: 530,
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? grey[200] : grey[900],
            },
          }}
          onCellEditStop={(params) => setEditedRowID(params.id)}
          onRowClick={(params) => setSelectedRowID(params.id)}
          localeText={{
            columnHeaderSortIconLabel: 'Šķirot',
            columnMenuLabel: 'Opcijas',
            columnMenuSortAsc: 'Šķirot augoši',
            columnMenuSortDesc: 'Šķirot dilstoši',
            columnMenuUnsort: 'Nešķirot',
            columnMenuFilter: 'Filtrēt',
            columnMenuHideColumn: 'Paslēpt kolonnas',
            columnMenuManageColumns: 'Pārvaldīt kolonnas',
            filterPanelColumns: 'Kolonnas',
            filterPanelOperator: 'Operātors',
            filterPanelInputLabel: 'Vērtība',
            filterPanelDeleteIconLabel: 'Izdzēst',
            filterPanelInputPlaceholder: 'Filtrēšanas vērtība',
            filterOperatorIsEmpty: 'ir tukšs',
            filterOperatorIsNotEmpty: 'nav tukšs',
            filterOperatorIsAnyOf: 'ir jebkurš no',
            columnsPanelTextFieldLabel: 'Atrast kolonnu',
            columnsPanelTextFieldPlaceholder: 'Kolonnas nosaukums',
            columnsPanelShowAllButton: 'Rādīt visu',
            columnsPanelHideAllButton: 'Paslēpt visu',
            MuiTablePagination: {
              labelRowsPerPage: 'Rindas lapā:',
              labelDisplayedRows: ({ from, to, count }) =>
                `${from} - ${to} no ${count}`,
              getItemAriaLabel: (type) =>
                `Iet uz ${type == 'next' ? 'nākamo' : 'iepriekšējo'} lappusi`,
            },
          }}
        />
      )}
      {error && <Typography>{error}</Typography>}
    </Box>
  );
};

export default DataItem;

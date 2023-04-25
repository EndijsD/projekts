import { Typography, useTheme } from '@mui/material';
import { DataGrid, GridFooter, gridClasses } from '@mui/x-data-grid';
import useFetch from '../../hooks/useFetch';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import useColumns from '../../hooks/useColumns';
import * as S from './style';
import { HashLoader } from 'react-spinners';
import { Add } from '@mui/icons-material';
import moment from 'moment';

const DataItem = ({ link, canAdd }) => {
  const [modifiedRow, setModifiedRow] = useState(false);
  const { data, isPending, error, setData, initialLoad } = useFetch(
    link,
    modifiedRow
  );
  const { columns, setEditedRowIDs, setSelectedRowID } = useColumns(
    link,
    setModifiedRow
  );
  const theme = useTheme();

  function CustomFooter() {
    const handleShowNew = () => {
      const keys = Object.keys(data[0]);

      if (data[0][keys.filter((key) => key.includes('_id'))[0]] !== 'AUTO') {
        const emptyEntry = {};

        keys.map((key) =>
          key.includes('_id')
            ? (emptyEntry[key] = 'AUTO')
            : key == 'izveidosanas_datums'
            ? (emptyEntry[key] = moment().format('YYYY-MM-DD HH:mm:ss'))
            : (emptyEntry[key] = '')
        );

        setData((prev) => [emptyEntry, ...prev]);
      }
    };

    return (
      <S.StyledGridFooterContainer sx={{ justifyContent: !canAdd && 'end' }}>
        {canAdd && (
          <S.StyledButton
            color="primary"
            startIcon={<Add />}
            onClick={handleShowNew}
          >
            Pievienot
          </S.StyledButton>
        )}

        <GridFooter
          sx={{
            border: 'none',
          }}
        />
      </S.StyledGridFooterContainer>
    );
  }

  function CustomToolbar() {
    if (!initialLoad && isPending) {
      return (
        <S.MUIGridToolbarContainer>
          <HashLoader color={theme.palette.primary.main} />
        </S.MUIGridToolbarContainer>
      );
    }
  }

  return (
    <>
      {!initialLoad && !error && (
        <DataGrid
          autoHeight={data.length < 7 ? true : false}
          rows={data}
          columns={columns}
          rowHeight={60}
          hideFooterSelectedRowCount
          getRowId={(row) =>
            /* Lai nebūtu obligāti jātaisa katrā tabulā savs ID lauks varētu arī izmantot nejaušu UUID - https://www.npmjs.com/package/uuid */
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
          onCellEditStop={(params) =>
            setEditedRowIDs((prev) => [...prev, params.id])
          }
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
          slots={{ toolbar: CustomToolbar, footer: CustomFooter }}
        />
      )}
      {error && <Typography>{error}</Typography>}
      {initialLoad && (
        <S.StyledBox>
          <HashLoader color={theme.palette.primary.main} />
        </S.StyledBox>
      )}
    </>
  );
};

export default DataItem;

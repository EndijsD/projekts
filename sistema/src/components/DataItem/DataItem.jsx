import { Box, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import useFetch from '../../hooks/useFetch';
import url from '../../url';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import { useMemo, useState } from 'react';
import Actions from '../Actions';
import useColumns from './useColumns';

const DataItem = ({ link }) => {
  const { data, isPending, error } = useFetch(link);
  const { columns, setEditedRowID, setSelectedRowID } = useColumns(link);
  // const [editedRowID, setEditedRowID] = useState(null);
  // const [selectedRowID, setSelectedRowID] = useState(null);

  // const columns = useMemo(
  //   () => [
  //     { field: 'pasutijumi_id', headerName: 'ID', width: 70 },
  //     {
  //       field: 'id_lietotaji',
  //       headerName: 'Lietotāji ID',
  //       type: 'number',
  //       editable: true,
  //     },
  //     {
  //       field: 'id_neregistreti_klienti',
  //       headerName: 'Nereģistrēti Klienti ID',
  //       width: 150,
  //       type: 'number',
  //       editable: true,
  //     },
  //     {
  //       field: 'status',
  //       headerName: 'Status',
  //       width: 160,
  //       type: 'singleSelect',
  //       valueOptions: [
  //         'Gaida apmaksu',
  //         'Sagatavo izsūtīšanai',
  //         'Izsūtīts',
  //         'Izpildīts',
  //       ],
  //       editable: true,
  //     },
  //     {
  //       field: 'izveidosanas_datums',
  //       headerName: 'Izveidošanas Datums',
  //       width: 160,
  //       valueFormatter: (params) =>
  //         moment(params.value).format('YYYY-MM-DD HH:mm:ss'),
  //     },
  //     {
  //       field: 'actions',
  //       headerName: 'Actions',
  //       type: 'actions',
  //       renderCell: (params) => (
  //         <Actions
  //           {...{
  //             params,
  //             editedRowID,
  //             setEditedRowID,
  //             selectedRowID,
  //             setSelectedRowID,
  //           }}
  //         />
  //       ),
  //     },
  //   ],
  //   [editedRowID, selectedRowID]
  // );

  return (
    <Box>
      {!isPending && !error && (
        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
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
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? grey[200] : grey[900],
            },
          }}
          onCellEditStop={(params) => setEditedRowID(params.id)}
          onRowClick={(params) => setSelectedRowID(params.id)}
        />
      )}
      {error && <Typography>{error}</Typography>}
    </Box>
  );
};

export default DataItem;

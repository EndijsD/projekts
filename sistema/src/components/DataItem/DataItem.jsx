import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// import { Delete } from '@mui/icons-material/Delete';
import useFetch from '../../hooks/useFetch';
import url from '../../url';
import moment from 'moment';

const DataItem = () => {
  const { data, isPending, error } = useFetch(url);

  const columns = [
    { field: 'pasutijumi_id', headerName: 'ID' },
    { field: 'id_lietotaji', headerName: 'Lietotāji ID' },
    {
      field: 'id_neregistreti_klienti',
      headerName: 'Nereģistrēti Klienti ID',
    },
    {
      field: 'status',
      headerName: 'Status',
    },
    {
      field: 'izveidosanas_datums',
      headerName: 'Izveidošanas Datums',
      width: 200,
      renderCell: (params) =>
        moment(params.row.izveidosanas_datums).format('YYYY-MM-DD HH:MM:SS'),
    },
  ];

  return (
    <Box>
      {!isPending && (
        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
          getRowId={(row) => row.pasutijumi_id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
      {/* <Tooltip title="Delete">
        <IconButton>
          <Delete />
        </IconButton>
      </Tooltip> */}
    </Box>
  );
};

export default DataItem;

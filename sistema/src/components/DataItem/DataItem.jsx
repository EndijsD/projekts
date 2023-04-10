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

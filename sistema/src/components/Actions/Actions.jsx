import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Delete, Save } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const Actions = ({
  params,
  editedRowID,
  setEditedRowID,
  selectedRowID,
  setSelectedRowID,
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleEdit = async () => {
    setLoading(true);
    console.log('Updated entry: ' + params.id);

    // const { role, active, _id } = params.row;
    // const result = await updateStatus({ role, active }, _id, dispatch);
    // if (result) {
    //   setSuccess(true);
    //   setEditedRowID(null);
    // }

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEditedRowID(null);
      setTimeout(() => {
        setSuccess(false);
      }, 1500);
    }, 1500);
  };

  const handleDelete = () => {
    console.log('Deleted entry: ' + params.id);
    setSelectedRowID(null);
  };

  useEffect(() => {
    if (editedRowID === params.id && success) setSuccess(false);
  }, [editedRowID]);

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== editedRowID || loading}
          onClick={handleEdit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}

      <Fab
        color="primary"
        sx={{
          marginLeft: 1,
          width: 40,
          height: 40,
        }}
        disabled={params.id !== selectedRowID || loading}
        onClick={handleDelete}
      >
        <Delete />
      </Fab>
    </Box>
  );
};

export default Actions;

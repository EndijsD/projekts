import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Close, Delete, Save } from '@mui/icons-material';
import { green, red } from '@mui/material/colors';

const Actions = ({
  params,
  editedRowID,
  setEditedRowID,
  selectedRowID,
  setSelectedRowID,
  link,
  setDeletedRow,
}) => {
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveFailure, setSaveFailure] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteFailure, setDeleteFailure] = useState(false);

  const handleEdit = async () => {
    setSaveLoading(true);

    fetch(link + '/' + params.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params.row),
    }).then((res) => {
      setSaveLoading(false);
      setEditedRowID(null);

      if (!res.ok) {
        setSaveFailure(true);

        setTimeout(() => {
          setSaveFailure(false);
        }, 1500);
      } else {
        setSaveSuccess(true);

        setTimeout(() => {
          setSaveSuccess(false);
        }, 1500);
      }
    });
  };

  const handleDelete = () => {
    setDeleteLoading(true);

    fetch(link + '/' + params.id, {
      method: 'DELETE',
    }).then((res) => {
      setDeleteLoading(false);
      setSelectedRowID(null);

      if (!res.ok) {
        setDeleteFailure(true);

        setTimeout(() => {
          setDeleteFailure(false);
        }, 1500);
      } else {
        setDeletedRow(params.id);
      }
    });
  };

  useEffect(() => {
    if (editedRowID === params.id && saveSuccess) setSaveSuccess(false);
  }, [editedRowID]);

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {saveFailure ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: red[500],
            '&:hover': { bgcolor: red[700] },
          }}
        >
          <Close />
        </Fab>
      ) : saveSuccess ? (
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
          disabled={params.id !== editedRowID || saveLoading || deleteLoading}
          onClick={handleEdit}
        >
          <Save />
        </Fab>
      )}
      {saveLoading && (
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
      {deleteFailure ? (
        <Fab
          color="primary"
          sx={{
            marginLeft: 1,
            width: 40,
            height: 40,
            bgcolor: red[500],
            '&:hover': { bgcolor: red[700] },
          }}
        >
          <Close />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            marginLeft: 1,
            width: 40,
            height: 40,
          }}
          disabled={params.id !== selectedRowID || deleteLoading || saveLoading}
          onClick={handleDelete}
        >
          <Delete />
        </Fab>
      )}
      {deleteLoading && (
        <CircularProgress
          size={52}
          sx={{
            color: red[500],
            position: 'absolute',
            top: -6,
            left: 42,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default Actions;

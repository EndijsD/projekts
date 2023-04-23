import { CircularProgress, Fab } from '@mui/material';
import { useState } from 'react';
import { Check, Close, Delete, Save, Cancel } from '@mui/icons-material';
import { green, red } from '@mui/material/colors';
import * as S from './style';

const Actions = ({
  params,
  editedRowIDs,
  setEditedRowIDs,
  selectedRowID,
  setSelectedRowID,
  link,
  setModifiedRow,
}) => {
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveFailure, setSaveFailure] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteFailure, setDeleteFailure] = useState(false);

  const handleEdit = () => {
    setSaveLoading(true);

    fetch(link + '/' + params.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params.row),
    }).then((res) => {
      setSaveLoading(false);
      setEditedRowIDs([]);

      if (!res.ok) {
        setSaveFailure(true);

        setTimeout(() => {
          setSaveFailure(false);
        }, 1500);
      } else {
        setSaveSuccess(true);
        setModifiedRow((prev) => !prev);

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
        setModifiedRow((prev) => !prev);
        setDeleteSuccess(true);
      }
    });
  };

  const handleSave = () => {
    setSaveLoading(true);
    const entryWithoutID = Object.assign({}, params.row);

    delete entryWithoutID[
      Object.keys(entryWithoutID).filter((key) => key.includes('_id'))
    ];
    Object.keys(entryWithoutID).forEach((key) =>
      entryWithoutID[key] == '' ? (entryWithoutID[key] = null) : false
    );

    fetch(link, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entryWithoutID),
    }).then((res) => {
      setSaveLoading(false);
      setEditedRowIDs([]);
      setSelectedRowID(null);

      if (!res.ok) {
        setSaveFailure(true);

        setTimeout(() => {
          setSaveFailure(false);
        }, 1500);
      } else {
        setModifiedRow((prev) => !prev);
        setSaveSuccess(true);
      }
    });
  };

  const handleCancel = () => {
    setEditedRowIDs([]);
    setSelectedRowID(null);
    setModifiedRow((prev) => !prev);
    setDeleteSuccess(true);

    setTimeout(() => {
      setDeleteSuccess(false);
    }, 1500);
  };

  return (
    <S.MUIBox>
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
          disabled={
            !editedRowIDs.includes(params.id) || saveLoading || deleteLoading
          }
          onClick={params.id == 'AUTO' ? handleSave : handleEdit}
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
      ) : deleteSuccess ? (
        <Fab
          color="primary"
          sx={{
            marginLeft: 1,
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
            marginLeft: 1,
            width: 40,
            height: 40,
          }}
          disabled={
            saveLoading ||
            deleteLoading ||
            deleteSuccess ||
            (!editedRowIDs.includes(params.id) && params.id !== selectedRowID)
          }
          onClick={
            editedRowIDs.includes(params.id) || params.id == 'AUTO'
              ? handleCancel
              : handleDelete
          }
        >
          {editedRowIDs.includes(params.id) || params.id == 'AUTO' ? (
            <Cancel />
          ) : (
            <Delete />
          )}
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
    </S.MUIBox>
  );
};

export default Actions;

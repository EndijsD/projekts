import moment from 'moment';
import { useMemo, useState } from 'react';
import Actions from '../Actions';

const useColumns = (link, setDeletedRow) => {
  const [editedRowID, setEditedRowID] = useState(null);
  const [selectedRowID, setSelectedRowID] = useState(null);

  const columns = useMemo(() => {
    switch (link.slice(link.lastIndexOf('/') + 1)) {
      case 'pasutijumi':
        return [
          { field: 'pasutijumi_id', headerName: 'ID', width: 70 },
          {
            field: 'id_lietotaji',
            headerName: 'Lietotāji ID',
            type: 'number',
            editable: true,
          },
          {
            field: 'id_neregistreti_klienti',
            headerName: 'Nereģistrēti Klienti ID',
            width: 150,
            type: 'number',
            editable: true,
          },
          {
            field: 'status',
            headerName: 'Status',
            width: 160,
            type: 'singleSelect',
            valueOptions: [
              'Gaida apmaksu',
              'Sagatavo izsūtīšanai',
              'Izsūtīts',
              'Izpildīts',
            ],
            editable: true,
          },
          {
            field: 'izveidosanas_datums',
            headerName: 'Izveidošanas Datums',
            width: 160,
            valueFormatter: (params) =>
              moment(params.value).format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            field: 'actions',
            headerName: 'Darbības',
            type: 'actions',
            renderCell: (params) => (
              <Actions
                {...{
                  params,
                  editedRowID,
                  setEditedRowID,
                  selectedRowID,
                  setSelectedRowID,
                  link,
                  setDeletedRow,
                }}
              />
            ),
          },
        ];
      case 'pasutijumi_preces':
        return [
          { field: 'pasutijumi_preces_id', headerName: 'ID', width: 70 },
          {
            field: 'id_pasutijumi',
            headerName: 'Pasūtījumi ID',
            type: 'number',
            editable: true,
          },
          {
            field: 'id_preces',
            headerName: 'Preces ID',
            type: 'number',
            editable: true,
          },
          {
            field: 'skaits',
            headerName: 'Skaits',
            type: 'number',
            editable: true,
          },
          {
            field: 'actions',
            headerName: 'Darbības',
            type: 'actions',
            renderCell: (params) => (
              <Actions
                {...{
                  params,
                  editedRowID,
                  setEditedRowID,
                  selectedRowID,
                  setSelectedRowID,
                  link,
                  setDeletedRow,
                }}
              />
            ),
          },
        ];
    }
  }, [editedRowID, selectedRowID]);

  return { columns, setEditedRowID, setSelectedRowID };
};

export default useColumns;

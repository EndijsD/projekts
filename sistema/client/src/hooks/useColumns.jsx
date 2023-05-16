import moment from 'moment';
import { useMemo, useState } from 'react';
import Actions from '../components/Actions';

const useColumns = (link, setModifiedRow) => {
  const [editedRowIDs, setEditedRowIDs] = useState([]);
  const [selectedRowID, setSelectedRowID] = useState(null);

  const columns = useMemo(() => {
    switch (link.slice(link.lastIndexOf('/') + 1)) {
      case 'pasutijumi':
        return [
          { field: 'pasutijumi_id', headerName: 'ID', minWidth: 70, flex: 1 },
          {
            field: 'id_lietotaji',
            headerName: 'Lietotāji ID',
            type: 'number',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'id_neregistreti_klienti',
            headerName: 'Nereģistrēti klienti ID',
            minWidth: 150,
            type: 'number',
            editable: true,
            flex: 1,
          },
          {
            field: 'status',
            headerName: 'Status',
            minWidth: 160,
            type: 'singleSelect',
            valueOptions: [
              'Gaida apmaksu',
              'Sagatavo izsūtīšanai',
              'Izsūtīts',
              'Izpildīts',
              'Atcelts',
            ],
            editable: true,
            flex: 1,
          },
          {
            field: 'izveidosanas_datums',
            headerName: 'Izveidošanas datums',
            minWidth: 160,
            valueGetter: (params) =>
              moment(params.value).format('YYYY-MM-DD HH:mm:ss'),
            flex: 1,
          },
          {
            field: 'actions',
            headerName: 'Darbības',
            type: 'actions',
            renderCell: (params) => (
              <Actions
                {...{
                  params,
                  editedRowIDs,
                  setEditedRowIDs,
                  selectedRowID,
                  setSelectedRowID,
                  link,
                  setModifiedRow,
                }}
              />
            ),
            minWidth: 100,
            flex: 1,
          },
        ];
      case 'pasutijumi_preces':
        return [
          {
            field: 'pasutijumi_preces_id',
            headerName: 'ID',
            minWidth: 70,
            flex: 1,
          },
          {
            field: 'id_pasutijumi',
            headerName: 'Pasūtījumi ID',
            type: 'number',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'id_preces',
            headerName: 'Preces ID',
            type: 'number',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'skaits',
            headerName: 'Skaits',
            type: 'number',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'actions',
            headerName: 'Darbības',
            type: 'actions',
            renderCell: (params) => (
              <Actions
                {...{
                  params,
                  editedRowIDs,
                  setEditedRowIDs,
                  selectedRowID,
                  setSelectedRowID,
                  link,
                  setModifiedRow,
                }}
              />
            ),
            minWidth: 100,
            flex: 1,
          },
        ];
      case 'preces':
        return [
          { field: 'preces_id', headerName: 'ID', minWidth: 70, flex: 1 },
          {
            field: 'nosaukums',
            headerName: 'Nosaukums',
            editable: true,
            minWidth: 200,
            flex: 3,
          },
          {
            field: 'cena',
            headerName: 'Cena',
            editable: true,
            minWidth: 100,
            valueFormatter: (params) => params.value + ' €',
            flex: 1,
          },
          {
            field: 'pieejamiba',
            headerName: 'Pieejamība',
            type: 'number',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'attelu_celi',
            headerName: 'Attēlu ceļi',
            editable: true,
            minWidth: 100,
            valueGetter: (params) => JSON.stringify(params.value),
            flex: 2,
          },
          {
            field: 'pievienosanas_datums',
            headerName: 'Pievienošanas datums',
            minWidth: 160,
            valueGetter: (params) =>
              moment(params.value).format('YYYY-MM-DD HH:mm:ss'),
            flex: 1,
          },
          {
            field: 'id_precu_specifikacija',
            headerName: 'Preču specifikācijas ID',
            type: 'number',
            editable: true,
            minWidth: 160,
            flex: 1,
          },
          {
            field: 'actions',
            headerName: 'Darbības',
            type: 'actions',
            renderCell: (params) => (
              <Actions
                {...{
                  params,
                  editedRowIDs,
                  setEditedRowIDs,
                  selectedRowID,
                  setSelectedRowID,
                  link,
                  setModifiedRow,
                }}
              />
            ),
            minWidth: 100,
            flex: 1,
          },
        ];
      case 'precu_specifikacija':
        return [
          {
            field: 'precu_specifikacija_id',
            headerName: 'ID',
            minWidth: 70,
            flex: 1,
          },
          {
            field: 'kategorija',
            headerName: 'Kategorija',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'razotajs',
            headerName: 'Ražotājs',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'modelis',
            headerName: 'Modelis',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'ipasibas',
            headerName: 'Īpašības',
            editable: true,
            minWidth: 100,
            valueGetter: (params) => JSON.stringify(params.value),
            flex: 3,
          },
          {
            field: 'actions',
            headerName: 'Darbības',
            type: 'actions',
            renderCell: (params) => (
              <Actions
                {...{
                  params,
                  editedRowIDs,
                  setEditedRowIDs,
                  selectedRowID,
                  setSelectedRowID,
                  link,
                  setModifiedRow,
                }}
              />
            ),
            minWidth: 100,
            flex: 1,
          },
        ];
      case 'lietotaji':
        return [
          { field: 'lietotaji_id', headerName: 'ID', minWidth: 70, flex: 1 },
          {
            field: 'vards',
            headerName: 'Vārds',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'uzvards',
            headerName: 'Uzvārds',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'talrunis',
            headerName: 'Tālrunis',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'epasts',
            headerName: 'E-pasts',
            editable: true,
            minWidth: 160,
            flex: 3,
          },
          {
            field: 'parole',
            headerName: 'Parole',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'izveidosanas_datums',
            headerName: 'Izveidošanas datums',
            minWidth: 160,
            valueGetter: (params) =>
              moment(params.value).format('YYYY-MM-DD HH:mm:ss'),
            flex: 1,
          },
          {
            field: 'id_adreses',
            headerName: 'Adreses ID',
            type: 'number',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'actions',
            headerName: 'Darbības',
            type: 'actions',
            renderCell: (params) => (
              <Actions
                {...{
                  params,
                  editedRowIDs,
                  setEditedRowIDs,
                  selectedRowID,
                  setSelectedRowID,
                  link,
                  setModifiedRow,
                }}
              />
            ),
            minWidth: 100,
            flex: 1,
          },
        ];
      case 'neregistreti_klienti':
        return [
          {
            field: 'neregistreti_klienti_id',
            headerName: 'ID',
            minWidth: 70,
            flex: 1,
          },
          {
            field: 'vards',
            headerName: 'Vārds',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'uzvards',
            headerName: 'Uzvārds',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'talrunis',
            headerName: 'Tālrunis',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'epasts',
            headerName: 'E-pasts',
            editable: true,
            minWidth: 160,
            flex: 2,
          },
          {
            field: 'id_adreses',
            headerName: 'Adreses ID',
            type: 'number',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'actions',
            headerName: 'Darbības',
            type: 'actions',
            renderCell: (params) => (
              <Actions
                {...{
                  params,
                  editedRowIDs,
                  setEditedRowIDs,
                  selectedRowID,
                  setSelectedRowID,
                  link,
                  setModifiedRow,
                }}
              />
            ),
            minWidth: 100,
            flex: 1,
          },
        ];
      case 'adreses':
        return [
          { field: 'adreses_id', headerName: 'ID', minWidth: 70, flex: 1 },
          {
            field: 'pasta_indekss',
            headerName: 'Pasta indekss',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'pilseta',
            headerName: 'Pilsēta',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'novads',
            headerName: 'Novads',
            editable: true,
            minWidth: 100,
            flex: 2,
          },
          {
            field: 'pagasts',
            headerName: 'Pagasts',
            editable: true,
            minWidth: 100,
            flex: 2,
          },
          {
            field: 'iela',
            headerName: 'Iela',
            editable: true,
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'majas_nos',
            headerName: 'Mājas nosaukums',
            editable: true,
            minWidth: 140,
            flex: 1,
          },
          {
            field: 'dzivokla_nr',
            headerName: 'Dzīvokļa numurs',
            editable: true,
            minWidth: 130,
            flex: 1,
          },
          {
            field: 'actions',
            headerName: 'Darbības',
            type: 'actions',
            renderCell: (params) => (
              <Actions
                {...{
                  params,
                  editedRowIDs,
                  setEditedRowIDs,
                  selectedRowID,
                  setSelectedRowID,
                  link,
                  setModifiedRow,
                }}
              />
            ),
            minWidth: 100,
            flex: 1,
          },
        ];
      case 'atsauksmes':
        return [
          { field: 'atsauksmes_id', headerName: 'ID', minWidth: 70, flex: 1 },
          {
            field: 'izveidosanas_datums',
            headerName: 'Izveidošanas datums',
            minWidth: 160,
            valueGetter: (params) =>
              moment(params.value).format('YYYY-MM-DD HH:mm:ss'),
            flex: 1,
          },
          {
            field: 'vertejums',
            headerName: 'Vērtējums',
            type: 'number',
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'komentars',
            headerName: 'Komentārs',
            minWidth: 200,
            flex: 3,
          },
          {
            field: 'id_preces',
            headerName: 'Preces ID',
            type: 'number',
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'id_lietotaji',
            headerName: 'Lietotāja ID',
            type: 'number',
            minWidth: 100,
            flex: 1,
          },
          {
            field: 'actions',
            headerName: 'Darbības',
            type: 'actions',
            renderCell: (params) => (
              <Actions
                {...{
                  params,
                  editedRowIDs,
                  setEditedRowIDs,
                  selectedRowID,
                  setSelectedRowID,
                  link,
                  setModifiedRow,
                }}
              />
            ),
            minWidth: 100,
            flex: 1,
          },
        ];
    }
  }, [editedRowIDs, selectedRowID]);

  return { columns, setEditedRowIDs, setSelectedRowID };
};

export default useColumns;

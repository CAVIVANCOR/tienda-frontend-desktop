/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import FichaVentasModal from './FichaVentasModal';
import { setResults } from '../../../redux/features/task/inicio';
import AddIcon from '@mui/icons-material/Add';

function ListaVentasTableGrid() {
    const results = useSelector((state) => state.inicio.results);
    const dispatch = useDispatch();
    const [tableData, setTableData] = useState([]);
    const [tableColumns, setTableColumns] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [fichaDataVentas, setFichaDataVentas] = useState({});

    useEffect(() => {
        prepararDataCabVentas();
    }, [results]);
    const prepararDataCabVentas = async() => {
        let dataPreparada = results.map((venta) => {
            let total = venta.DetVentas.reduce((prev, curr) => prev + +curr.pvTotalMN, 0);
            let totalFormateado = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(total); // Formatear el campo total como "999,999.00"
            //let totalFormateado = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'USD' }).format(total);
            return {
                id: +venta.id,
                serie: venta.serieDcmto,
                num: venta.correlativoDcmto,
                fecha: venta.fecha,
                cliente: venta.ClienteProveedor.razonSocial,
                pvtotal: totalFormateado,
                };
            });
        let columns = Object.keys(dataPreparada[0]).map((key) => {
            let anchoColumna = 0;
            let anchoMinimo = 0;
            switch (key) {
                case 'id':
                    anchoMinimo= 90;
                    anchoColumna = 0.5; 
                    break;
                case 'serie':
                    anchoMinimo= 90;
                    anchoColumna = 0.5;
                    break;
                case 'num':
                    anchoMinimo= 90;
                    anchoColumna = 0.5;
                    break;
                case 'fecha':
                    anchoMinimo= 100;
                    anchoColumna = 0.5;
                    break;
                case 'cliente':
                    anchoMinimo= 90;
                    anchoColumna = 2;
                    break;
                case 'pvtotal':
                    anchoMinimo= 90;
                    anchoColumna = 0.5; 
                return {
                        field: key,
                        headerName: key,
                        minWidth: anchoMinimo,
                        flex:anchoColumna,
                        editable: false,
                        valueFormatter: (params) => `${params.value}`,
                        align: 'right',
                        renderCell: (params) => (<div style={{ textAlign: 'right' }}>{params.value}</div>),
                        headerAlign: 'center',
                    };
            }
            return {
                field: key,
                headerName: key,
                minWidth: anchoMinimo,
                flex:anchoColumna,
                editable: false,
                align: 'center',
                headerAlign: 'center',
            };
        });

        columns.push({
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            cellClassName: 'actions',
            minWidth: 140,
            flex: 0.5,
            align: 'left',
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEdit(params.row)}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row)}>
                        <Delete />
                    </IconButton>
                    <IconButton onClick={() => handleShow(params.row)}>
                        <Visibility />
                    </IconButton>
                </>
            ),
        });
        setTableData(dataPreparada);
        setTableColumns(columns);
    };
    const handleEdit =  (row) => {
        openEditModal(); // Llama a la función openEditModal para abrir el modal de edición
        setFichaDataVentas(results.find(objeto => +objeto.id === +row.id));
    };
    const handleDelete = (row) => {
        console.log("row", row.id);
    };
    const handleShow = (row) => {
        console.log("row", row.id);
    };
    const openEditModal = () => {
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        console.log("Entro closeEditModal",fichaDataVentas);
        if (fichaDataVentas){
            let updatedArray = [...results];
            console.log("updatedArray antes",updatedArray);
            let indiceDataVentas=updatedArray.findIndex(obj => +obj.id === +fichaDataVentas.id);
            updatedArray[indiceDataVentas]=fichaDataVentas;
            console.log("updatedArray despues",updatedArray);
            dispatch(setResults(updatedArray));
            setFichaDataVentas({});
        }
    };
    const handleSelectionChange = (newSelection) => {
        setSelectedRows(newSelection);
    };
    function EditToolbar(props) {
        const { setTableData, setFichaDataVentas } = props;
        const handleClick = () => {
            const id = Math.floor(Math.random() * 10000);
            setTableData((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
            setFichaDataVentas((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
        };
        return (
        <GridToolbarContainer>
            <Button sx={{ m: 1 }} variant="contained" color="success" startIcon={<AddIcon />} onClick={handleClick}>Nueva Venta</Button>
        </GridToolbarContainer>
        );
    }
    return (
            <Box ml={1} sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: '100%', height: '100%'}}>
                <DataGrid 
                    rows={tableData} 
                    columns={tableColumns}
                    sx={{ width: '100%', height: '100%', backgroundColor: 'white', boxShadow:5, borderRadius: 2, border:3, borderColor:'primary.main', "& .MuiDataGrid-columnHeaders": { backgroundColor: 'primary.main', color: 'white' } }}
                    density='compact'
                    rowSelectionModel={selectedRows}
                    onRowSelectionModelChange={handleSelectionChange}
                    initialState={{
                        pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 20,30,40,50]}
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    slotProps={{
                        toolbar: { setTableData, setFichaDataVentas  },
                    }}
                />
                {isEditModalOpen && (
                    <FichaVentasModal 
                        isOpen={isEditModalOpen}
                        onClose={() => closeEditModal()}
                        setSelectedRows={setSelectedRows}
                        fichaDataVentas={fichaDataVentas}
                        setFichaDataVentas={setFichaDataVentas}
                    />
                )}
            </Box>
    )
}
export default ListaVentasTableGrid;
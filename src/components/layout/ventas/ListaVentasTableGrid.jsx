/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import './ListaVentasTableGrid.css';
import FichaVentasModal from './FichaVentasModal';
import { setResults } from '../../../redux/features/task/inicio';

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
            switch (key) {
                case 'id':
                    anchoColumna = 120; 
                    break;
                case 'serie':
                    anchoColumna = 120; 
                    break;
                case 'num':
                    anchoColumna = 120; 
                    break;
                case 'fecha':
                    anchoColumna = 120; 
                    break;
                case 'cliente':
                    anchoColumna = 250; 
                    break;
                case 'pvtotal':
                    anchoColumna = 120; 
                    return {
                        field: key,
                        headerName: key,
                        width: anchoColumna,
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
                width: anchoColumna,
                editable: false,
                align: 'center',
                headerAlign: 'center',
            };
        });

        columns.push({
            field: 'actions',
            headerName: 'Actions',
            width: 150,
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
    //console.log("tableData:", tableData,"tableColumns:", tableColumns);
    return (
            <div className='container-datagrid'>
                <div className='data-datagrid'>
                    <DataGrid 
                        className='data-ventas' 
                        rows={tableData} 
                        columns={tableColumns}
                        initialState={{
                            pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[10, 20,30,40,50]}
                        // checkboxSelection
                        density='compact'
                        rowSelectionModel={selectedRows}
                        onRowSelectionModelChange={handleSelectionChange}
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
                </div>
            </div>
    )
}
export default ListaVentasTableGrid;
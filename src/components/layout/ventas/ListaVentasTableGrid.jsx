/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import './ListaVentasTableGrid.css';
import FichaVentasModal from './FichaVentasModal';

function ListaVentasTableGrid() {
    const results = useSelector((state) => state.inicio.results);
    const [tableData, setTableData] = useState([]);
    const [tableColumns, setTableColumns] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        prepararData();
    }, [results]);
    const prepararData = async() => {
        console.log("Entro useEffect", results);
        let dataPreparada = results.map((venta) => {
            let total = venta.DetVentas.reduce((prev, curr) => prev + +curr.pvTotalMN, 0);
            let totalFormateado = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(total); // Formatear el campo total como "999,999.00"
            //let totalFormateado = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'USD' }).format(total);
            let fechaVenta = new Date(venta.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }); // Formatear la fecha en 'dd/mm/yyyy'
            return {
                id: +venta.id,
                serie: venta.serieDcmto,
                num: venta.correlativoDcmto,
                fecha: fechaVenta,
                cliente: venta.ClienteProveedor.razonSocial,
                pvtotal: totalFormateado,
                };
            });
        let columns = Object.keys(dataPreparada[0]).map((key) => {
            let anchoColumna = 150; // Ancho predeterminado
            // Verificar si el valor es numérico
            if (typeof dataPreparada[0][key] === 'number') {
                anchoColumna = 90;
            } else if (typeof dataPreparada[0][key] === 'string') {
                // Calcular el ancho promedio de la longitud máxima del campo
                let maxLength = dataPreparada.reduce((max, item) => Math.max(max, item[key].length), 0);
                let averageWidth = maxLength * 8; // Puedes ajustar este valor según tus necesidades
                // Verificar si la longitud es menor o igual a 10
                if (maxLength <= 10) {
                    anchoColumna = maxLength*15;
                } else {
                    anchoColumna = Math.max(anchoColumna, averageWidth);
                }
            } else if (dataPreparada[0][key] instanceof Date) {
                anchoColumna = 120; // Ancho para columnas de fecha
            }
            if (key === 'pvtotal') {
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
    const handleEdit = (row) => {
        openEditModal(); // Llama a la función openEditModal para abrir el modal de edición
        setSelectedRow(row);
        console.log("row", row.id);
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
    };
    const handleSelectionChange = (newSelection) => {
        setSelectedRows(newSelection);
    };
    console.log("tableData:", tableData,"tableColumns:", tableColumns);
    return (
            <div className='container-datagrid'>
                <div className='data-datagrid'>
                    <DataGrid 
                        className='data-ventas' 
                        rows={tableData} 
                        columns={tableColumns}
                        initialState={{
                            pagination: {
                            paginationModel: { page: 0, pageSize: 7 },
                            },
                        }}
                        pageSizeOptions={[7, 14,21,28,35]}
                        checkboxSelection
                        rowSelectionModel={selectedRows}
                        onRowSelectionModelChange={handleSelectionChange}
                    />
                    {isEditModalOpen && (
                        <FichaVentasModal 
                            isOpen={isEditModalOpen}
                            onClose={() => closeEditModal()}
                            selectedRow={selectedRow}
                            setSelectedRow={setSelectedRow} // Pasar la función setSelectedRow como prop
                            setSelectedRows={setSelectedRows}
                        />
                    )}
                </div>
            </div>
    )
}
export default ListaVentasTableGrid;
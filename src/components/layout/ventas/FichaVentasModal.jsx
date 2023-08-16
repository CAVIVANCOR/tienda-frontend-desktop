/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, Select, MenuItem, IconButton } from '@mui/material';
import './FichaVentasModal.css';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import moment from 'moment';
import 'moment/locale/es'; // Importa el idioma si lo necesitas
import axios from 'axios';
import {formatDateStringToyyyymmdd} from '../../../utilities/utilities';
import { NumericFormat } from 'react-number-format';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import FichaDetVentasModal from './FichaDetVentasModal';
import { useDispatch, useSelector } from 'react-redux';
import { setResults } from '../../../redux/features/task/inicio';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
function FichaVentasModal({ isOpen, onClose, setSelectedRows, fichaDataVentas, setFichaDataVentas }) {
  const results = useSelector((state) => state.inicio.results);
  const datosGlobales = useSelector((state) => state.datosGlobales.data);
  const dispatch = useDispatch();
  const [detalleVentas, setDetalleVentas] = useState(fichaDataVentas.DetVentas);
  const [detTableData, setDetTableData] = useState([]);
  const [detTableColumns, setDetTableColumns] = useState([]);
  const [totalesCabVentas, setTotalesCabVentas] = useState({
    valorVentaTotal: 0,
    descuentoTotal: 0,
    porcentajeDescuentoTotal: 0,
    valorVentaNetoTotal: 0,
    igvTotal: 0,
    precioVentaTotal: 0
  })
  const [isEditModalOpenDetVentas, setIsEditModalOpenDetVentas] = useState(false);
  const [selectedRowsDet, setSelectedRowsDet] = useState([]);
  const [fichaDataDetVentas, setFichaDataDetVentas] = useState({});
  moment.locale('es'); // Configura Moment.js para utilizar el idioma en español
  useEffect(() => {
    prepararDataDetVentas();
  },[detalleVentas]);
  const prepararDataDetVentas = async() => {
    let totales = {
      valorVentaTotal: 0,
      descuentoTotal: 0,
      porcentajeDescuentoTotal: 0,
      valorVentaNetoTotal: 0,
      igvTotal: 0,
      precioVentaTotal: 0
    }
    if (fichaDataVentas.moneda){
      totales.valorVentaTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.vvUnitME*+curr.cantidad), 0);
      totales.descuentoTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.descUnitME*+curr.cantidad), 0);
      totales.valorVentaNetoTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.vvNetoTotME), 0);
      totales.igvTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.igvTotalME), 0);
      totales.precioVentaTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.pvTotalME), 0);
      totales.porcentajeDescuentoTotal = (totales.descuentoTotal / totales.valorVentaTotal) * 100;
    } else {
      totales.valorVentaTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.vvUnitMN*+curr.cantidad), 0);
      totales.descuentoTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.descUnitMN*+curr.cantidad), 0);
      totales.valorVentaNetoTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.vvNetoTotMN), 0);
      totales.igvTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.igvTotalMN), 0);
      totales.precioVentaTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.pvTotalMN), 0);
      totales.porcentajeDescuentoTotal = (totales.descuentoTotal / totales.valorVentaTotal) * 100;
    }
    let dataPreparada = detalleVentas.map((detVenta) => {
      let totalesFormateado = {
        valorVentaTotal: 0,
        descuentoTotal: 0,
        porcentajeDescuentoTotal: 0,
        valorVentaNetoTotal: 0,
        igvTotal: 0,
        precioVentaTotal: 0
      }
      if (fichaDataVentas.moneda){
        totalesFormateado.valorVentaTotal = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.vvUnitME*+detVenta.cantidad)); 
        totalesFormateado.descuentoTotal = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.descUnitME*+detVenta.cantidad));
        totalesFormateado.valorVentaNetoTotal = new Intl.NumberFormat('es-PE',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.vvNetoTotME));
        totalesFormateado.igvTotal = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.igvTotalME));
        // totalesFormateado.precioVentaTotal = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format((+detVenta.pvTotalME));
        totalesFormateado.precioVentaTotal = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.pvTotalME));
        totalesFormateado.porcentajeDescuentoTotal = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(((+detVenta.descUnitME*+detVenta.cantidad) / (+detVenta.vvUnitME*+detVenta.cantidad)) * 100);
      } else {
        totalesFormateado.valorVentaTotal = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.vvUnitMN*+detVenta.cantidad)); 
        totalesFormateado.descuentoTotal = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.descUnitMN*+detVenta.cantidad));
        totalesFormateado.valorVentaNetoTotal = new Intl.NumberFormat('es-PE',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.vvNetoTotMN));
        totalesFormateado.igvTotal = new Intl.NumberFormat('es-PE',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.igvTotalMN));
        totalesFormateado.precioVentaTotal = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.pvTotalMN));
        totalesFormateado.porcentajeDescuentoTotal = new Intl.NumberFormat('es-PE',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(((+detVenta.descUnitMN*+detVenta.cantidad) / (+detVenta.vvUnitMN*+detVenta.cantidad)) * 100);
      }
        return {
            producto: detVenta.Producto.descripcion,
            cantidad: new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.cantidad)),
            descuento: totalesFormateado.descuentoTotal,
            pvtotal: totalesFormateado.precioVentaTotal,
            vventa: totalesFormateado.valorVentaTotal,
            descPorc: totalesFormateado.porcentajeDescuentoTotal,
            vventaneto: totalesFormateado.valorVentaNetoTotal,
            igv: totalesFormateado.igvTotal,
            id: +detVenta.id,
            };
        });
    let columns =[{
                    field: 'producto',
                    headerName: 'Producto',
                    width: 350,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'left',
                    headerAlign: 'center',
                  },
                  {
                    field: 'cantidad',
                    headerName: 'Cant.',
                    width: 110,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'right',
                    headerAlign: 'center',
                  },
                  {
                    field: 'descuento',
                    headerName: 'Desc.',
                    width: 110,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'right',
                    headerAlign: 'center',
                  },
                  {
                    field: 'pvtotal',
                    headerName: 'PV',
                    width: 110,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'right',
                    headerAlign: 'center',
                  },
                  {
                    field: 'actions',
                    headerName: '',
                    width: 80,
                    renderCell: (params) => (
                        <>
                            <IconButton onClick={() => handleEditDetVentas(params.row)}>
                                <Edit />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteDetVentas(params.row)}>
                                <Delete />
                            </IconButton>
                        </>
                    ),
                  },
                  {
                    field: 'vventa',
                    headerName: 'VVenta',
                    width: 120,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'right',
                    headerAlign: 'center',
                  },
                  {
                    field: 'descPorc',
                    headerName: '%Desc.',
                    width: 120,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'right',
                    headerAlign: 'center',
                  },
                  {
                    field: 'vventaneto',
                    headerName: 'VNeto',
                    width: 120,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'right',
                    headerAlign: 'center',
                  },
                  {
                    field: 'igv',
                    headerName: 'IGV',
                    width: 100,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'right',
                    headerAlign: 'center',
                  },
                  {
                    field: 'id',
                    headerName: 'ID',
                    width: 120,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'right',
                    headerAlign: 'center',
                  }
  ];
    setDetTableData(dataPreparada);
    setDetTableColumns(columns);
    setTotalesCabVentas(totales);
};
const handleEditDetVentas =  (row) => {
  openEditModalDetVentas(); // Llama a la función openEditModalDetVentas para abrir el modal de edición
  setFichaDataDetVentas(fichaDataVentas.DetVentas.find(objeto => +objeto.id === +row.id));
};
const handleDeleteDetVentas = (row) => {
  console.log("row", row.id);
};
const handleShowDetVentas = (row) => {
  console.log("row", row.id);
};
const openEditModalDetVentas = () => {
  setIsEditModalOpenDetVentas(true);
};
const closeEditModalDetVentas = () => {
  setIsEditModalOpenDetVentas(false);
  if (fichaDataDetVentas){
    let updatedArrayDetVentas = [...detalleVentas];
    let indiceDataDetVentas=updatedArrayDetVentas.findIndex(obj => +obj.id === +fichaDataDetVentas.id);
    updatedArrayDetVentas[indiceDataDetVentas]=fichaDataDetVentas;
    setDetalleVentas(updatedArrayDetVentas);
    let updatedArray = [...results];
    let indiceDataVentas=updatedArray.findIndex(obj => +obj.id === +fichaDataVentas.id);
    updatedArray[indiceDataVentas]=fichaDataVentas;
    dispatch(setResults(updatedArray));
    setFichaDataDetVentas({});
    }
};
const handleSelectionChangeDetVentas = (newSelection) => {
  setSelectedRowsDet(newSelection);
};

  const grabarCabVentas = async () => {
    console.log("grabarCabVentas: fichaDataVentas",fichaDataVentas);
    const datosCodificados = {
      id: +fichaDataVentas.id,
      fecha: formatDateStringToyyyymmdd(fichaDataVentas.fecha),
      serieDcmto: fichaDataVentas.serieDcmto,
      correlativoDcmto: fichaDataVentas.correlativoDcmto,
      idContacto: +fichaDataVentas.idContacto,
      idDirOrigen: +fichaDataVentas.idDirOrigen,
      idDirEntrega: +fichaDataVentas.idDirEntrega,
      observaciones: fichaDataVentas.observaciones,
      idDocAlmacen: +fichaDataVentas.idDocAlmacen,
      idVendedor: +fichaDataVentas.idVendedor,
      idTecnico: +fichaDataVentas.idTecnico,
      numPlacas: fichaDataVentas.numPlacas,
      tipoCambio: +fichaDataVentas.tipoCambio,
      porcentajeIGV: +fichaDataVentas.porcentajeIGV,
      emailDestino: fichaDataVentas.emailDestino,
      rutaDcmtoPDF: fichaDataVentas.rutaDcmtoPDF,
      exonerado: fichaDataVentas.exonerado,
      moneda: fichaDataVentas.moneda,
      factElectOK: fichaDataVentas.factElectOK,
      anticipo: fichaDataVentas.anticipo,
      created: fichaDataVentas.created,
      borradoLogico: fichaDataVentas.borradoLogico,
      idHistorico: +fichaDataVentas.idHistorico,
      ClienteProveedorId: +fichaDataVentas.ClienteProveedorId,
      FormaPagoId: +fichaDataVentas.FormaPagoId,
      EstadoDocId: +fichaDataVentas.EstadoDocId,
      UsuarioId: +fichaDataVentas.UsuarioId,
      TipoCambioId: +fichaDataVentas.TipoCambioId,
      CentroCostoId: +fichaDataVentas.CentroCostoId,
      CorrelativoDocId: +fichaDataVentas.CorrelativoDocId
    };
    console.log("datosCodificados",datosCodificados);
    try {
      let regCabVentasUpdated = await axios.put("http://localhost:3001/cabVentas/update/"+datosCodificados.id, datosCodificados);
      console.log("regCabVentasUpdated",regCabVentasUpdated);
      if (!regCabVentasUpdated.data) console.log("Error: No se pudo Actualizar la Informacion de la Cabecera de Ventas");
    } catch (error) {
      console.log("Error: En la solicitud Backend, Servidor de Base de Datos NO Responde",error);
    }
    console.log("grabarCabVentas: datosCodificados",datosCodificados);
  }
  const handleSubmitCabVentas = async () => {
    // Aquí puedes manejar la lógica de guardar los cambios y cerrar el modal
    await grabarCabVentas();
    setSelectedRows([]); // Deseleccionar el registro en el DataGrid
    setTotalesCabVentas([]);
    onClose();
  };
  const handleCloseCabVentas = () => {
    setSelectedRows([]); // Deseleccionar el registro en el DataGrid
    setFichaDataVentas({});
    setTotalesCabVentas([]);
    onClose();
  };
//console.log("fichaDataVentas:", fichaDataVentas, fichaDataVentas.fecha,typeof fichaDataVentas.fecha);
const handleChangeCabVentas = (event) => {
  setFichaDataVentas({
      ...fichaDataVentas,
      [event.target.name]: event.target.value,
  });
};
const handleChangefecha = (fechaNueva) => {
  setFichaDataVentas({
    ...fichaDataVentas,
    fecha: moment(fechaNueva.$d).format('DD/MM/YYYY'),
  });
};
const handleChangeBoolean = (event) => {
  console.log("handleChangeBoolean",event.target)
  setFichaDataVentas({
    ...fichaDataVentas,
    moneda: event.target.value,
  });
}
const handleChangeDesc = (event, name)=>{
  console.log("handleChangeDesc",event.floatValue,name)
  setFichaDataVentas({
    ...fichaDataVentas,
    [name]: event.floatValue
  });
};
//console.log("fichaDataVentas",fichaDataVentas);
  return (
    <Dialog className='dialogFichaVentas' open={isOpen} fullWidth maxWidth="md">
      <DialogTitle>{fichaDataVentas.CorrelativoDoc.TipoDocumento.descripcion} ID:{fichaDataVentas.id}</DialogTitle>
      <DialogContent style={{ maxHeight: 'calc(100vh - 300px)', overflow: 'hidden' }}>
        <Grid2 className='campoInput' container spacing={2} justifyContent="center" alignItems="center" style={{margin: 'auto'}}>
          <Grid2 container xs={12} alignItems="center" justifyContent="center" spacing={2}>
            <Grid2 xs={3}>
              <TextField  className="campoInput" margin='none' label="Serie Dcmto" variant="outlined" size="small" disabled={true} value={fichaDataVentas.serieDcmto} onChange={handleChangeCabVentas} />
            </Grid2>
            <Grid2 xs={3}>
              <TextField className="campoInput" margin='none' label="N° Correlativo" variant="outlined" size="small" disabled={true} value={fichaDataVentas.correlativoDcmto} onChange={handleChangeCabVentas} />
            </Grid2>
            <Grid2 xs={3}>
              <DatePicker className="campoInput" label="Fecha" format="DD/MM/YYYY" formatDensity='dense' size="small" value={dayjs(formatDateStringToyyyymmdd(fichaDataVentas.fecha))} onChange={(newValue) => handleChangefecha(newValue)} />
            </Grid2>
            <Grid2 xs={1.5}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                label="T/C"
                value={fichaDataVentas.tipoCambio}
                name='tipoCambio'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={""}
                suffix=''
                className="campoInput"
                size="small"
                customInput={TextField }
              />
            </Grid2>
            <Grid2 xs={1.5}>
              <Select labelId="moneda" name="moneda" id="moneda" value={fichaDataVentas.moneda} label="Moneda" size="small" onChange={handleChangeBoolean}>
                <MenuItem value={true}>{datosGlobales.descripCortaME}</MenuItem>
                <MenuItem value={false}>{datosGlobales.descripCortaMN}</MenuItem>
              </Select>
            </Grid2>
          </Grid2>
          <Grid2 container  xs={12} alignItems="center" justifyContent="center" spacing={2}>
            <Grid2 xs={3.5}>
              <TextField className="campoInput" margin='none' label="Cliente" variant="outlined" size="small" value={fichaDataVentas.ClienteProveedor.razonSocial} onChange={handleChangeCabVentas} />
            </Grid2>
            <Grid2 xs={2.5}>
              <TextField className="campoInput" margin='none' label="Forma de Pago" variant="outlined" size="small" value={fichaDataVentas.FormaPago.descripcion} onChange={handleChangeCabVentas} />
            </Grid2>
            <Grid2 xs={2}>
              <TextField className="campoInput" margin='none' label="Vendedor" variant="outlined" size="small" value={fichaDataVentas.idVendedor} onChange={handleChangeCabVentas} />
            </Grid2>
            <Grid2 xs={2}>
              <TextField className="campoInput" margin='none' label="Tecnico" variant="outlined" size="small" value={fichaDataVentas.idTecnico} onChange={handleChangeCabVentas} />
            </Grid2>
            <Grid2 xs={2}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={false}
                label="% IGV"
                value={fichaDataVentas.porcentajeIGV}
                name='porcentajeIGV'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={""}
                suffix='%'
                className="campoInput"
                size="small"
                customInput={TextField }
                onValueChange={handleChangeCabVentas}
              />
            </Grid2>
          </Grid2>
          <div className='container-detdatagrid'>
                <div className='detdata-datagrid'>
                    <DataGrid 
                        className='data-detventas' 
                        rows={detTableData} 
                        columns={detTableColumns}
                        initialState={{
                            pagination: {
                            paginationModel: { page: 0, pageSize: 4 },
                            },
                        }}
                        pageSizeOptions={[4,8,12,16,20]}
                        // checkboxSelection
                        density='compact'
                        rowSelectionModel={selectedRowsDet}
                        onRowSelectionModelChange={handleSelectionChangeDetVentas}
                    />
                    {isEditModalOpenDetVentas && (
                        <FichaDetVentasModal 
                            isOpen={isEditModalOpenDetVentas}
                            onClose={() => closeEditModalDetVentas()}
                            setSelectedRowsDet={setSelectedRowsDet}
                            fichaDataDetVentas={fichaDataDetVentas}
                            setFichaDataDetVentas={setFichaDataDetVentas}
                            fichaDataVentas={fichaDataVentas}
                        />
                    )}
                </div>
          </div>
          <Grid2 container xs={12} alignItems="center" justifyContent="center" spacing={2}>
            <Grid2 xs={4}>
              {/* <TextField className="campoInput" margin='none' label="V.Venta" variant="outlined" size="small" disabled={true} InputProps={{ startAdornment: <InputAdornment position="start">{fichaDataVentas.moneda?"US$":"S/."}</InputAdornment> }} value={valorVentaTotal} onChange={handleChangeCabVentas} /> */}
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                label="V.Venta"
                value={totalesCabVentas.valorVentaTotal}
                name='valorVentaTotal'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={fichaDataVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
                suffix=''
                className="campoInput"
                size="small"
                customInput={TextField }
              />
            </Grid2>
            <Grid2 xs={4}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={false}
                label="Descuento"
                value={totalesCabVentas.descuentoTotal}
                name='descuentoTotal'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={fichaDataVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
                suffix=''
                className="campoInput"
                size="small"
                customInput={TextField }
                onValueChange={(values) => handleChangeDesc(values, "descuentoTotal")}
              />
            </Grid2>
            <Grid2 xs={4}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={false}
                label="% Desc."
                value={totalesCabVentas.porcentajeDescuentoTotal}
                name='porcentajeDescuentoTotal'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={""}
                suffix='%'
                className="campoInput"
                size="small"
                customInput={TextField }
                onValueChange={(values) => handleChangeDesc(values, "porcentajeDescuentoTotal")}
              />
            </Grid2>
          </Grid2>
          <Grid2 container xs={12} alignItems="center" justifyContent="center" spacing={2}>
            <Grid2 xs={4}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                label="V.V.Neto"
                value={totalesCabVentas.valorVentaNetoTotal}
                name='valorVentaNetoTotal'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={fichaDataVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
                suffix=''
                className="campoInput"
                size="small"
                customInput={TextField }
              />
            </Grid2>
            <Grid2 xs={4}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                label="IGV"
                value={totalesCabVentas.igvTotal}
                name='igvTotal'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={fichaDataVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
                suffix=''
                className="campoInput"
                size="small"
                customInput={TextField }
              />
            </Grid2>
            <Grid2 xs={4}>
                <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                label="P.V.Total"
                value={totalesCabVentas.precioVentaTotal}
                name='precioVentaTotal'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={fichaDataVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
                suffix=''
                className="campoInput"
                size="small"
                customInput={TextField }
              />
            </Grid2>
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" size="small" onClick={handleCloseCabVentas}>Cancelar</Button>
        <Button variant="contained" color="success" size="small" onClick={handleSubmitCabVentas}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default FichaVentasModal;
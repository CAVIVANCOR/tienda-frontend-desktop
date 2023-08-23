/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,  TextField, Select, MenuItem, IconButton, FormControl, InputLabel, Autocomplete, Snackbar } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import moment from 'moment';
import 'moment/locale/es'; // Importa el idioma si lo necesitas
import axios from 'axios';
import {formatDateStringToyyyymmdd, formatDateStringToddmmyyyy} from '../../../utilities/utilities';
import { NumericFormat } from 'react-number-format';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit, ExitToApp, Search } from '@mui/icons-material';
import FichaDetVentasModal from './FichaDetVentasModal';
import { useDispatch, useSelector } from 'react-redux';
import { setResults } from '../../../redux/features/task/inicio';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import FichaSearchCliente from './FichaSearchCliente';
import MuiAlert from '@mui/material/Alert';
import FichaSearchGeneral from './FichaSearchGeneral';

function FichaVentasModal({ isOpen, onClose, setSelectedRows, fichaDataVentas, setFichaDataVentas }) {
  const results = useSelector((state) => state.inicio.results);
  const [vendedorDescripcion, setVendedorDescripcion] = useState("");
  const [tecnicoDescripcion, setTecnicoDescripcion] = useState("");
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
  const [openSearchCliente, setOpenSearchCliente] = useState(false);
  const [openSearchFormaPago, setOpenSearchFormaPago] = useState(false);
  const [openSearchVendedor, setOpenSearchVendedor] = useState(false);
  const [openSearchTecnico, setOpenSearchTecnico] = useState(false);
  const [openMessageUser, setOpenMessageUser] = useState(false);
  const [dataTemporalVentas, setDataTemporalVentas] = useState(fichaDataVentas);
  moment.locale('es'); // Configura Moment.js para utilizar el idioma en español
  useEffect(() => {
    prepararDataDetVentas();

  },[detalleVentas]);
  useEffect(() => {
    cargarDescripcionPersonal(dataTemporalVentas.idVendedor,setVendedorDescripcion);
    cargarDescripcionPersonal(dataTemporalVentas.idTecnico,setTecnicoDescripcion);
  },[dataTemporalVentas]);
  const cargarDescripcionPersonal = async (id, cargaNombres) => {
    if (id>0){
      try {
        let reg = await axios.post('http://localhost:3001/personal/search', { id });
        if (!reg) throw new Error("Error: No se encontraron Datos del Personal");
        cargaNombres(reg.data[0].nombres);
        console.log("cargarDescripcionPersonal",reg.data[0].nombres);
      } catch (error) {
        console.log("Error",error);
      }
    }
  };
  const prepararDataDetVentas = async() => {
    let totales = {
      valorVentaTotal: 0,
      descuentoTotal: 0,
      porcentajeDescuentoTotal: 0,
      valorVentaNetoTotal: 0,
      igvTotal: 0,
      precioVentaTotal: 0
    }
    if (dataTemporalVentas.moneda){
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
      if (dataTemporalVentas.moneda){
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
                    width: 300,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'left',
                    headerAlign: 'center',
                  },
                  {
                    field: 'cantidad',
                    headerName: 'Cant.',
                    width: 100,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'right',
                    headerAlign: 'center',
                  },
                  {
                    field: 'descuento',
                    headerName: 'Desc.',
                    width: 100,
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
  setFichaDataDetVentas(dataTemporalVentas.DetVentas.find(objeto => +objeto.id === +row.id));
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
const closeEditModalDetVentas = async () => {
  setIsEditModalOpenDetVentas(false);
  if (fichaDataDetVentas){
    await setFichaDataVentas(dataTemporalVentas);
    let updatedArrayDetVentas = [...detalleVentas];
    let indiceDataDetVentas= updatedArrayDetVentas.findIndex(obj => +obj.id === +fichaDataDetVentas.id);
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
    console.log("grabarCabVentas: dataTemporalVentas",dataTemporalVentas);
    setFichaDataVentas(dataTemporalVentas);
    const datosCodificados = {
      id: +dataTemporalVentas.id,
      fecha: formatDateStringToyyyymmdd(dataTemporalVentas.fecha),
      serieDcmto: dataTemporalVentas.serieDcmto,
      correlativoDcmto: dataTemporalVentas.correlativoDcmto,
      idContacto: +dataTemporalVentas.idContacto,
      idDirOrigen: +dataTemporalVentas.idDirOrigen,
      idDirEntrega: +dataTemporalVentas.idDirEntrega,
      observaciones: dataTemporalVentas.observaciones,
      idDocAlmacen: +dataTemporalVentas.idDocAlmacen,
      idVendedor: +dataTemporalVentas.idVendedor,
      idTecnico: +dataTemporalVentas.idTecnico,
      numPlacas: dataTemporalVentas.numPlacas,
      tipoCambio: +dataTemporalVentas.tipoCambio,
      porcentajeIGV: +dataTemporalVentas.porcentajeIGV,
      emailDestino: dataTemporalVentas.emailDestino,
      rutaDcmtoPDF: dataTemporalVentas.rutaDcmtoPDF,
      exonerado: dataTemporalVentas.exonerado,
      moneda: dataTemporalVentas.moneda,
      factElectOK: dataTemporalVentas.factElectOK,
      anticipo: dataTemporalVentas.anticipo,
      created: dataTemporalVentas.created,
      borradoLogico: dataTemporalVentas.borradoLogico,
      idHistorico: +dataTemporalVentas.idHistorico,
      ClienteProveedorId: +dataTemporalVentas.ClienteProveedorId,
      FormaPagoId: +dataTemporalVentas.FormaPagoId,
      EstadoDocId: +dataTemporalVentas.EstadoDocId,
      UsuarioId: +dataTemporalVentas.UsuarioId,
      TipoCambioId: +dataTemporalVentas.TipoCambioId,
      CentroCostoId: +dataTemporalVentas.CentroCostoId,
      CorrelativoDocId: +dataTemporalVentas.CorrelativoDocId
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
//console.log("dataTemporalVentas:", dataTemporalVentas, dataTemporalVentas.fecha,typeof dataTemporalVentas.fecha);
const handleChangeCabVentas = (event) => {
  setFichaDataVentas({
      ...dataTemporalVentas,
      [event.target.name]: event.target.value,
  });
};
const obtenerTCsegunFecha = async (fecha) =>{
  console.log("obtenerTCsegunFecha",fecha);
  try {
    let reg = await axios.post('http://localhost:3001/tiposCambio/search', { fecha });
    console.log("obtenerTCsegunFecha reg:",reg);
    if (reg.data.length ===0){
      let reg = await axios.get('http://localhost:3001/tiposCambio/last');
      console.log("Ultimo reg.data>>>:", reg.data, { fecha: fecha,
        compra: +reg.data.compra,
        venta: +reg.data.venta,
        idHistorico:0
      });
      if (!reg) throw new Error("Error: No se encontraron Datos en Tipo de Cambio");
      let regNew = await axios.post('http://localhost:3001/tiposCambio', 
                  { fecha: fecha,
                    compra: +reg.data.compra,
                    venta: +reg.data.venta,
                    idHistorico:0
                  });
      console.log("regNew:",regNew.data);
      return regNew.data;
    }else{
      return reg.data[0];
    }
  } catch (error) {
    console.log("Error",error);
  }
};
const handleChangefecha = async (fechaNueva) => {
  let fechaConsulta = moment(fechaNueva.$d).format('YYYY-MM-DD') ;
  console.log("handleChangefecha","fechaNueva:",fechaNueva, "fechaConsulta",fechaConsulta);
  let regFecha= await obtenerTCsegunFecha(fechaConsulta);
  console.log("regFecha*********:",regFecha, regFecha.fecha, formatDateStringToddmmyyyy(regFecha.fecha));
  setDataTemporalVentas({
    ...dataTemporalVentas,
    fecha: formatDateStringToddmmyyyy(regFecha.fecha),
    tipoCambio: +regFecha.venta,
    TipoCambioId: +regFecha.id,
    TipoCambio: regFecha
  });
};
const handleChangeBoolean = (event) => {
 // console.log("handleChangeBoolean",event.target)
 setDataTemporalVentas({
    ...dataTemporalVentas,
    moneda: event.target.value,
  });
}
const handleChangeDesc = (event, name)=>{
 // console.log("handleChangeDesc",event.floatValue,name)
 setDataTemporalVentas({
    ...dataTemporalVentas,
    [name]: event.floatValue
  });
};
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const handleCloseMessageUser = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpenMessageUser(false);
};
console.log("dataTemporalVentas",dataTemporalVentas);
  return (
    <Dialog open={isOpen} fullWidth maxWidth="xl">
      <DialogTitle>{dataTemporalVentas.CorrelativoDoc.TipoDocumento.descripcion} ID:{dataTemporalVentas.id}</DialogTitle>
      <DialogContent>
        <Grid2 container xs={12} alignItems="center" justifyContent="center" spacing={0.5} sx={{mt:0.5,mb:0.5}}>
            <Grid2 xs={4}>
              <TextField fullWidth className="campoInput" margin='none' label="Serie Dcmto" variant="outlined" size="small" disabled={true} value={dataTemporalVentas.serieDcmto} onChange={handleChangeCabVentas} />
            </Grid2>
            <Grid2 xs={4}>
              <TextField fullWidth className="campoInput" margin='none' label="N° Correlativo" variant="outlined" size="small" disabled={true} value={dataTemporalVentas.correlativoDcmto} onChange={handleChangeCabVentas} />
            </Grid2>
            <Grid2 xs={4}>
              <DatePicker className="campoInput" label="Fecha" format="DD/MM/YYYY" formatDensity='dense' size="small" value={dayjs(formatDateStringToyyyymmdd(dataTemporalVentas.fecha))} onAccept={(newValue) => handleChangefecha(newValue)} />
            </Grid2>
        </Grid2>
        <Grid2 container xs={12} alignItems="center" justifyContent="center" spacing={0.5} sx={{mt:0.5,mb:0.5}}>
            <Grid2 xs={4}>
              <NumericFormat
                fullWidth
                margin='none'
                variant='outlined'
                disabled={true}
                label="T/C"
                value={dataTemporalVentas.tipoCambio}
                name='tipoCambio'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={dataTemporalVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
                suffix=''
                className="campoInput"
                size="small"
                customInput={TextField}
              />
            </Grid2>
            <Grid2 xs={4}>
              <FormControl fullWidth>
                <InputLabel id="moneda">Moneda</InputLabel>
                <Select labelId="moneda" name="moneda" id="moneda" value={dataTemporalVentas.moneda} label="Moneda" size="small" onChange={handleChangeBoolean}>
                  <MenuItem value={true}>{datosGlobales.descripCortaME}</MenuItem>
                  <MenuItem value={false}>{datosGlobales.descripCortaMN}</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 xs={4}>
              <NumericFormat
                fullWidth
                margin='none'
                variant='outlined'
                disabled={true}
                label="% IGV"
                value={dataTemporalVentas.porcentajeIGV}
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
        <Grid2 container  xs={12}  spacing={0.5} sx={{mt:0.5,mb:0.5}}>
          <Grid2 xs={6}>
            <TextField fullWidth className="campoInput" margin='none' label="Cliente" variant="outlined" size="small" value={dataTemporalVentas.ClienteProveedor.razonSocial} disabled={true}/>
          </Grid2>
          <Grid2 xs={1}>
            <IconButton sx={{ml:1}} size="medium" color='success' onClick={() => setOpenSearchCliente(true)}>
              <Search />
            </IconButton>
          </Grid2>
          {openSearchCliente && (
            <FichaSearchCliente 
              isOpen={openSearchCliente} 
              onClose={() => setOpenSearchCliente(false)} 
              fichaDataVentas={dataTemporalVentas} 
              setFichaDataVentas={setDataTemporalVentas}
              setOpenMessageUser={setOpenMessageUser}/>
          )}
          {openMessageUser && (
            <Snackbar open={openMessageUser} autoHideDuration={6000} onClose={handleCloseMessageUser}>
              <Alert onClose={handleCloseMessageUser} severity="success" sx={{ width: '100%' }}>
                Actualizando Datos del Cliente, no olvide GUARDAR los cambios
              </Alert>
            </Snackbar>
          )}
          <Grid2 xs={4}>
            <TextField fullWidth className="campoInput" margin='none' label="Forma de Pago" variant="outlined" size="small" value={dataTemporalVentas.FormaPago.descripcion} disabled={true}/>
          </Grid2>
          <Grid2 xs={1}>
            <IconButton sx={{ml:1}} size="medium" color='success' onClick={() => setOpenSearchFormaPago(true)}>
              <Search />
            </IconButton>
          </Grid2>
          {openSearchFormaPago && (
            <FichaSearchGeneral 
              titulo={"Buscar Formas de Pago"}
              isOpen={openSearchFormaPago} 
              onClose={()=>setOpenSearchFormaPago(false)} 
              fichaDataVentas={dataTemporalVentas} 
              setFichaDataVentas={setDataTemporalVentas}
              setOpenMessageUser={setOpenMessageUser}
              rutaPost={"http://localhost:3001/formasPago/search"}
              campoLabel={"descripcion"}
              campoId={"FormaPagoId"}
              campoObjecto={"FormaPago"}/>
          )}
          {openMessageUser && (
            <Snackbar open={openMessageUser} autoHideDuration={6000} onClose={handleCloseMessageUser}>
              <Alert onClose={handleCloseMessageUser} severity="success" sx={{ width: '100%' }}>
                Actualizando Datos de la Forma de Pago, no olvide GUARDAR los cambios
              </Alert>
            </Snackbar>
          )}

        </Grid2>
        <Grid2 container  xs={12} spacing={0.5} sx={{mt:0.5,mb:0.5}}>
            <Grid2 xs={6}>
              <TextField fullWidth className="campoInput" margin='none' label="Vendedor" variant="outlined" size="small" value={vendedorDescripcion}  disabled={true} />
            </Grid2>
            <Grid2 xs={1}>
              <IconButton sx={{ml:1}} size="medium" color='success' onClick={()=>setOpenSearchVendedor(true)}>
                <Search />
              </IconButton>
            </Grid2>
            {openSearchVendedor && (
              <FichaSearchGeneral 
                titulo={"Buscar Vendedor"}
                isOpen={openSearchVendedor} 
                onClose={()=>setOpenSearchVendedor(false)} 
                fichaDataVentas={dataTemporalVentas} 
                setFichaDataVentas={setDataTemporalVentas}
                setOpenMessageUser={setOpenMessageUser}
                rutaPost={"http://localhost:3001/personal/search"}
                campoLabel={"nombres"}
                campoId={"idVendedor"}/>
            )}
            {openMessageUser && (
              <Snackbar open={openMessageUser} autoHideDuration={6000} onClose={handleCloseMessageUser}>
                <Alert onClose={handleCloseMessageUser} severity="success" sx={{ width: '100%' }}>
                  Actualizando Datos del Vendedor, no olvide GUARDAR los cambios
                </Alert>
              </Snackbar>
            )}
            <Grid2 xs={4}>
              <TextField fullWidth className="campoInput" margin='none' label="Tecnico" variant="outlined" size="small" value={tecnicoDescripcion} disabled={true} />
            </Grid2>
            <Grid2 xs={1}>
              <IconButton sx={{ml:1}} size="medium" color='success' onClick={()=>setOpenSearchTecnico(true)}>
                <Search />
              </IconButton>
            </Grid2>
            {openSearchTecnico && (
              <FichaSearchGeneral 
                titulo={"Buscar Tecnico"}
                isOpen={openSearchTecnico} 
                onClose={()=>setOpenSearchTecnico(false)} 
                fichaDataVentas={dataTemporalVentas} 
                setFichaDataVentas={setDataTemporalVentas}
                setOpenMessageUser={setOpenMessageUser}
                rutaPost={"http://localhost:3001/personal/search"}
                campoLabel={"nombres"}
                campoId={"idTecnico"}/>
            )}
            {openMessageUser && (
              <Snackbar open={openMessageUser} autoHideDuration={6000} onClose={handleCloseMessageUser}>
                <Alert onClose={handleCloseMessageUser} severity="success" sx={{ width: '100%' }}>
                  Actualizando Datos del Tecnico Instalador, no olvide GUARDAR los cambios
                </Alert>
              </Snackbar>
            )}
        </Grid2>
        <DataGrid 
            rows={detTableData} 
            columns={detTableColumns}
            sx={{ width: '100%', height: '100%', backgroundColor: 'white', boxShadow:5, borderRadius: 2, border:3, borderColor:'primary.main', "& .MuiDataGrid-columnHeaders": { backgroundColor: 'primary.main', color: 'white' } }}
            density='compact'
            initialState={{
              pagination: {
              paginationModel: { page: 0, pageSize: 8 },
              },
          }}
          pageSizeOptions={[8, 16,24,32,40]}
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
                fichaDataVentas={dataTemporalVentas}
            />
        )}
        <Grid2 container xs={12} alignItems="center" justifyContent="center" spacing={0.5} sx={{mt:1.5}}>
          <Grid2 xs={4}>
            {/* <TextField className="campoInput" margin='none' label="V.Venta" variant="outlined" size="small" disabled={true} InputProps={{ startAdornment: <InputAdornment position="start">{dataTemporalVentas.moneda?"US$":"S/."}</InputAdornment> }} value={valorVentaTotal} onChange={handleChangeCabVentas} /> */}
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
              prefix={dataTemporalVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
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
              prefix={dataTemporalVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
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
        <Grid2 container xs={12} alignItems="center" justifyContent="center" spacing={0.5} sx={{mt:1}}>
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
              prefix={dataTemporalVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
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
              prefix={dataTemporalVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
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
              prefix={dataTemporalVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
              suffix=''
              className="campoInput"
              size="small"
              customInput={TextField }
            />
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
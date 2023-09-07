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
import { prepararDataDetVentas } from './aPrepararDataGrids';
import { grabarCabVentas, cargarDescripcionPersonal, obtenerTCsegunFecha } from './bOperacionesApiData';
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
  const [formaAplicarDescuento, setFormaAplicarDescuento] = useState(false);
  const [descuentoAplicar, setDescuentoAplicar] = useState(0);
  moment.locale('es'); // Configura Moment.js para utilizar el idioma en español
  useEffect(() => {
    prepararDataDetVentas(dataTemporalVentas,detalleVentas,handleEditDetVentas,handleDeleteDetVentas,setDetTableData,setDetTableColumns,setTotalesCabVentas);
  },[detalleVentas]);
  
  useEffect(() => {
    cargarDescripcionPersonal(dataTemporalVentas.idVendedor,setVendedorDescripcion);
    cargarDescripcionPersonal(dataTemporalVentas.idTecnico,setTecnicoDescripcion);
  },[dataTemporalVentas]);

  
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
  
  const handleSubmitCabVentas = async () => {
    // Aquí puedes manejar la lógica de guardar los cambios y cerrar el modal
    await grabarCabVentas(dataTemporalVentas, setFichaDataVentas,formatDateStringToyyyymmdd, detalleVentas, setDetalleVentas);
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
const handleChangeCabVentas = async (event) => {
  console.log("handleChangeCabVentas>>>>>>>>","name:",event.target.name,"value:",event.target.value);

  await setDataTemporalVentas({
    ...dataTemporalVentas,
    [event.target.name]: event.target.value,
  });

  const newDataTemporalVentas = {
    ...dataTemporalVentas,
    [event.target.name]: event.target.value,
  };

  console.log("newDataTemporalVentas.moneda", newDataTemporalVentas.moneda);

  await prepararDataDetVentas(newDataTemporalVentas, detalleVentas, handleEditDetVentas, handleDeleteDetVentas, setDetTableData, setDetTableColumns, setTotalesCabVentas);
};


const handleChangefecha = async (fechaNueva) => {
  let fechaConsulta = moment(fechaNueva.$d).format('YYYY-MM-DD') ;
  let regFecha= await obtenerTCsegunFecha(fechaConsulta);
  setDataTemporalVentas({
    ...dataTemporalVentas,
    fecha: formatDateStringToddmmyyyy(regFecha.fecha),
    tipoCambio: +regFecha.venta,
    TipoCambioId: +regFecha.id,
    TipoCambio: regFecha
  });
};

const handleChangeDesc = (value, formaAplicarDescuento)=>{
  if (value){
    let precioVentaTotal = totalesCabVentas.precioVentaTotal;
    let valorVentaTotal = totalesCabVentas.valorVentaTotal;
    console.log("handleChangeDesc>>>>>>>>",value,formaAplicarDescuento,precioVentaTotal,valorVentaTotal);
    let valorIngresado = value;
    if (formaAplicarDescuento) valorIngresado =  precioVentaTotal*(value/100)
    let descAplicarAntesIGV = +valorIngresado;
    console.log("detalleVentas",detalleVentas);
    let factorProrrateo = descAplicarAntesIGV/precioVentaTotal;
    let detalleventasDescAplicado = detalleVentas.map(detVenta => {
        let porcentajeDescUnit = (+factorProrrateo)*100
        let vvUnitME=0;
        let descUnitME=0;
        let vvNetoUnitME=0;
        let igvUnitME=0;
        let pvUnitME=0;
        let vvNetoTotME=0;
        let igvTotalME=0;
        let pvTotalME=0;
        let vvUnitMN=0;
        let descUnitMN=0;
        let vvNetoUnitMN=0;
        let igvUnitMN=0;
        let pvUnitMN=0;
        let vvNetoTotMN=0;
        let igvTotalMN=0;
        let pvTotalMN=0;
        if (dataTemporalVentas.moneda){
          vvUnitME=(+detVenta.vvUnitME);
          descUnitME=((+detVenta.vvUnitME)*(+factorProrrateo));
          vvNetoUnitME = (+detVenta.vvUnitME)-(+descUnitME);
          igvUnitME = (+vvNetoUnitME)*(+dataTemporalVentas.porcentajeIGV/100);
          pvUnitME = vvNetoUnitME+igvUnitME
          vvNetoTotME=(+vvNetoUnitME)*(+detVenta.cantidad);
          igvTotalME=(+vvNetoTotME)*(+dataTemporalVentas.porcentajeIGV/100);
          pvTotalME=(+vvNetoTotME)+(+igvTotalME);

          vvUnitMN=(+vvUnitME)*(+dataTemporalVentas.tipoCambio);
          descUnitMN=(+descUnitME)*(+dataTemporalVentas.tipoCambio);
          vvNetoUnitMN = (+detVenta.vvUnitMN)-(+descUnitMN);
          igvUnitMN = (+vvNetoUnitMN)*(+dataTemporalVentas.porcentajeIGV/100);
          pvUnitMN = vvNetoUnitMN+igvUnitMN
          vvNetoTotMN=(+vvNetoUnitMN)*(+detVenta.cantidad);
          igvTotalMN=(+vvNetoTotMN)*(+dataTemporalVentas.porcentajeIGV/100);
          pvTotalMN=(+vvNetoTotMN)+(+igvTotalMN);
        }else{
          vvUnitMN=(+detVenta.vvUnitMN);
          descUnitMN=((+detVenta.vvUnitMN)*(+factorProrrateo));
          vvNetoUnitMN = (+detVenta.vvUnitMN)-(+descUnitMN);
          igvUnitMN = (+vvNetoUnitMN)*(+dataTemporalVentas.porcentajeIGV/100);
          pvUnitMN = vvNetoUnitMN+igvUnitMN
          vvNetoTotMN=(+vvNetoUnitMN)*(+detVenta.cantidad);
          igvTotalMN=(+vvNetoTotMN)*(+dataTemporalVentas.porcentajeIGV/100);
          pvTotalMN=(+vvNetoTotMN)+(+igvTotalMN);

          vvUnitME=(+vvUnitMN)/(+dataTemporalVentas.tipoCambio);
          descUnitME=(+descUnitMN)/(+dataTemporalVentas.tipoCambio);
          vvNetoUnitME = (+detVenta.vvUnitME)-(+descUnitME);
          igvUnitME = (+vvNetoUnitME)*(+dataTemporalVentas.porcentajeIGV/100);
          pvUnitME = vvNetoUnitME+igvUnitME
          vvNetoTotME=(+vvNetoUnitME)*(+detVenta.cantidad);
          igvTotalME=(+vvNetoTotME)*(+dataTemporalVentas.porcentajeIGV/100);
          pvTotalME=(+vvNetoTotME)+(+igvTotalME);
        }
        return {
          ...detVenta,
          vvUnitME:vvUnitME,
          porcentajeDescUnit: porcentajeDescUnit,
          descUnitME: descUnitME,
          vvNetoUnitME: vvNetoUnitME,
          igvUnitME: igvUnitME,
          pvUnitME: pvUnitME,
          vvNetoTotME: vvNetoTotME,
          igvTotalME: igvTotalME,
          pvTotalME: pvTotalME,
          vvUnitMN:vvUnitMN,
          descUnitMN: descUnitMN,
          vvNetoUnitMN: vvNetoUnitMN,
          igvUnitMN: igvUnitMN,
          pvUnitMN: pvUnitMN,
          vvNetoTotMN: vvNetoTotMN,
          igvTotalMN: igvTotalMN,
          pvTotalMN: pvTotalMN
        }
    })
    console.log("detalleventasDescAplicado",detalleventasDescAplicado);
    setDetalleVentas(detalleventasDescAplicado);
  }
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
            <Grid2 xs={3}>
              <TextField fullWidth className="campoInput" margin='none' label="Serie Dcmto" variant="outlined" size="small" disabled={true} value={dataTemporalVentas.serieDcmto}/>
            </Grid2>
            <Grid2 xs={3}>
              <TextField fullWidth className="campoInput" margin='none' label="N° Correlativo" variant="outlined" size="small" disabled={true} value={dataTemporalVentas.correlativoDcmto} />
            </Grid2>
            <Grid2 xs={3}>
              <DatePicker className="campoInput" label="Fecha" format="DD/MM/YYYY" formatDensity='dense' size="small" value={dayjs(formatDateStringToyyyymmdd(dataTemporalVentas.fecha))} onAccept={(newValue) => handleChangefecha(newValue)} />
            </Grid2>
            <Grid2 xs={3}>
              <FormControl fullWidth>
                <InputLabel id="aplicarDescuento">Aplicar Descuento</InputLabel>
                <Select labelId="labelIdFormaAplicarDescuento" name="formaAplicarDescuento" id="idFormaAplicarDescuento" value={formaAplicarDescuento} label="labelFormaAplicarDescuento" size="small" onChange={(event)=>setFormaAplicarDescuento(event.target.value)}>
                  <MenuItem value={true}>Porcentaje</MenuItem>
                  <MenuItem value={false}>Monto</MenuItem>
                </Select>
                <NumericFormat
                  fullWidth
                  variant='outlined'
                  disabled={false}
                  value={descuentoAplicar}
                  name='descuentoAplicar'
                  thousandSeparator=","
                  decimalSeparator="."
                  decimalScale={2}
                  fixedDecimalScale
                  size="small"
                  customInput={TextField }
                  onBlur={(event) => handleChangeDesc(event.target.value, formaAplicarDescuento)}
                />
              </FormControl>
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
                <Select labelId="moneda" name="moneda" id="moneda" value={dataTemporalVentas.moneda} label="Moneda" size="small" onChange={handleChangeCabVentas}>
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
            {/* <TextField label="V.Venta" variant="outlined" size="small" disabled={true} InputProps={{ startAdornment: <InputAdornment position="start">{dataTemporalVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}</InputAdornment> }} value={totalesCabVentas.valorVentaTotal}/> */}
            <NumericFormat
              fullWidth
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
              fullWidth
              margin='none'
              variant='outlined'
              disabled={true}
              label="Descuento Total"
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
            />
          </Grid2>
          <Grid2 xs={4}>
            <NumericFormat
              fullWidth
              margin='none'
              variant='outlined'
              disabled={true}
              label="% Descuento Total"
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
            />
          </Grid2>
        </Grid2>
        <Grid2 container xs={12} alignItems="center" justifyContent="center" spacing={0.5} sx={{mt:1}}>
          <Grid2 xs={4}>
            <NumericFormat
              fullWidth
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
              fullWidth
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
              fullWidth
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
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CardMedia, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, IconButton, Snackbar, Alert } from '@mui/material';
import 'moment/locale/es'; // Importa el idioma si lo necesitas
import axios from 'axios';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {detectarDispositivo} from '../../../utilities/utilities';
import { AdsClickRounded } from '@mui/icons-material';
import FichaSearchProducto from '../../layout/ventas/FichaSearchProducto';
import { setIdAlmacenStockVentas, setRegProdStockVentas, setStockVentas } from '../../../redux/features/task/ventas';
import { obtenerStockAlmacenes, stockDisponibleAlmacenUsuario } from './bOperacionesApiData';

function FichaDetVentasModal({ isOpen, onClose, setSelectedRowsDet, fichaDataDetVentas, setFichaDataDetVentas, dataTemporalVentas, openMessageUser,setOpenMessageUser, handleCloseMessageUser }) {
  const [dataTemporalDetVentas, setDataTemporalDetVentas] = useState(fichaDataDetVentas);
  const [formaAplicarDescuentoDet, setFormaAplicarDescuentoDet] = useState(false);
  const [descuentoAplicarDet, setDescuentoAplicarDet] = useState(0);
  const [shouldCloseModal, setShouldCloseModal] = useState(false);
  const [openSearchProducto, setOpenSearchProducto] = useState(false);
  const dispatch=useDispatch();
  const userLogueado = useSelector((state) => state.login.user);
  const cargarStockProducto = async (objConsultaStocks) =>{
    let arrayStockAlmacenes = await obtenerStockAlmacenes(objConsultaStocks);
    let stockDisponible = stockDisponibleAlmacenUsuario(arrayStockAlmacenes,userLogueado.AlmacenId);
    dispatch(setIdAlmacenStockVentas(userLogueado.AlmacenId));
    dispatch(setStockVentas(stockDisponible));
    dispatch(setRegProdStockVentas(dataTemporalDetVentas.Producto));
  };
useEffect(() => {
  cargarStockProducto({ProductoId: +dataTemporalDetVentas.ProductoId, idAlmacen: +userLogueado.AlmacenId});
}, [dataTemporalDetVentas]);


useEffect(() => {
  if (shouldCloseModal && fichaDataDetVentas){
    setSelectedRowsDet([]); // Deseleccionar el registro en el DataGrid
   // console.log("Entro a UseEffect #####################",fichaDataDetVentas);
    onClose();
  }
}, [shouldCloseModal, fichaDataDetVentas]);

  const datosGlobales = useSelector((state) => state.datosGlobales.data);
  const handleChange = (event) => {
    // console.log("handleChange",event.target.name,event.target.value);
    // setDataTemporalDetVentas({
    //     ...dataTemporalDetVentas,
    //     [event.target.name]: event.target.value,
    // });
  };
  const grabarDetVentas = async () => {
    try {
      setFichaDataDetVentas(dataTemporalDetVentas);
      console.log("grabarDetVentas: dataTemporalDetVentas",dataTemporalDetVentas, fichaDataDetVentas);
      const datosCodificados = {
        id: +dataTemporalDetVentas.id,
        cantidad: +dataTemporalDetVentas.cantidad,
        vvUnitMN: +dataTemporalDetVentas.vvUnitMN,
        vvUnitME: +dataTemporalDetVentas.vvUnitME,
        porcentajeDescUnit: +dataTemporalDetVentas.porcentajeDescUnit,
        descUnitMN: +dataTemporalDetVentas.descUnitMN,
        descUnitME: +dataTemporalDetVentas.descUnitME,
        vvNetoUnitMN: +dataTemporalDetVentas.vvNetoUnitMN,
        vvNetoUnitME: +dataTemporalDetVentas.vvNetoUnitME,
        vvNetoTotMN: +dataTemporalDetVentas.vvNetoTotMN,
        vvNetoTotME: dataTemporalDetVentas.vvNetoTotME,
        igvUnitMN: +dataTemporalDetVentas.igvUnitMN,
        igvUnitME: +dataTemporalDetVentas.igvUnitME,
        igvTotalMN: +dataTemporalDetVentas.igvTotalMN,
        igvTotalME: +dataTemporalDetVentas.igvTotalME,
        pvUnitMN: +dataTemporalDetVentas.pvUnitMN,
        pvUnitME: +dataTemporalDetVentas.pvUnitME,
        pvTotalMN: +dataTemporalDetVentas.pvTotalMN,
        pvTotalME: +dataTemporalDetVentas.pvTotalME,
        rutaFotoInstalacion01: dataTemporalDetVentas.rutaFotoInstalacion01,
        rutaFotoInstalacion02: dataTemporalDetVentas.rutaFotoInstalacion02,
        exonerado: +dataTemporalDetVentas.exonerado,
        idApruebaDesc: +dataTemporalDetVentas.idApruebaDesc,
        fechaApruebaDesc: +dataTemporalDetVentas.fechaApruebaDesc,
        descUnitMontoMN: +dataTemporalDetVentas.descUnitMontoMN,
        descUnitMontoME: +dataTemporalDetVentas.descUnitMontoME,
        nroMesesGarantia: +dataTemporalDetVentas.nroMesesGarantia,
        idPreciosCliProv: +dataTemporalDetVentas.idPreciosCliProv,
        borradoLogico: +dataTemporalDetVentas.borradoLogico,
        ProductoId: +dataTemporalDetVentas.ProductoId,
        EstadoProdId: +dataTemporalDetVentas.EstadoProdId,
      };
      console.log("datosCodificados",datosCodificados);
      let regDetVentasUpdated = await axios.put("http://localhost:3001/detVentas/update/"+datosCodificados.id, datosCodificados);
      console.log("regDetVentasUpdated",regDetVentasUpdated);
      if (!regDetVentasUpdated.data) console.log("Error: No se pudo Actualizar la Informacion de la Cabecera de Ventas");
    } catch (error) {
      console.log("Error: En la solicitud Backend, Servidor de Base de Datos NO Responde",error);
    }
  }
  const handleSubmitDetVentas = async () => {
    await grabarDetVentas();
    setShouldCloseModal(true);
  };
  const handleCloseDetVentas = () => {
    setSelectedRowsDet([]); // Deseleccionar el registro en el DataGrid
    setFichaDataDetVentas({});
    onClose();
  };
const handleChangeDescDet = (value, formaAplicarDescuentoDet)=>{
  if (value){
    let precioVentaTotal = dataTemporalVentas.moneda?dataTemporalDetVentas.pvTotalME:dataTemporalDetVentas.pvTotalMN;
    let valorVentaTotal = dataTemporalVentas.moneda?dataTemporalDetVentas.vvNetoTotME:dataTemporalDetVentas.vvNetoTotMN;
   // console.log("handleChangeDescDet>>>>>>>>",value,formaAplicarDescuentoDet,precioVentaTotal,valorVentaTotal);
    let valorIngresado = +value;
    if (formaAplicarDescuentoDet) valorIngresado =  precioVentaTotal*(+value/100)
    let descAplicarAntesIGV = +valorIngresado/(1+(+dataTemporalVentas.porcentajeIGV/100));
    let factorProrrateo = +valorIngresado/precioVentaTotal;
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
    let descUnitMontoME=0;
    let descUnitMontoMN=0;
   // console.log("calculos:","valorIngresado",valorIngresado,"valorIngresado",valorIngresado,"factorProrrateo",factorProrrateo, "porcentajeDescUnit",porcentajeDescUnit);
    if (dataTemporalVentas.moneda){
      descUnitMontoME=descAplicarAntesIGV;
      vvUnitME=(+dataTemporalDetVentas.vvUnitME);
      descUnitME=((+dataTemporalDetVentas.vvUnitME)*(+factorProrrateo));
      vvNetoUnitME = (+dataTemporalDetVentas.vvUnitME)-(+descUnitME);
      igvUnitME = (+vvNetoUnitME)*(+dataTemporalVentas.porcentajeIGV/100);
      pvUnitME = vvNetoUnitME+igvUnitME
      vvNetoTotME=(+vvNetoUnitME)*(+dataTemporalDetVentas.cantidad);
      igvTotalME=(+vvNetoTotME)*(+dataTemporalVentas.porcentajeIGV/100);
      pvTotalME=(+vvNetoTotME)+(+igvTotalME);

      descUnitMontoMN=(+descUnitMontoME)*(+dataTemporalVentas.tipoCambio);
      vvUnitMN=(+vvUnitME)*(+dataTemporalVentas.tipoCambio);
      descUnitMN=(+descUnitME)*(+dataTemporalVentas.tipoCambio);
      vvNetoUnitMN = (+dataTemporalDetVentas.vvUnitMN)-(+descUnitMN);
      igvUnitMN = (+vvNetoUnitMN)*(+dataTemporalVentas.porcentajeIGV/100);
      pvUnitMN = vvNetoUnitMN+igvUnitMN
      vvNetoTotMN=(+vvNetoUnitMN)*(+dataTemporalDetVentas.cantidad);
      igvTotalMN=(+vvNetoTotMN)*(+dataTemporalVentas.porcentajeIGV/100);
      pvTotalMN=(+vvNetoTotMN)+(+igvTotalMN);
    }else{
      descUnitMontoMN=descAplicarAntesIGV;
      vvUnitMN=(+dataTemporalDetVentas.vvUnitMN);
      descUnitMN=((+dataTemporalDetVentas.vvUnitMN)*(+factorProrrateo));
      vvNetoUnitMN = (+dataTemporalDetVentas.vvUnitMN)-(+descUnitMN);
      igvUnitMN = (+vvNetoUnitMN)*(+dataTemporalVentas.porcentajeIGV/100);
      pvUnitMN = vvNetoUnitMN+igvUnitMN
      vvNetoTotMN=(+vvNetoUnitMN)*(+dataTemporalDetVentas.cantidad);
      igvTotalMN=(+vvNetoTotMN)*(+dataTemporalVentas.porcentajeIGV/100);
      pvTotalMN=(+vvNetoTotMN)+(+igvTotalMN);

      descUnitMontoME=(+descUnitMontoMN)/(+dataTemporalVentas.tipoCambio);
      vvUnitME=(+vvUnitMN)/(+dataTemporalVentas.tipoCambio);
      descUnitME=(+descUnitMN)/(+dataTemporalVentas.tipoCambio);
      vvNetoUnitME = (+dataTemporalDetVentas.vvUnitME)-(+descUnitME);
      igvUnitME = (+vvNetoUnitME)*(+dataTemporalVentas.porcentajeIGV/100);
      pvUnitME = vvNetoUnitME+igvUnitME
      vvNetoTotME=(+vvNetoUnitME)*(+dataTemporalDetVentas.cantidad);
      igvTotalME=(+vvNetoTotME)*(+dataTemporalVentas.porcentajeIGV/100);
      pvTotalME=(+vvNetoTotME)+(+igvTotalME);
    }
    let detalleActualizado ={
      ...dataTemporalDetVentas,
      descUnitMontoME:descUnitMontoME,
      descUnitMontoMN:descUnitMontoMN,
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
    };
    setDataTemporalDetVentas(detalleActualizado);
  }
};
console.log("fichaDataDetVentas",fichaDataDetVentas);
const imgProducto = `http://localhost:3001${dataTemporalDetVentas.Producto.urlFotoProducto}`;
  return (
    <Dialog open={isOpen} fullWidth maxWidth="md">
      <DialogTitle>Ficha Detalle Venta ID:{dataTemporalDetVentas.id}</DialogTitle>
      <DialogContent>
        <Card>
          <Typography sx={{ borderColor: 'primary.main', color: 'primary.main'}} gutterBottom align="center" variant="h6">
            {dataTemporalDetVentas.Producto.descripcion}
          </Typography>
          <CardMedia component="img" src={imgProducto} sx={{objectFit: 'contain', maxHeight: 300, minHeight: 100}} title={dataTemporalDetVentas.Producto.descripcion} />
          <CardContent sx={{mb: -3, alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: detectarDispositivo()==='Celular' ? 'column' : 'row'}}>
            <TextField id='idProd' label='ID Producto' variant="outlined" value={dataTemporalDetVentas.ProductoId} size='small' disabled sx={{marginBottom: 1}} />
            <TextField id='CodProveedorProd' label='Cod. Proveedor' variant="outlined" value={dataTemporalDetVentas.Producto.codigoProveedor!==""?dataTemporalDetVentas.Producto.codigoProveedor:'S/C'} size='small' disabled sx={{marginBottom: 1}} />
            <TextField id='ModeloProd' label='Modelo Prod.' variant="outlined" defaultValue={dataTemporalDetVentas.Producto.modeloFabricante!==""?dataTemporalDetVentas.Producto.modeloFabricante:'S/M'} size='small' disabled sx={{marginBottom: 1}} />
          </CardContent>
        </Card>
        <Grid2 container spacing={2} justifyContent="center" alignItems="center" mt={1}>
          <Grid2 container xs={12} alignItems="center" justifyContent="center" spacing={2}>
            <Grid2 xs={1}>
              <IconButton sx={{ml:1}} size='large' color='success' onClick={() => setOpenSearchProducto(true)}>
                <AdsClickRounded />
              </IconButton>
            </Grid2>
            {openSearchProducto && dataTemporalVentas.cerrado && (
              <FichaSearchProducto 
                isOpen={openSearchProducto} 
                onClose={() => setOpenSearchProducto(false)} 
                setFichaDataDetVentas={setFichaDataDetVentas}
                setOpenMessageUser={setOpenMessageUser}
                setDataTemporalDetVentas={setDataTemporalDetVentas}
                dataTemporalDetVentas={dataTemporalDetVentas}
                dataTemporalVentas={dataTemporalVentas}/>
            )}
            {openMessageUser && (
              <Snackbar open={openMessageUser} autoHideDuration={6000} onClose={handleCloseMessageUser}>
                <Alert onClose={handleCloseMessageUser} severity="success" sx={{ width: '100%' }}>
                  Actualizando Datos del Producto en el Detalle de Venta, no olvide GUARDAR los cambios
                </Alert>
              </Snackbar>
            )}
            <Grid2 xs={3}>
              <NumericFormat
                  fullWidth
                  variant='outlined'
                  disabled={dataTemporalVentas.cerrado}
                  value={dataTemporalDetVentas.cantidad}
                  name='cantidad'
                  thousandSeparator=","
                  decimalSeparator="."
                  decimalScale={2}
                  fixedDecimalScale
                  size="small"
                  customInput={TextField }
                  onBlur={(event) => handleChange(event.target.value)}
              />
            </Grid2>
            <Grid2 xs={3}>
              <FormControl fullWidth>
                <InputLabel id="aplicarDescuentoDet">Aplicar Descuento</InputLabel>
                <Select labelId="labelIdFormaAplicarDescuentoDet" name="formaAplicarDescuentoDet" id="idFormaAplicarDescuentoDet" value={formaAplicarDescuentoDet} label="labelFormaAplicarDescuentoDet" size="small" onChange={(event)=>setFormaAplicarDescuentoDet(event.target.value)}>
                  <MenuItem value={true}>Porcentaje</MenuItem>
                  <MenuItem value={false}>Monto</MenuItem>
                </Select>
                <NumericFormat
                  fullWidth
                  variant='outlined'
                  disabled={false}
                  value={descuentoAplicarDet}
                  name='descuentoAplicarDet'
                  thousandSeparator=","
                  decimalSeparator="."
                  decimalScale={4}
                  fixedDecimalScale
                  size="small"
                  customInput={TextField }
                  onBlur={(event) => handleChangeDescDet(event.target.value, formaAplicarDescuentoDet)}
                />
              </FormControl>
            </Grid2>
            <Grid2 xs={2.5}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                fullWidth
                label="Desc.Unit.%"
                value={dataTemporalDetVentas.porcentajeDescUnit}
                name='porcentajeDescUnit'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix=''
                suffix='%'
                className="campoInput"
                size="small"
                customInput={TextField }
              />
            </Grid2>
            <Grid2 xs={2.5}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                fullWidth
                label="Desc.Unit."
                value={dataTemporalVentas.moneda?dataTemporalDetVentas.descUnitME:dataTemporalDetVentas.descUnitMN}
                name='descunit'
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
          <Grid2 container xs={12} alignItems="center" justifyContent="center" spacing={2}>
          </Grid2>
          <Grid2 container xs={12} alignItems="center" justifyContent="center" spacing={2}>
            <Grid2 xs={3}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                fullWidth
                label="V.V. Unit."
                value={dataTemporalVentas.moneda?dataTemporalDetVentas.vvUnitME:dataTemporalDetVentas.vvUnitMN}
                name='vventaunit'
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
            <Grid2 xs={3}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                fullWidth
                label="V.V.Neto Unit."
                value={dataTemporalVentas.moneda?dataTemporalDetVentas.vvNetoUnitME:dataTemporalDetVentas.vvNetoUnitMN}
                name='vventanetounit'
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
            <Grid2 xs={3}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                fullWidth
                label="IGV Unit."
                value={dataTemporalVentas.moneda?dataTemporalDetVentas.igvUnitME:dataTemporalDetVentas.igvUnitMN}
                name='igvunit'
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
            <Grid2 xs={3}>
              <NumericFormat
                fullWidth
                margin='none'
                variant='outlined'
                disabled={true}
                label="P.V.Unit."
                value={dataTemporalVentas.moneda ? dataTemporalDetVentas.pvUnitME : dataTemporalDetVentas.pvUnitMN}
                name={dataTemporalVentas.moneda ? "pvUnitME" : "pvUnitMN"}
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
          <Grid2 container xs={12} alignItems="center" justifyContent="center" spacing={2}>
            <Grid2 xs={3}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                fullWidth
                label="Desc.Total"
                value={dataTemporalVentas.moneda?dataTemporalDetVentas.descUnitMontoME:dataTemporalDetVentas.descUnitMontoMN}
                name={dataTemporalVentas.moneda?"descUnitMontoME":"descUnitMontoMN"}
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={dataTemporalVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
                suffix=''
                size="small"
                customInput={TextField }
              />
            </Grid2>
            <Grid2 xs={3}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                fullWidth
                label="V.V.Neto Total"
                value={dataTemporalVentas.moneda?dataTemporalDetVentas.vvNetoTotME:dataTemporalDetVentas.vvNetoTotMN}
                name='vventanetototal'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={dataTemporalVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
                suffix=''
                size="small"
                customInput={TextField }
              />
            </Grid2>
            <Grid2 xs={3}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                fullWidth
                label="IGV Total"
                value={dataTemporalVentas.moneda?dataTemporalDetVentas.igvTotalME:dataTemporalDetVentas.igvTotalMN}
                name='igvtotal'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={dataTemporalVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
                suffix=''
                size="small"
                customInput={TextField }
              />
            </Grid2>
            <Grid2 xs={3}>
              <NumericFormat
                  fullWidth
                  margin='none'
                  variant='outlined'
                  disabled={true}
                  label="P.V.Total"
                  value={dataTemporalVentas.moneda?dataTemporalDetVentas.pvTotalME:dataTemporalDetVentas.pvTotalMN}
                  name={dataTemporalVentas.moneda?"pvTotalME":"pvTotalMN"}
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
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" size="small" onClick={handleCloseDetVentas}>Cancelar</Button>
        <Button variant="contained" color="success" size="small" onClick={handleSubmitDetVentas}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}
export default FichaDetVentasModal;
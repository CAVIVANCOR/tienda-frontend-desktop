/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, CardMedia, Card, CardContent, Typography, CardHeader, InputAdornment } from '@mui/material';
import 'moment/locale/es'; // Importa el idioma si lo necesitas
import axios from 'axios';
import { NumericFormat } from 'react-number-format';
import { useSelector } from 'react-redux';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {detectarDispositivo} from '../../../utilities/utilities';
import { Discount, Inventory, LocalOffer, Percent, PriceChange } from '@mui/icons-material';

function FichaDetVentasModal({ isOpen, onClose, setSelectedRowsDet, fichaDataDetVentas, setFichaDataDetVentas, fichaDataVentas }) {
  const [dataTemporalDetVentas, setDataTemporalDetVentas] = useState(fichaDataDetVentas);
  const datosGlobales = useSelector((state) => state.datosGlobales.data);
  const handleChange = (event) => {
    console.log("handleChange",event.target.name,event.target.value);
    setDataTemporalDetVentas({
        ...dataTemporalDetVentas,
        [event.target.name]: event.target.value,
    });
  };
  const grabarDetVentas = async () => {
    setFichaDataDetVentas(dataTemporalDetVentas);
    console.log("grabarDetVentas: dataTemporalDetVentas",dataTemporalDetVentas);
    const datosCodificados = {
      id: +dataTemporalDetVentas.id,
      cantidad: dataTemporalDetVentas.cantidad,
      vvUnitMN: dataTemporalDetVentas.vvUnitMN,
      vvUnitME: +dataTemporalDetVentas.vvUnitME,
      porcentajeDescUnit: +dataTemporalDetVentas.porcentajeDescUnit,
      descUnitMN: +dataTemporalDetVentas.descUnitMN,
      descUnitME: dataTemporalDetVentas.descUnitME,
      vvNetoUnitMN: +dataTemporalDetVentas.vvNetoUnitMN,
      vvNetoUnitME: +dataTemporalDetVentas.vvNetoUnitME,
      vvNetoTotMN: +dataTemporalDetVentas.vvNetoTotMN,
      vvNetoTotME: dataTemporalDetVentas.vvNetoTotME,
      igvUnitMN: +dataTemporalDetVentas.igvUnitMN,
      igvUnitME: +dataTemporalDetVentas.igvUnitME,
      igvTotalMN: dataTemporalDetVentas.igvTotalMN,
      igvTotalME: dataTemporalDetVentas.igvTotalME,
      pvUnitMN: dataTemporalDetVentas.pvUnitMN,
      pvUnitME: dataTemporalDetVentas.pvUnitME,
      pvTotalMN: dataTemporalDetVentas.pvTotalMN,
      pvTotalME: dataTemporalDetVentas.pvTotalME,
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
    try {
      let regDetVentasUpdated = await axios.put("http://localhost:3001/detVentas/update/"+datosCodificados.id, datosCodificados);
      console.log("regDetVentasUpdated",regDetVentasUpdated);
      if (!regDetVentasUpdated.data) console.log("Error: No se pudo Actualizar la Informacion de la Cabecera de Ventas");
    } catch (error) {
      console.log("Error: En la solicitud Backend, Servidor de Base de Datos NO Responde",error);
    }
    console.log("grabarDetVentas: datosCodificados",datosCodificados);
  }
  const handleSubmitDetVentas = async () => {
    // Aquí puedes manejar la lógica de guardar los cambios y cerrar el modal
    await grabarDetVentas();
    setSelectedRowsDet([]); // Deseleccionar el registro en el DataGrid
    onClose();
  };
  const handleCloseDetVentas = () => {
    setSelectedRowsDet([]); // Deseleccionar el registro en el DataGrid
    setFichaDataDetVentas({});
    onClose();
  };
//console.log("fichaDataVentas:", fichaDataVentas, fichaDataVentas.fecha,typeof fichaDataVentas.fecha);
const handleChangeDesc = (event, name)=>{
  setFichaDataDetVentas({
    ...dataTemporalDetVentas,
    [name]: event.floatValue
  });
};
//console.log("fichaDataDetVentas",fichaDataDetVentas,fichaDataDetVentas.Producto.urlFotoProducto, detectarDispositivo(), detectarDispositivo()==='Celular' ? 'column' : 'row');
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
            <Grid2 xs={3}>
              <TextField
                margin='none'
                variant='outlined'
                disabled={false}
                fullWidth
                label="Cantidad"
                value={dataTemporalDetVentas.cantidad}
                name='cantidad'
                type='number'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                size="small"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (<InputAdornment position="start">
                    <Inventory />
                  </InputAdornment>
                ),}}
              />
            </Grid2>
            <Grid2 xs={3}>
              <TextField
                margin='none'
                variant='outlined'
                disabled={false}
                fullWidth
                label="Desc.Monto Unit."
                value={fichaDataVentas.moneda?dataTemporalDetVentas.descUnitMontoME:dataTemporalDetVentas.descUnitMontoMN}
                name={fichaDataVentas.moneda?"descUnitMontoME":"descUnitMontoMN"}
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                size="small"
                InputProps={{
                  startAdornment: (<InputAdornment position="start">
                    <Discount />
                    {fichaDataVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
                  </InputAdornment>
                ),}}
                onChange={(values) => handleChangeDesc(values, fichaDataVentas.moneda?"descUnitMontoME":"descUnitMontoMN")}
              />
            </Grid2>
            <Grid2 xs={3}>
              <TextField
                margin='none'
                variant='outlined'
                disabled={false}
                fullWidth
                label="Desc.Unit.%"
                value={dataTemporalDetVentas.porcentajeDescUnit}
                name='porcentajeDescUnit'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                size="small"
                InputProps={{
                  startAdornment: (<InputAdornment position="start">
                    <Discount />
                    <Percent />
                  </InputAdornment>
                ),}}
                onChange={(values) => handleChangeDesc(values, "porcentajeDescUnit")}
                />
            </Grid2>
            <Grid2 xs={3}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                fullWidth
                label="Desc.Unit."
                value={fichaDataVentas.moneda?dataTemporalDetVentas.descUnitME:dataTemporalDetVentas.descUnitMN}
                name='descunit'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={fichaDataVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
                suffix=''
                className="campoInput"
                size="small"
                customInput={TextField }
                onValueChange={handleChange}
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
                value={fichaDataVentas.moneda?dataTemporalDetVentas.vvUnitME:dataTemporalDetVentas.vvUnitMN}
                name='vventaunit'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={fichaDataVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
                suffix=''
                className="campoInput"
                size="small"
                customInput={TextField }
                onValueChange={handleChange}
              />
            </Grid2>
            <Grid2 xs={3}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                fullWidth
                label="V.V.Neto Unit."
                value={fichaDataVentas.moneda?dataTemporalDetVentas.vvNetoUnitME:dataTemporalDetVentas.vvNetoUnitMN}
                name='vventanetounit'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={fichaDataVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
                suffix=''
                className="campoInput"
                size="small"
                customInput={TextField }
                onValueChange={handleChange}
              />
            </Grid2>
            <Grid2 xs={3}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                fullWidth
                label="IGV Unit."
                value={fichaDataVentas.moneda?dataTemporalDetVentas.igvUnitME:dataTemporalDetVentas.igvUnitMN}
                name='igvunit'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={fichaDataVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
                suffix=''
                className="campoInput"
                size="small"
                customInput={TextField }
                onValueChange={handleChange}
              />
            </Grid2>
            <Grid2 xs={3}>
              <TextField
                margin="none"
                variant="outlined"
                disabled={false}
                fullWidth
                label="P.V.Unit."
                value={fichaDataVentas.moneda ? dataTemporalDetVentas.pvUnitME : dataTemporalDetVentas.pvUnitMN}
                name={fichaDataVentas.moneda ? "pvUnitME" : "pvUnitMN"}
                type="number"
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                InputProps={{
                  startAdornment: (<InputAdornment position="start">
                    <LocalOffer />
                    {fichaDataVentas.moneda ? datosGlobales.descripCortaME : datosGlobales.descripCortaMN}
                  </InputAdornment>
                ),}}
                size="small"
                onChange={handleChange}
              />
            </Grid2>
          </Grid2>
          <Grid2 container xs={12} alignItems="center" justifyContent="center" spacing={2}>
            <Grid2 xs={4}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                fullWidth
                label="V.V.Neto Total"
                value={fichaDataVentas.moneda?dataTemporalDetVentas.vvNetoTotME:dataTemporalDetVentas.vvNetoTotMN}
                name='vventanetototal'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={fichaDataVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
                suffix=''
                size="small"
                customInput={TextField }
                onValueChange={handleChange}
              />
            </Grid2>
            <Grid2 xs={4}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                fullWidth
                label="IGV Total"
                value={fichaDataVentas.moneda?dataTemporalDetVentas.igvTotalME:dataTemporalDetVentas.igvTotalMN}
                name='igvtotal'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={fichaDataVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
                suffix=''
                size="small"
                customInput={TextField }
                onValueChange={handleChange}
              />
            </Grid2>
            <Grid2 xs={4}>
              <TextField
                margin='none'
                variant='outlined'
                disabled={false}
                fullWidth
                label="P.V.Total"
                value={fichaDataVentas.moneda?dataTemporalDetVentas.pvTotalME:dataTemporalDetVentas.pvTotalMN}
                name={fichaDataVentas.moneda?"pvTotalME":"pvTotalMN"}
                type='number'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                InputProps={{
                  startAdornment: (<InputAdornment position="start">
                    <LocalOffer />
                    {fichaDataVentas.moneda ? datosGlobales.descripCortaME : datosGlobales.descripCortaMN}
                  </InputAdornment>
                ),}}
                size="small"
                onChange={handleChange}
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
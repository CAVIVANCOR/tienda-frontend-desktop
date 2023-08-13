/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, CardMedia, Card, CardContent, Typography, CardHeader } from '@mui/material';
import './FichaDetVentasModal.css';
import 'moment/locale/es'; // Importa el idioma si lo necesitas
import axios from 'axios';
import { NumericFormat } from 'react-number-format';
import { useSelector } from 'react-redux';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
function FichaDetVentasModal({ isOpen, onClose, setSelectedRowsDet, fichaDataDetVentas, setFichaDataDetVentas, fichaDataVentas }) {
  const datosGlobales = useSelector((state) => state.datosGlobales.data);

  const handleChange = (event) => {
    setFichaDataDetVentas({
        ...fichaDataDetVentas,
        [event.target.name]: event.target.value,
    });
  };
  const grabarDetVentas = async () => {
    console.log("grabarDetVentas: fichaDataDetVentas",fichaDataDetVentas);
    const datosCodificados = {
      id: +fichaDataDetVentas.id,
      cantidad: fichaDataDetVentas.cantidad,
      vvUnitMN: fichaDataDetVentas.vvUnitMN,
      vvUnitME: +fichaDataDetVentas.vvUnitME,
      porcentajeDescUnit: +fichaDataDetVentas.porcentajeDescUnit,
      descUnitMN: +fichaDataDetVentas.descUnitMN,
      descUnitME: fichaDataDetVentas.descUnitME,
      vvNetoUnitMN: +fichaDataDetVentas.vvNetoUnitMN,
      vvNetoUnitME: +fichaDataDetVentas.vvNetoUnitME,
      vvNetoTotMN: +fichaDataDetVentas.vvNetoTotMN,
      vvNetoTotME: fichaDataDetVentas.vvNetoTotME,
      igvUnitMN: +fichaDataDetVentas.igvUnitMN,
      igvUnitME: +fichaDataDetVentas.igvUnitME,
      igvTotalMN: fichaDataDetVentas.igvTotalMN,
      igvTotalME: fichaDataDetVentas.igvTotalME,
      pvUnitMN: fichaDataDetVentas.pvUnitMN,
      pvUnitME: fichaDataDetVentas.pvUnitME,
      pvTotalMN: fichaDataDetVentas.pvTotalMN,
      pvTotalME: fichaDataDetVentas.pvTotalME,
      rutaFotoInstalacion01: fichaDataDetVentas.rutaFotoInstalacion01,
      rutaFotoInstalacion02: fichaDataDetVentas.rutaFotoInstalacion02,
      exonerado: +fichaDataDetVentas.exonerado,
      idApruebaDesc: +fichaDataDetVentas.idApruebaDesc,
      fechaApruebaDesc: +fichaDataDetVentas.fechaApruebaDesc,
      descUnitMontoMN: +fichaDataDetVentas.descUnitMontoMN,
      descUnitMontoME: +fichaDataDetVentas.descUnitMontoME,
      nroMesesGarantia: +fichaDataDetVentas.nroMesesGarantia,
      idPreciosCliProv: +fichaDataDetVentas.idPreciosCliProv,
      borradoLogico: +fichaDataDetVentas.borradoLogico,
      ProductoId: +fichaDataDetVentas.ProductoId,
      EstadoProdId: +fichaDataDetVentas.EstadoProdId,
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
  console.log("handleChangeDesc",event.floatValue,name)
  setFichaDataDetVentas({
    ...fichaDataDetVentas,
    [name]: event.floatValue
  });
};
//console.log("fichaDataDetVentas",fichaDataDetVentas,fichaDataDetVentas.Producto.urlFotoProducto);
const imgProducto = `http://localhost:3001${fichaDataDetVentas.Producto.urlFotoProducto}`;

  return (
    <Dialog className='dialogDetVentas' open={isOpen} fullWidth maxWidth="md">
      <DialogTitle className='dialogTitleDetVentas'>Ficha Detalle de Venta</DialogTitle>
      <DialogContent className='dialogContentDetVentas'>
        <Grid2 container spacing={2} justifyContent="center" alignItems="center" style={{margin: 'auto'}}>
          <Grid2 container item xs={12} alignItems="center" justifyContent="center" spacing={2}>
            <Grid2 xs={12}>
              <Card className='cardDetVentas'>
                <CardHeader align="center" title={fichaDataDetVentas.Producto.descripcion} subheader={"ID:"+fichaDataDetVentas.ProductoId}/>
                <CardMedia className='cardMediaDetVentas' component="img" src={imgProducto} title={fichaDataDetVentas.Producto.descripcion} />
                <CardContent className='cardContentDetVentas'>
                  <Typography sx={{marginBottom:2, marginTop:0, borderColor: 'primary.main'}}gutterBottom align="center" variant="subtitle1" color="textSecondary" component="h6">
                    Cod.Prov.: {fichaDataDetVentas.Producto.codigoProveedor}  Modelo: {fichaDataDetVentas.modeloFabricante}
                  </Typography>
                  <Grid2 container item xs={12} alignItems="center" justifyContent="center" spacing={2}>
                    <Grid2 xs={4}>
                      <NumericFormat
                        margin='none'
                        variant='outlined'
                        disabled={false}
                        label="Cantidad"
                        value={fichaDataDetVentas.cantidad}
                        name='cantidad'
                        thousandSeparator=","
                        decimalSeparator="."
                        decimalScale={2}
                        fixedDecimalScale
                        prefix={""}
                        suffix=''
                        className="campoInput"
                        size="small"
                        customInput={TextField }
                        onValueChange={handleChange}
                      />
                    </Grid2>
                    <Grid2 xs={4}>
                      <NumericFormat
                        margin='none'
                        variant='outlined'
                        disabled={false}
                        label="P.V.Unit."
                        value={fichaDataVentas.moneda?fichaDataDetVentas.pvUnitME:fichaDataDetVentas.pvUnitMN}
                        name='pvunit'
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
                </CardContent>
              </Card>
            </Grid2>           
          </Grid2>
          <Grid2 container item xs={12} alignItems="center" justifyContent="center" spacing={2}>
            <Grid2 xs={4}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                label="Desc.Unit."
                value={fichaDataVentas.moneda?fichaDataDetVentas.descUnitME:fichaDataDetVentas.descUnitMN}
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
            <Grid2 xs={4}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={false}
                label="Desc.Unit.%"
                value={fichaDataDetVentas.porcentajeDescUnit}
                name='porcentajeDescUnit'
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={""}
                suffix=''
                className="campoInput"
                size="small"
                customInput={TextField }
                onValueChange={(values) => handleChangeDesc(values, "porcentajeDescUnit")}
                />
            </Grid2>
            <Grid2 xs={4}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={false}
                label="Desc.Monto Unit."
                value={fichaDataVentas.moneda?fichaDataDetVentas.descUnitMontoME:fichaDataDetVentas.descUnitMontoMN}
                name={fichaDataVentas.moneda?"descUnitMontoME":"descUnitMontoMN"}
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                prefix={fichaDataVentas.moneda?datosGlobales.descripCortaME:datosGlobales.descripCortaMN}
                suffix=''
                className="campoInput"
                size="small"
                customInput={TextField }
                onValueChange={(values) => handleChangeDesc(values, fichaDataVentas.moneda?"descUnitMontoME":"descUnitMontoMN")}
              />
            </Grid2>
          </Grid2>
          <Grid2 container item xs={12} alignItems="center" justifyContent="center" spacing={2}>
            <Grid2 xs={4}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                label="V.V. Unit."
                value={fichaDataVentas.moneda?fichaDataDetVentas.vvUnitME:fichaDataDetVentas.vvUnitMN}
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
            <Grid2 xs={4}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                label="V.V.N. Unit."
                value={fichaDataVentas.moneda?fichaDataDetVentas.vvNetoUnitME:fichaDataDetVentas.vvNetoUnitMN}
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
            <Grid2 xs={4}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                label="IGV Unit."
                value={fichaDataVentas.moneda?fichaDataDetVentas.igvUnitME:fichaDataDetVentas.igvUnitMN}
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
          </Grid2>
          <Grid2 container item xs={12} alignItems="center" justifyContent="center" spacing={2}>
            <Grid2 xs={4}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                label="V.V.Neto"
                value={fichaDataVentas.moneda?fichaDataDetVentas.vvNetoTotME:fichaDataDetVentas.vvNetoTotMN}
                name='vventanetototal'
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
            <Grid2 xs={4}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={true}
                label="IGV Total"
                value={fichaDataVentas.moneda?fichaDataDetVentas.igvTotalME:fichaDataDetVentas.igvTotalMN}
                name='igvtotal'
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
            <Grid2 xs={4}>
              <NumericFormat
                margin='none'
                variant='outlined'
                disabled={false}
                label="P.V.Total"
                value={fichaDataVentas.moneda?fichaDataDetVentas.pvTotalME:fichaDataDetVentas.pvTotalMN}
                name='pvtotal'
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
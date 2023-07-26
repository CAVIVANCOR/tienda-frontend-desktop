/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import './FichaVentasModal.css';
function FichaVentasModal({ isOpen, onClose, selectedRow, setSelectedRow, setSelectedRows }) {
  const results = useSelector((state) => state.inicio.results);
  let objetoEncontrado = results.find(objeto => +objeto.id === +selectedRow.id);
  const [formData, setFormData] = useState(objetoEncontrado);

  const handleChange = (event) => {
    setFormData({
        ...formData,
        [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = () => {
    // Aquí puedes manejar la lógica de guardar los cambios y cerrar el modal
    setSelectedRow(null);
    setSelectedRows([]); // Deseleccionar el registro en el DataGrid
    onClose();
  };
  const handleClose = () => {
    setSelectedRow(null); // Deseleccionar el registro al cerrar el modal
    setSelectedRows([]); // Deseleccionar el registro en el DataGrid
    onClose();
  };
console.log("EditModal:", isOpen, onClose, selectedRow);
let valorVentaTotal = 0;
let descuentoTotal = 0;
let porcentajeDescuentoTotal = 0;
let valorVentaNetoTotal = 0;
let igvTotal = 0;
let precioVentaTotal = 0;
const cellStyle = {
  padding: '8px',
  backgroundColor: '#d8c690', // Cambiar el color de fondo de las celdas aquí
  border: '1px solid #e4e1e1', // Agregar un borde a las celdas
  fontSize: '10px'
};
console.log("results",results,"formData:", formData,selectedRow.id, results.find(objeto => +objeto.id === +selectedRow.id) );
  return (
    <Dialog open={isOpen} onClose={handleClose} PaperProps={{ style: { maxWidth: '1000px', maxHeight: 'calc(100vh - 200px)', overflow: 'hidden' } }}>
      <DialogTitle>Ficha de Venta</DialogTitle>
      <DialogContent style={{ maxHeight: 'calc(100vh - 300px)', overflow: 'hidden' }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{margin: 'auto'}}>
          <Grid container item xs={12} alignItems="center" justifyContent="center" spacing={2}>
            <Grid item xs={1} style={cellStyle}>
              <label >ID:</label>
            </Grid>
            <Grid item xs={2} style={cellStyle}>
              <input className="campoInput" type="number" name="id" value={formData.id} onChange={handleChange} />
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <label >Tipo Dcmto:</label>
            </Grid>
            <Grid item xs={2} style={cellStyle}>
              <input className="campoInput" type="text" name="tipoDcmto" value={formData.CorrelativoDoc.TipoDocumento.descripcion} onChange={handleChange} />
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <label >Serie:</label>
            </Grid>
            <Grid item xs={2} style={cellStyle}>
              <input className="campoInput" type="text" name="serieDcmto" value={formData.serieDcmto} onChange={handleChange} />
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <label >Correlativo:</label>
            </Grid>
            <Grid item xs={2} style={cellStyle}>
              <input className="campoInput" type="text" name="correlativoDcmto" value={formData.correlativoDcmto} onChange={handleChange} />
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems="center" justifyContent="center" spacing={2}>
            <Grid item xs={1} style={cellStyle}>
              <label >Fecha:</label>
            </Grid>
            <Grid item xs={2} style={cellStyle}>
              <input className="campoInput" type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <label >Cliente:</label>
            </Grid>
            <Grid item xs={4} style={cellStyle}>
              <input className="campoInput" type="text" name="cliente" value={formData.ClienteProveedor.razonSocial} onChange={handleChange} />
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <label >Forma Pago:</label>
            </Grid>
            <Grid item xs={3} style={cellStyle}>
              <input className="campoInput" type="text" name="formaPago" value={formData.FormaPago.descripcion} onChange={handleChange} />
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems="center" justifyContent="center" spacing={2}>
            <Grid item xs={1} style={cellStyle}>
              <label >Vendedor:</label>
            </Grid>
            <Grid item xs={2} style={cellStyle}>
              <input className="campoInput" type="number" name="idVendedor" value={formData.idVendedor} onChange={handleChange} />
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <label >Tecnico:</label>
            </Grid>
            <Grid item xs={2} style={cellStyle}>
              <input className="campoInput" type="number" name="idTecnico" value={formData.idTecnico} onChange={handleChange} />
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <label >Moneda:</label>
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <input className="campoInput" type="boolean" name="moneda" value={formData.moneda} onChange={handleChange} />
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <label >T/C:</label>
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <input className="campoInput" type="number" name="tipoCambio" value={formData.tipoCambio} onChange={handleChange} />
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <label >%IGV:</label>
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <input className="campoInput" type="number" name="porcentajeIGV" value={formData.porcentajeIGV} onChange={handleChange} />
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems="center" justifyContent="center" spacing={2}>
            <Grid item xs={1} style={cellStyle}>
              <label >V.Venta:</label>
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <input className="campoInput" type="number" name="valorVentaTotal" value={valorVentaTotal} onChange={handleChange} />
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <label >Descuento:</label>
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <input className="campoInput" type="number" name="descuentoTotal" value={descuentoTotal} onChange={handleChange} />
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <label >% Descuento:</label>
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <input className="campoInput" type="number" name="porcentajeDescuentoTotal" value={porcentajeDescuentoTotal} onChange={handleChange} />
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <label >V.V.Neto:</label>
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <input className="campoInput" type="number" name="valorVentaNetoTotal" value={valorVentaNetoTotal} onChange={handleChange} />
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <label >IGV:</label>
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <input className="campoInput" type="number" name="igvTotal" value={igvTotal} onChange={handleChange} />
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <label >P.Venta:</label>
            </Grid>
            <Grid item xs={1} style={cellStyle}>
              <input className="campoInput" type="number" name="precioVentaTotal" value={precioVentaTotal} onChange={handleChange} />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default FichaVentasModal;

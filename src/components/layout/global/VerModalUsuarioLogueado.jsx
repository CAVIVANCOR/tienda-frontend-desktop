/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material';

function VerModalUsuarioLogueado({ isOpen, onClose, usuarioLogueado, imageUsuarioLogueadoUrl }) {
  const cellStyle = {
    padding: '8px',
    backgroundColor: '#d8c690', // Cambiar el color de fondo de las celdas aquí
    border: '1px solid #e4e1e1', // Agregar un borde a las celdas
    fontSize: '10px'
  };
  const imageStyle = {
    borderRadius: '50%', // Aplicar el border-radius a la imagen
    width: '128px', // Ajustar el ancho de la imagen según tus necesidades
    height: '128px', // Ajustar la altura de la imagen según tus necesidades
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>Usuario Logueado</DialogTitle>
      <DialogContent >
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ margin: 'auto',maxWidth: '380px' }}>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <img className="foto-usuario" src={imageUsuarioLogueadoUrl} alt="Foto Usuario" style={imageStyle}/>
          </Grid>
          <Grid item xs={2} style={cellStyle}>
            <strong>Nombre:</strong>
          </Grid>
          <Grid item xs={10} style={cellStyle}>
            {usuarioLogueado.Personal.nombres}
          </Grid>
          <Grid item xs={2} style={cellStyle}>
            <strong>Rol:</strong>
          </Grid>
          <Grid item xs={10} style={cellStyle}>
            {usuarioLogueado.Rol.descripcion}
          </Grid>
          <Grid item xs={2} style={cellStyle}>
            <strong>Email:</strong>
          </Grid>
          <Grid item xs={10} style={cellStyle}>
            {usuarioLogueado.Personal.email}
          </Grid>
          <Grid item xs={4} style={cellStyle}>
            <strong>Tipo de Documento:</strong>
          </Grid>
          <Grid item xs={4} style={cellStyle}>
            {`${usuarioLogueado.Personal.TipoDocIdentidad.iniciales}`}
          </Grid>
          <Grid item xs={4} style={cellStyle}>
            {`${usuarioLogueado.Personal.nroDocIdentidad}`}
          </Grid>
          <Grid item xs={4} style={cellStyle}>
            <strong>Almacen Asignado:</strong>
          </Grid>
          <Grid item xs={1} style={cellStyle}>
            {`${usuarioLogueado.AlmacenId}`}
          </Grid>
          <Grid item xs={7} style={cellStyle}>
            {`${usuarioLogueado.Almacen.descripcion}`}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default VerModalUsuarioLogueado;
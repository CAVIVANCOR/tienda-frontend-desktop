/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
function VerUsuarioLogueadoModal({ isOpen, onClose, usuarioLogueado, imageUsuarioLogueadoUrl }) {
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
        <Grid2 container spacing={2} justifyContent="center" alignItems="center" style={{ margin: 'auto',maxWidth: '380px' }}>
          <Grid2 xs={12} sx={{ textAlign: 'center' }}>
            <img className="foto-usuario" src={imageUsuarioLogueadoUrl} alt="Foto Usuario" style={imageStyle}/>
          </Grid2>
          <Grid2 xs={2} style={cellStyle}>
            <strong>Nombre:</strong>
          </Grid2>
          <Grid2 xs={10} style={cellStyle}>
            {usuarioLogueado.Personal.nombres}
          </Grid2>
          <Grid2 xs={2} style={cellStyle}>
            <strong>Rol:</strong>
          </Grid2>
          <Grid2 xs={10} style={cellStyle}>
            {usuarioLogueado.Rol.descripcion}
          </Grid2>
          <Grid2 xs={2} style={cellStyle}>
            <strong>Email:</strong>
          </Grid2>
          <Grid2 xs={10} style={cellStyle}>
            {usuarioLogueado.Personal.email}
          </Grid2>
          <Grid2 xs={4} style={cellStyle}>
            <strong>Tipo de Documento:</strong>
          </Grid2>
          <Grid2 xs={4} style={cellStyle}>
            {`${usuarioLogueado.Personal.TipoDocIdentidad.iniciales}`}
          </Grid2>
          <Grid2 xs={4} style={cellStyle}>
            {`${usuarioLogueado.Personal.nroDocIdentidad}`}
          </Grid2>
          <Grid2 xs={4} style={cellStyle}>
            <strong>Almacen Asignado:</strong>
          </Grid2>
          <Grid2 xs={1} style={cellStyle}>
            {`${usuarioLogueado.AlmacenId}`}
          </Grid2>
          <Grid2 xs={7} style={cellStyle}>
            {`${usuarioLogueado.Almacen.descripcion}`}
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}
export default VerUsuarioLogueadoModal;
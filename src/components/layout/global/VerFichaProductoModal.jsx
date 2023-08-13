/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CardContent, CardHeader, CardMedia, Card, Grid } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

function VerFichaProductoModal({ isOpen, onClose, props }) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle align="center">PRODUCTO (ID:{props.dataCompleta.id})</DialogTitle>
      <DialogContent >
        <Card sx={{maxWidth: 445 , margin: 'auto' }}>
            <CardHeader align="center" title={props.dataCompleta.descripcion}/>
            <CardMedia 
                component="img"
                alt="Foto del Producto"
                height="140"
                image={props.urlFotoProducto}
            />
            <CardContent>
                <Grid2 container align="center" spacing={1} sx={{ '--Grid-borderWidth': '1px', borderTop: '1px solid', borderLeft: '1px solid', borderColor: 'divider', '& > div': { borderRight: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}} columns={{ xs: 2, sm: 2, md: 2 }}>
                    <Grid2 xs={1} sm={1} md={1}>
                        <Typography variant='caption'>Familia</Typography>
                        <Typography variant='h6'>{props.dataCompleta.SubFamilium.Familium.descripcion}</Typography>
                    </Grid2>
                    <Grid2 xs={1} sm={1} md={1}>
                        <Typography variant='caption'>SubFamilia</Typography>
                        <Typography variant='h6'>{props.dataCompleta.SubFamilium.descripcion}</Typography>
                    </Grid2>
                    <Grid2 xs={1} sm={1} md={1}>
                        <Typography variant='caption'>Marca</Typography>
                        <Typography variant='h6'>{props.dataCompleta.ModeloMarca.Marca.descripcion}</Typography>
                    </Grid2>
                    <Grid2 xs={1} sm={1} md={1}>
                        <Typography variant='caption'>Modelo</Typography>
                        <Typography variant='h6'>{props.dataCompleta.ModeloMarca.descripcion}</Typography>
                    </Grid2>
                    <Grid2 xs={1} sm={1} md={1}>
                        <Typography variant='caption'>Color</Typography>
                        <Typography variant='h6'>{props.dataCompleta.Colore.descripcion}</Typography>
                    </Grid2>
                    <Grid2 xs={1} sm={1} md={1}>
                        <Typography variant='caption'>Material</Typography>
                        <Typography variant='h6'>{props.dataCompleta.Materiale.descripcion}</Typography>
                    </Grid2>
                    <Grid2 xs={1} sm={1} md={1}>
                        <Typography variant='caption'>Año</Typography>
                        <Typography variant='h6'>{props.dataCompleta.Ano.descripcion}</Typography>
                    </Grid2>
                    <Grid2 xs={1} sm={1} md={1}>
                        <Typography variant='caption'>Procedencia</Typography>
                        <Typography variant='h6'>{props.dataCompleta.Procedencium.descripcion}</Typography>
                    </Grid2>
                    <Grid2 xs={1} sm={1} md={1}>
                        <Typography variant='caption'>Lado</Typography>
                        <Typography variant='h6'>{props.dataCompleta.Lado.descripcion}</Typography>
                    </Grid2>
                    <Grid2 xs={1} sm={1} md={1}>
                        <Typography variant='caption'>Unid.Medida</Typography>
                        <Typography variant='h6'>{props.dataCompleta.UMProd.descripcion}</Typography>
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>
    </DialogContent>
    <DialogActions>
        <Button variant='contained' onClick={onClose}>Cerrar</Button>
    </DialogActions>
    </Dialog>
);
}
export default VerFichaProductoModal;

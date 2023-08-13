/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CardContent, CardHeader, CardMedia, Card, Grid } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

function VerStockModal({ isOpen, onClose, props, stockAlmacenes }) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle align="center">STOCKS (ID:{props.dataCompleta.id})</DialogTitle>
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
                        <Typography variant='caption'>Cod. Proveedor</Typography>
                        <Typography variant='h6'>{props.dataCompleta.codigoProveedor ? props.dataCompleta.codigoProveedor : 'S/C' }</Typography>
                    </Grid2>
                    <Grid2 xs={1} sm={1} md={1}>
                        <Typography variant='caption'>Mod. Fabricante</Typography>
                        <Typography variant='h6'>{props.dataCompleta.modeloFabricante ? props.dataCompleta.modeloFabricante : 'S/C' }</Typography>
                    </Grid2>
                    {stockAlmacenes.map((alm, id) => {
                        return (
                                <Grid2 xs={1} sm={1} md={1} lg={1} xl={1} key={id}>
                                    <Typography variant='caption'>{alm.descripcion}</Typography>
                                    <Typography variant='h6'>{alm.stock}</Typography>
                                </Grid2>
                            );
                        })}
                </Grid2>
            </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
export default VerStockModal;
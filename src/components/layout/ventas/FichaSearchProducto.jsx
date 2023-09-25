/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Box, DialogActions } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ContentControllers from '../../layout/inicio/ContentControllers';
import ContentData from '../../layout/inicio/ContentData';
import ContentTotals from '../../layout/inicio/ContentTotals';
import { useDispatch, useSelector } from 'react-redux';
import { setIdAlmacenStockVentas, setRegProdStockVentas, setSelectVentas, setStockVentas } from '../../../redux/features/task/ventas';
function FichaSearchProducto({ isOpen, onClose, setFichaDataDetVentas, setOpenMessageUser,setDataTemporalDetVentas, dataTemporalDetVentas, dataTemporalVentas }) {
  const regProductoSelectVentas = useSelector((state) => state.ventas.regProductoSelectVentas);
  const stockProductoSelectVentas = useSelector((state) => state.ventas.stockProductoSelectVentas);
  const dispatch = useDispatch();
  dispatch(setSelectVentas(true));
  const handleCloseSearchProducto = () => {
    dispatch(setIdAlmacenStockVentas(0));
    dispatch(setStockVentas(0));
    dispatch(setRegProdStockVentas({}));
    onClose();
  };
  const handleSeleccionarProducto = async (e) => {
    if (regProductoSelectVentas) {
      let regProductoElegido = regProductoSelectVentas;
      console.log("regProductoElegido=======>", regProductoElegido);
      setOpenMessageUser(true);
      let descAplicarAntesIGV = 0.00;
      let factorProrrateo = 0.00;
      let porcentajeDescUnit = 0.00;
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
      let cantidad=1;
      if (dataTemporalVentas.moneda){
        descUnitMontoME=+descAplicarAntesIGV;
        vvUnitME=(+regProductoElegido.valorVentaUnitME);
        descUnitME=((+vvUnitME)*(+factorProrrateo));
        vvNetoUnitME = (+vvUnitME)-(+descUnitME);
        igvUnitME = (+vvNetoUnitME)*(+dataTemporalVentas.porcentajeIGV/100);
        pvUnitME = vvNetoUnitME+igvUnitME
        vvNetoTotME=(+vvNetoUnitME)*(+cantidad);
        igvTotalME=(+vvNetoTotME)*(+dataTemporalVentas.porcentajeIGV/100);
        pvTotalME=(+vvNetoTotME)+(+igvTotalME);
        descUnitMontoMN=(+descUnitMontoME)*(+dataTemporalVentas.tipoCambio);
        vvUnitMN=(+vvUnitME)*(+dataTemporalVentas.tipoCambio);
        descUnitMN=(+descUnitME)*(+dataTemporalVentas.tipoCambio);
        vvNetoUnitMN = (+vvUnitMN)-(+descUnitMN);
        igvUnitMN = (+vvNetoUnitMN)*(+dataTemporalVentas.porcentajeIGV/100);
        pvUnitMN = vvNetoUnitMN+igvUnitMN
        vvNetoTotMN=(+vvNetoUnitMN)*(+cantidad);
        igvTotalMN=(+vvNetoTotMN)*(+dataTemporalVentas.porcentajeIGV/100);
        pvTotalMN=(+vvNetoTotMN)+(+igvTotalMN);
      } else {
        descUnitMontoMN=+descAplicarAntesIGV;
        vvUnitMN=(+regProductoElegido.valorVentaUnitMN);
        descUnitMN=((+vvUnitMN)*(+factorProrrateo));
        vvNetoUnitMN = (+vvUnitMN)-(+descUnitMN);
        igvUnitMN = (+vvNetoUnitMN)*(+dataTemporalVentas.porcentajeIGV/100);
        pvUnitMN = vvNetoUnitMN+igvUnitMN
        vvNetoTotMN=(+vvNetoUnitMN)*(+cantidad);
        igvTotalMN=(+vvNetoTotMN)*(+dataTemporalVentas.porcentajeIGV/100);
        pvTotalMN=(+vvNetoTotMN)+(+igvTotalMN);
        descUnitMontoME=(+descUnitMontoMN)/(+dataTemporalVentas.tipoCambio);
        vvUnitME=(+vvUnitMN)/(+dataTemporalVentas.tipoCambio);
        descUnitME=(+descUnitMN)/(+dataTemporalVentas.tipoCambio);
        vvNetoUnitME = (+vvUnitME)-(+descUnitME);
        igvUnitME = (+vvNetoUnitME)*(+dataTemporalVentas.porcentajeIGV/100);
        pvUnitME = vvNetoUnitME+igvUnitME
        vvNetoTotME=(+vvNetoUnitME)*(+cantidad);
        igvTotalME=(+vvNetoTotME)*(+dataTemporalVentas.porcentajeIGV/100);
        pvTotalME=(+vvNetoTotME)+(+igvTotalME);
      }
      let regDetVentaActualizado={
        ...dataTemporalDetVentas,
        ProductoId: +regProductoElegido.id,
        Producto:regProductoElegido,
        cantidad: +cantidad,
        vvUnitMN: +vvUnitMN,
        vvUnitME: +vvUnitME,
        porcentajeDescUnit:+porcentajeDescUnit,
        descUnitMN: +descUnitMN,
        descUnitME:+descUnitME,
        vvNetoUnitMN: +vvNetoUnitMN,
        vvNetoUnitME: +vvNetoUnitME,
        vvNetoTotMN: +vvNetoTotMN,
        vvNetoTotME: +vvNetoTotME,
        igvUnitMN: +igvUnitMN,
        igvUnitME: +igvUnitME,
        igvTotalMN: +igvTotalMN,
        igvTotalME: +igvTotalME,
        pvUnitMN: +pvUnitMN,
        pvUnitME: +pvUnitME,
        pvTotalMN: +pvTotalMN,
        pvTotalME: +pvTotalME,
        idApruebaDesc: 0,
        descUnitMontoMN: +descUnitMontoMN,
        descUnitMontoME: +descUnitMontoME,
        idPreciosCliProv: 0,
      }
      setDataTemporalDetVentas(regDetVentaActualizado);
      setFichaDataDetVentas(regDetVentaActualizado);
      onClose();
    }
  }
return (
    <Dialog fullWidth maxWidth="xl" open={isOpen} onClose={handleCloseSearchProducto}>
      <DialogTitle>Buscar Producto</DialogTitle>
      <DialogContent>
        <Box sx={{ flexGrow: 1, maxWidth: '100%' }}>
          <Grid2 xs={12} container spacing={2} >
            <Grid2 xs={12}>
              <ContentControllers />
            </Grid2>
            <Grid2 xs={12}>
              <ContentData />
            </Grid2>
            <Grid2 xs={12}>
              <ContentTotals />
            </Grid2>
          </Grid2>
        </Box>
      </DialogContent>
      <DialogActions>
        {stockProductoSelectVentas>0 && <Button variant="contained" onClick={handleSeleccionarProducto} color='warning'>Aplicar</Button>}
        <Button variant="contained" onClick={handleCloseSearchProducto} color='error'>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}
export default FichaSearchProducto;
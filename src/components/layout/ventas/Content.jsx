/* eslint-disable no-unused-vars */
import React from 'react';
import ContentControllers from './ContentControllers';
import { useSelector } from 'react-redux';
import ListaVentasTableGrid from './ListaVentasTableGrid';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/material';
function Content() {
  let results = useSelector((state) => state.inicio.results);
  console.log("Entro a Content de Ventas");
  return (
    <Box position={"sticky"} sx={{ flexGrow: 1 }}>
      <Grid2 xs={12} container spacing={2} >
        <Grid2 xs={12}>
          <ContentControllers />
        </Grid2>
        <Grid2 xs={12}>
          {results && results.length > 0 && <ListaVentasTableGrid />}
        </Grid2>
      </Grid2>
    </Box>
  )
}
export default Content;
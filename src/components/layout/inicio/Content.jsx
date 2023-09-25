/* eslint-disable no-unused-vars */
import React from 'react';
import ContentControllers from '../../layout/inicio/ContentControllers';
import ContentData from '../../layout/inicio/ContentData';
import ContentTotals from '../../layout/inicio/ContentTotals';
import { Box } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
function Content() {
  console.log("Entro a Content de Inicio");
  return (
    <Box sx={{ flexGrow: 1 }}>
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
  )
}
export default Content;
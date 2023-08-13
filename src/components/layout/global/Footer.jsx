/* eslint-disable no-unused-vars */
import React from 'react';
import imagenLogo13 from '../../../icons/logoCuadrado.png';
import { Avatar, Box, Container, Link, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 1,
        mt: 0.5,
        mb: 0.5,
        borderRadius: "1.5rem",
      }}>
      <Container maxWidth="lg">
        <Grid2 container spacing={5}>
          <Grid2 align="center" xs={12} sm={4}>
            <Avatar align="center" sx={{ width: 56, height: 56 }} alt="Logo Empresa" src={imagenLogo13} />
            <Typography variant="caption" color="text.secondary" align="center">
              {"Copyright © "}
              <Link color="inherit" href="https://www.13elfuturohoy.com/">wwww.13elfuturohoy.com</Link>
              {" "}{new Date().getFullYear()}{"."}
            </Typography>
          </Grid2>
          <Grid2 xs={12} sm={4}>
            <Typography variant="subtitle2" color="text.primary" gutterBottom>
              Acerca de
            </Typography>
            <Typography variant="caption" color="text.secondary">
              En 13 El Futuro Hoy, escuchamos tus necesidades, desarrollamos soluciones a la medida, aplicando lo ultimo en tecnología
            </Typography>
          </Grid2>
          <Grid2 xs={12} sm={4}>
            <Typography variant="subtitle2" color="text.primary" gutterBottom>
              Contactenos
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Email: sistemas.cavr@13elfuturohoy.com, sistemas.cavr@gmail.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +51 949101509
            </Typography>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
    )
}
export default Footer
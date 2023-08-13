import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { inicializarInicio } from '../../../redux/features/task/inicio';
import { logout } from "../../../redux/features/task/login";
import { useState } from 'react';
import VerUsuarioLogueadoModal from './VerUsuarioLogueadoModal';

function ResponsiveAppBar() {
  const pages = ['Inicio', 'PuntoVenta','Ventas', 'Compras','Cobrar','Pagar', 'Almacen', 'Caja', 'Gerencia'];
  const settings = ['Profile', 'Dashboard', 'Logout'];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mostrarVentanaModal, setMostrarVentanaModal] = useState(false);
  const usuarioLogueado = useSelector((state) => state.login.user);
  let datosEmpresa = useSelector((state) => state.datosGlobales.data);
  const imageLogoEmpresaUrl = `http://localhost:3001${datosEmpresa.urlLogoEmpresa}`;
  const imageUsuarioLogueadoUrl = `http://localhost:3001${usuarioLogueado.Personal.urlFoto}`;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenNavMenuItem = (event) => {
    dispatch(inicializarInicio());
    navigate("/"+event.target.firstChild.data.toLowerCase());
    console.log("handleOpenNavMenuItem",event.target.firstChild.data);
    handleCloseNavMenu();
  };
  const handleOpenProfileItem = (event, index) => {
    console.log("handleOpenProfileItem", settings[index], index);
    switch (settings[index]) {
      case 'Profile':
        console.log("Entro al Switch Profile");
        handleAbrirVentanaModalProfile();
        break;
      case 'Dashboard':
        // handleAbrirVentanaModalProfile();
        break;
      case 'Logout':
        dispatch(logout()); 
        navigate("/");
        break;
      default:
        break;
    }
    handleCloseUserMenu();
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleAbrirVentanaModalProfile = () => {
    setMostrarVentanaModal(true);
  };
  const handleCerrarVentanaModalProfile = () => {
    setMostrarVentanaModal(false);
  };
  return (
      <AppBar position="sticky" sx={{ backgroundColor: '#A9A9A9', borderRadius: '1.5rem' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Inicio: Menu para Pantallas Pequeñas: Tablets y Celulares */}
            <Avatar sx={{ width: 56, height: 56, display: { xs: 'flex', md: 'none'} }} alt="Logo Empresa" src={imageLogoEmpresaUrl} />
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="primary">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}>
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleOpenNavMenuItem}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* Fin: Menu para Pantallas Pequeñas: Tablets y Celulares */}  
            {/* Inicio: Menu para Pantallas Grandes: Desktop y Laptops */}  
            <Avatar sx={{ width: 56, height: 56, display: { xs: 'none', md: 'flex'} }} alt="Logo Empresa" src={imageLogoEmpresaUrl} />
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
              {pages.map((page) => (
                <Button  size="small" variant="outlined" key={page} onClick={handleOpenNavMenuItem} sx={{ my: 2, color: 'white', display: 'block' }}>{page}</Button>
              ))}
            </Box>
            {/* Fin: Menu para Pantallas Grandes: Desktop y Laptops */}  
            {/* Inicio: Menu Profile */}  
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Menu Usuario">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ width: 56, height: 56 }} alt="Profile Usuario" src={imageUsuarioLogueadoUrl} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting, index) => (
                  <MenuItem 
                    key={index} 
                    onClick={(event)=>handleOpenProfileItem(event,index)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* Fin: Menu Profile */}  
          </Toolbar>
        </Container>
        {mostrarVentanaModal && (<VerUsuarioLogueadoModal 
                                  isOpen={mostrarVentanaModal}
                                  onClose={handleCerrarVentanaModalProfile}
                                  usuarioLogueado={usuarioLogueado}
                                  imageUsuarioLogueadoUrl={imageUsuarioLogueadoUrl}
                                />)}
      </AppBar>
  );
}
export default ResponsiveAppBar;
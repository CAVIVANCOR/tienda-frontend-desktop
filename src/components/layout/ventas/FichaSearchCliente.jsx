/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, TextField, Autocomplete } from '@mui/material';
import axios from 'axios';
import { ExitToApp, Search } from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

function FichaSearchCliente({ isOpen, onClose, fichaDataVentas, setFichaDataVentas, setOpenMessageUser }) {
    const [searchClienteNombres, setSearchClienteNombres] = useState("");
    const [searchClienteRuc, setSearchClienteRuc] = useState("");
    const [regClientesEncontrados, setRegClientesEncontrados] = useState([]);
    const [listaClientesEncontrados, setListaClientesEncontrados] = useState([]);
const handleCloseSearchCliente = () => {
        onClose();
        setSearchClienteNombres("");
        setSearchClienteRuc("");
        setRegClientesEncontrados([]);
        setListaClientesEncontrados([]);
      }
const handleChangeCliente = (event) => {
  if (event.target.id==='searchClienteNombres') setSearchClienteNombres(event.target.value);
  if (event.target.id==='searchClienteRuc') setSearchClienteRuc(event.target.value);
}
const handleSearchCliente = async () => {
  let datosCodificados = {};
  if (searchClienteNombres!=="") datosCodificados.razonSocial = searchClienteNombres;
  if (searchClienteRuc!=="") datosCodificados.numDocIdentidad = searchClienteRuc; 
  if (!datosCodificados) return;
  try {
    let regEncontrados = await axios.post("http://localhost:3001/clientesProveedores/search", datosCodificados);
    if (!regEncontrados) console.log("Error: No se encontro el Cliente o Proveedor");
    setRegClientesEncontrados(regEncontrados);
    let dataFiltradaClientes = regEncontrados.data.map(obj => {
      return {
        label: obj.razonSocial,
        id: obj.id
      };
    });
    setListaClientesEncontrados(dataFiltradaClientes);
  } catch (error) {
    console.log("Error: En la solicitud Backend, Servidor de Base de Datos NO Responde",error);
  }
}
const handleSeleccionarCliente = async (e) => {
  const labelBuscado = e.target.value;
  const elementoEncontrado = listaClientesEncontrados.find(obj => obj.label === labelBuscado);
  if (elementoEncontrado) {
    setOpenMessageUser(true);
    setFichaDataVentas({
      ...fichaDataVentas,
      ClienteProveedorId: +elementoEncontrado.id,
      ClienteProveedor:regClientesEncontrados.data.find(obj => obj.id === elementoEncontrado.id)
    });
    setSearchClienteNombres("");
    setSearchClienteRuc("");
    onClose();
  }
}
  return (
    <Dialog open={isOpen} onClose={handleCloseSearchCliente}>
        <DialogTitle>Buscar Cliente</DialogTitle>
        <DialogContent>
            <Grid2 container xs={12} alignItems="center" justifyContent="center" spacing={0.5} sx={{mt:1,mb:1}}>
            <Grid2 xs={12} sx={{mb:1}}>
                <TextField fullWidth id="searchClienteNombres" label="Por Razón Social" type="search" variant="outlined" size="large" value={searchClienteNombres} onChange={handleChangeCliente} />
            </Grid2>
            <Grid2 xs={12} sx={{mb:1}}>
                <TextField fullWidth id="searchClienteRuc" label="Por RUC/DNI" type="search" variant="outlined" size="large" value={searchClienteRuc} onChange={handleChangeCliente} />
            </Grid2>
            <Grid2 xs={12} sx={{mb:1}}>
                <Button variant="contained" size="large" color="success" startIcon={<Search />} onClick={handleSearchCliente}>Buscar</Button>
            </Grid2>
            <Grid2 xs={12} sx={{mb:1}}>
                <Autocomplete 
                fullWidth
                disablePortal 
                id="combo-box-searchCliente" 
                options={listaClientesEncontrados} 
                autoHighlight
                getOptionLabel={(option) => `${option.label}`}
                sx={{ mb: 40,width:"550px"}}
                renderInput={(params) => <TextField {...params} label="Resultado Busqueda" variant="outlined" size="small" onSelect={(e) => handleSeleccionarCliente(e)}/>}
                />
            </Grid2>
            <Grid2 xs={12} sx={{mb:1}}>
                <Button variant="contained" size="large" color="error" startIcon={<ExitToApp />} onClick={handleCloseSearchCliente}>Cancelar</Button>
            </Grid2>
            </Grid2>
        </DialogContent>
    </Dialog>
  );
}
export default FichaSearchCliente;
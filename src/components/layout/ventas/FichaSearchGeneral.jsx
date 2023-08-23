/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, TextField, Autocomplete } from '@mui/material';
import axios from 'axios';
import { ExitToApp, Search } from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

function FichaSearchGeneral({ titulo, isOpen, onClose, fichaDataVentas, setFichaDataVentas, setOpenMessageUser, rutaPost, campoLabel, campoId, campoObjecto }) {
    const [searchDescripcion, setSearchDescripcion] = useState("");
    const [regEncontrados, setRegEncontrados] = useState([]);
    const [listaEncontrados, setListaEncontrados] = useState([]);
const handleCloseSearch = () => {
        onClose();
        setSearchDescripcion("");
        setRegEncontrados([]);
        setListaEncontrados([]);
      }
const handleChange = (event) => {
  if (event.target.id==='searchDescripcion') setSearchDescripcion(event.target.value);
}
const handleSearch = async () => {
  console.log("Entro handleSearch",searchDescripcion, rutaPost, campoId, campoObjecto);
  let datosCodificados = {};
  if (searchDescripcion!=="") datosCodificados={...datosCodificados,[campoLabel]:searchDescripcion};
  if (!datosCodificados) return;
  try {
    let regs = await axios.post(rutaPost, datosCodificados);
    if (!regs) console.log("Error: No se encontraron Registros");
    setRegEncontrados(regs);
    let dataFiltrada = regs.data.map(obj => {
      return {
        label: obj[campoLabel],
        id: obj.id
      };
    });
    setListaEncontrados(dataFiltrada);
  } catch (error) {
    console.log("Error: En la solicitud Backend, Servidor de Base de Datos NO Responde",error);
  }
};
const handleSeleccionar = async (e) => {
  const labelBuscado = e.target.value;
  const elementoEncontrado = listaEncontrados.find(obj => obj.label === labelBuscado);
  if (elementoEncontrado) {
    setOpenMessageUser(true);
    if (campoObjecto){
      setFichaDataVentas({
        ...fichaDataVentas,
        [campoId]: +elementoEncontrado.id,
        [campoObjecto]:regEncontrados.data.find(obj => obj.id === elementoEncontrado.id)
      });
    } else {
      setFichaDataVentas({
        ...fichaDataVentas,
        [campoId]: +elementoEncontrado.id
      });
    }
    setSearchDescripcion("");
    onClose();
  }
};
  return (
    <Dialog open={isOpen} onClose={handleCloseSearch}>
        <DialogTitle>{titulo}</DialogTitle>
        <DialogContent>
            <Grid2 container xs={12} alignItems="center" justifyContent="center" spacing={0.5} sx={{mt:1,mb:1}}>
            <Grid2 xs={12} sx={{mb:1}}>
                <TextField fullWidth id="searchDescripcion" label="Por Descripción" type="search" variant="outlined" size="large" value={searchDescripcion} onChange={handleChange} />
            </Grid2>
            <Grid2 xs={12} sx={{mb:1}}>
                <Button variant="contained" size="large" color="success" startIcon={<Search />} onClick={handleSearch}>Buscar</Button>
            </Grid2>
            <Grid2 xs={12} sx={{mb:1}}>
                <Autocomplete 
                fullWidth
                disablePortal 
                id="combo-box-searchCliente" 
                options={listaEncontrados} 
                autoHighlight
                getOptionLabel={(option) => `${option.label}`}
                sx={{ mb: 40,width:"550px"}}
                renderInput={(params) => <TextField {...params} label="Resultado Busqueda" variant="outlined" size="small" onSelect={(e) => handleSeleccionar(e)}/>}
                />
            </Grid2>
            <Grid2 xs={12} sx={{mb:1}}>
                <Button variant="contained" size="large" color="error" startIcon={<ExitToApp />} onClick={handleCloseSearch}>Cancelar</Button>
            </Grid2>
            </Grid2>
        </DialogContent>
    </Dialog>
  );
}
export default FichaSearchGeneral;
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import SearchBar from '../../layout/global/SearchBar';
import axios from "axios";
import { setInputSearch, setInputCodigoBarras, setResults, inicializarInicio } from '../../../redux/features/task/inicio';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

function ContentControllers() {
  const inicioInputSearch = useSelector((state) => state.inicio.inputSearch);
  const inicioInputCodigoBarras = useSelector((state) => state.inicio.inputCodigoBarras);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Entro a ContentControllers de Inicio USEEFFECT inicioInputSearch",inicioInputSearch);
    if (inicioInputSearch!==""){
      buscarProducto({descripcion:inicioInputSearch});
    }else{
      handleCleanClick();
    }
  }, [inicioInputSearch]);

  useEffect(() => {
    console.log("Entro a ContentControllers de Inicio USEEFFECT inicioInputCodigoBarras",inicioInputCodigoBarras);
    if (inicioInputCodigoBarras!==""){
      buscarProducto({codigoProveedor:inicioInputCodigoBarras});
    }else{
      handleCleanClick();
    }
  }, [inicioInputCodigoBarras]);
  const buscarProducto = async (buscar) => {
      try {
            let response = await axios.post("http://localhost:3001/productos/search", buscar);
            if (response.data.length > 0) {
              dispatch(setResults(response.data));
            } else {
                console.log("Error: No se encontro ningun registro");
                handleCleanClick();
            }
      } catch (error) {
          console.log("Error: En la solicitud Backend, Servidor de Base de Datos NO Responde",error);
      }
  };
  const handleCleanClick = () => {
    dispatch(inicializarInicio());
  };
console.log("Entro a ContentControllers de Inicio");
  return (
    <Box ml={2} mr={2} mt={1} sx={{ flexGrow: 0, mx:1,width:"100%"}} >
      <Grid2 container xs={12} sm={12} md={12} lg={12} xl={12} sx={{ width:"100%" }}>
        <Grid2 xs={12} sm={6} md={6} lg={6} xl={6}>
        <SearchBar placeholder="Cod.Barras" setInput={setInputCodigoBarras}/>
        </Grid2>
        <Grid2 xs={12} sm={6} md={6} lg={6} xl={6}>
        <SearchBar placeholder="Descripción" setInput={setInputSearch}/>
        </Grid2>
      </Grid2>
    </Box>
  )
}
export default ContentControllers
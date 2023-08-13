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
    if (inicioInputSearch!==""){
      buscarProducto({descripcion:inicioInputSearch});
    }else{
      handleCleanClick();
    }
  }, [inicioInputSearch]);

  useEffect(() => {
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
console.log("Entro a ContentControllers");
  return (
    <Box ml={2} mr={2} mt={1} sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={2}>
        <Grid2 xs={6}>
          <SearchBar placeholder="Cod.Barras" setInput={setInputCodigoBarras}/>
        </Grid2>
        <Grid2 xs={6}>
          <SearchBar placeholder="Descripción" setInput={setInputSearch}/>
        </Grid2>
      </Grid2>
    </Box>
  )
}
export default ContentControllers
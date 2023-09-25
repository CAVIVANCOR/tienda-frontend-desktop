/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import SearchBar from '../../layout/global/SearchBar';
import axios from "axios";
import { setInputSearch, setResults, inicializarVentas } from '../../../redux/features/task/ventas';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es'; // Importa el idioma si lo necesitas
import { Box } from '@mui/material';
function ContentControllers() {
  const ventasInputSearch = useSelector((state) => state.ventas.inputSearch);
  const dispatch = useDispatch();
  moment.locale('es'); // Configura Moment.js para utilizar el idioma en español
  useEffect(() => {
    if (ventasInputSearch!=="") {
      buscarVentas({razonSocial:ventasInputSearch});
    }else{
      handleCleanClick();
    }
  }, [ventasInputSearch]);
  const buscarVentas = async (buscar) => {
      try {
              let response = await axios.post("http://localhost:3001/cabVentas/search", buscar);
              if (response.data.length > 0) {
                  let resultsWithDate = response.data.map(item => {
                  let formattedDate = moment(item.fecha).format('DD/MM/YYYY');
                  return {
                    ...item,
                    fecha: formattedDate,
                  }
                });
                dispatch(setResults(resultsWithDate));
              } else {
                  console.log("Error: No se encontro ningun registro");
              }
      } catch (error) {
          console.log("Error: En la solicitud Backend, Servidor de Base de Datos NO Responde",error);
      }
  };
  const handleCleanClick = () => {
    dispatch(inicializarVentas());
  };
  console.log("Entro a ContentControllers de Ventas");
  return (
    <Box ml={2} mr={2} mt={1} sx={{ flexGrow: 0, mx:1,width:"100%"}} >
              <SearchBar placeholder="Razón Social" setInput={setInputSearch}/>
          </Box>
        )
}
export default ContentControllers;
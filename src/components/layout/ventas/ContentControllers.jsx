/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import './ContentControllers.css';
import SearchBar from '../../layout/global/SearchBar';
import imagenLimpieza from '../../../icons/limpieza.png';
import axios from "axios";
import { setInputSearch, setResults, inicializarInicio } from '../../../redux/features/task/inicio';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es'; // Importa el idioma si lo necesitas
function ContentControllers() {
  const inicioInputSearch = useSelector((state) => state.inicio.inputSearch);
  const dispatch = useDispatch();
  moment.locale('es'); // Configura Moment.js para utilizar el idioma en español

  useEffect(() => {
    if (inicioInputSearch!=="") buscarVentas({razonSocial:inicioInputSearch});
  }, [inicioInputSearch]);
  const buscarVentas = async (buscar) => {
    let response =[];
      try {
          if (buscar!=="") {
           // console.log("Entro a BuscarVentas",buscar)
              response = await axios.post("http://localhost:3001/cabVentas/search", buscar);
              if (response.data.length > 0) {
                const resultsWithDate = response.data.map(item => {
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
          }else{
              console.log("Error: Debe enviar una descripción");
              handleCleanClick();
          }
      } catch (error) {
          console.log("Error: En la solicitud Backend, Servidor de Base de Datos NO Responde",error);
      }
  };
  const handleCleanClick = () => {
    dispatch(inicializarInicio());
  };
  return (
    <div className="search-bar">
      <SearchBar placeholder="Razon Social" setInput={setInputSearch}/>
      <div className='searchbar-buttons'>
        <div>
          <button onClick={handleCleanClick}>
            <img src={imagenLimpieza} alt="Limpiar Barra Search" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContentControllers
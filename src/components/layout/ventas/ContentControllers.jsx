/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import './ContentControllers.css';
import SearchBar from '../../layout/global/SearchBar';
import imagenLimpieza from '../../../icons/limpieza.png';
import imagenReload from '../../../icons/reload.png';
import axios from "axios";
import { setInputSearch, setResults, inicializarInicio } from '../../../redux/features/task/inicio';
import { useDispatch, useSelector } from 'react-redux';
function ContentControllers() {
  const inicioInputSearch = useSelector((state) => state.inicio.inputSearch);
  const dispatch = useDispatch();
  useEffect(() => {
    if (inicioInputSearch!=="") buscarVentas({razonSocial:inicioInputSearch});
  }, [inicioInputSearch]);
  const buscarVentas = async (buscar) => {
    let response =[];
      try {
          if (buscar!=="") {
            console.log("Entro a BuscarVentas",buscar)
              response = await axios.post("http://localhost:3001/cabVentas/search", buscar);
              if (response.data.length > 0) {
                const resultsWithDate = response.data.map(item => {
                  return {
                    ...item,
                    fecha: new Date(item.fecha).toISOString() // Aquí se asume que el campo fecha es una cadena de texto con el formato adecuado para crear un objeto Date
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
  const handleReloadClick = () => {
    if (inicioInputSearch!==""){
      dispatch(setResults([]));
      if (inicioInputSearch!==""){
        setInputSearch(inicioInputSearch+" ");
      }
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
          <button onClick={handleReloadClick}>
            <img src={imagenReload} alt="Reload Barra Search" />
          </button>
        </div>
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
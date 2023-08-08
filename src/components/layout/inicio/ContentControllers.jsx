/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import './ContentControllers.css';
import SearchBar from '../../layout/global/SearchBar';
import imagenLimpieza from '../../../icons/limpieza.png';
import imagenReload from '../../../icons/reload.png';
import axios from "axios";
import { setInputSearch, setInputCodigoBarras, setResults, inicializarInicio } from '../../../redux/features/task/inicio';
import { useDispatch, useSelector } from 'react-redux';
function ContentControllers() {
  const inicioInputSearch = useSelector((state) => state.inicio.inputSearch);
  const inicioInputCodigoBarras = useSelector((state) => state.inicio.inputCodigoBarras);
  const dispatch = useDispatch();
  useEffect(() => {
    if (inicioInputSearch!=="") buscarProducto({descripcion:inicioInputSearch});
  }, [inicioInputSearch]);

  useEffect(() => {
    if (inicioInputCodigoBarras!=="") buscarProducto({codigoProveedor:inicioInputCodigoBarras});
  }, [inicioInputCodigoBarras]);
  const buscarProducto = async (buscar) => {
      try {
          if (buscar!=="") {
            console.log("*************Entro a BuscarProducto",buscar)
              let response = await axios.post("http://localhost:3001/productos/search", buscar);
              if (response.data.length > 0) {
                dispatch(setResults(response.data));
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
    if (inicioInputCodigoBarras!==""){
      dispatch(setResults([]));
      setInputCodigoBarras(inicioInputCodigoBarras+" ");
    }
  };

  const handleCleanClick = () => {
    dispatch(inicializarInicio());
  };
  return (
    <div className="search-bar">
      <div>
        <SearchBar placeholder="Codigo Barras" setInput={setInputCodigoBarras}/>
      </div>
      <div>
        <SearchBar placeholder="Descripción" setInput={setInputSearch}/>
      </div>
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
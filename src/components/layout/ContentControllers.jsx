/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './ContentControllers.css';
import SearchBar from './SearchBar';
import imagenLimpieza from '../../icons/limpieza.png';
import imagenReload from '../../icons/reload.png';
import axios from "axios";

function ContentControllers({setResults, input, codigoBarras, setInput, setCodigoBarras}) {


  useEffect(() => {
    if (input!=="") buscarProducto({descripcion:input});
  }, [input]);

  useEffect(() => {
    if (codigoBarras!=="") buscarProducto({codigoProveedor:codigoBarras});
  }, [codigoBarras]);
  const buscarProducto = async (buscar) => {
      try {
          if (buscar!=="") {
              let response = await axios.post("http://localhost:3001/productos/search", buscar);
              if (response.data.length > 0) {
                setResults(response.data);
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
    if (input!==""){
      setResults([]);
      if (input!==""){
        setInput(input+" ");
      }
      if (codigoBarras!==""){
        setInput(codigoBarras+" ");
      }
    }
  };

  const handleCleanClick = () => {
    setResults([]);
    setInput("");
    setCodigoBarras("");
  };
  return (
    <div className="search-bar">
      <SearchBar placeholder="Codigo Barras" input={codigoBarras} setInput={setCodigoBarras}/>
      <SearchBar placeholder="Descripción" input={input} setInput={setInput}/>
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
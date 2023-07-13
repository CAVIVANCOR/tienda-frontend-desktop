/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './ContentControllers.css';
import SearchBar from './SearchBar';
import imagenLimpieza from '../../icons/limpieza.png';
import imagenReload from '../../icons/reload.png';
import axios from "axios";

function ContentControllers({setResults, results}) {
  const [input, setInput] = useState("");
  useEffect(() => {
    buscarProducto(input);
  }, [input]);

  const buscarProducto = async (buscar) => {
      console.log("buscarProducto: buscar", buscar.toUpperCase());
      try {
          if (buscar!=="") {
              let response = await axios.post("http://localhost:3001/productos/search", {descripcion:buscar.toUpperCase()});
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
      let inputBack = input;
      setInput(input+" ");
      console.log("Hiciste clic en la imagen de reload", results, input, inputBack);
    }
  };

  const handleCleanClick = () => {
    setResults([]);
    setInput("");
    console.log("Hiciste clic en la imagen de limpieza");
  };
  return (
    <div className="search-bar">
      <SearchBar setResults={setResults} input={input} setInput={setInput}/>
      <button onClick={handleReloadClick}>
        <img src={imagenReload} alt="Reload Barra Search" />
      </button>
      <button onClick={handleCleanClick}>
        <img src={imagenLimpieza} alt="Limpiar Barra Search" />
      </button>
    </div>
  )
}

export default ContentControllers
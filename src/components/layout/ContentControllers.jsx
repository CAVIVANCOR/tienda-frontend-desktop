/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './ContentControllers.css';
import SearchBar from './SearchBar';
import imagenLimpieza from '../../icons/limpieza.png';
import imagenReload from '../../icons/reload.png';
import axios from "axios";
import ToggleSwitch from './ToggleSwitch';
import { useSelector } from 'react-redux';

function ContentControllers({setResults, stockMayorCero, setStockMayorCero}) {
  const usuarioLogueado = useSelector((state) => state.login.user);
  const [input, setInput] = useState("");
  useEffect(() => {
    buscarProducto(input);
  }, [input]);

  const buscarProducto = async (buscar) => {
      console.log("buscarProducto: buscar", buscar.toUpperCase());
      try {
          if (buscar!=="") {
              let response = await axios.post("http://localhost:3001/productos/search", {descripcion:buscar});
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
      setInput(input+" ");
    }
  };

  const handleCleanClick = () => {
    setResults([]);
    setInput("");
  };
  return (
    <div className="search-bar">
      <ToggleSwitch label="Stock>0" stockMayorCero={stockMayorCero} setStockMayorCero={setStockMayorCero} />
      <SearchBar input={input} setInput={setInput}/>
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
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import BurguerButton from './BurguerButton'
import {NavContainer,BgDiv} from './NavStyle';
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar({  setResults, setCurrentPage, setInput, setCodigoBarras }) {
  const [clicked, setClicked] = useState(false)
  const navigate = useNavigate();

  const handleClick = () => {
    setClicked(!clicked)
  }
  const handleCerrareIr =(ruta)=>{
    console.log("handleCerrareIr")
    navigate(ruta);
    setResults([]);
    setCurrentPage(1);
    setInput("");
    setCodigoBarras("");
    if (clicked) setClicked(!clicked);
  };

  return (
      <NavContainer>
        <div className={`links ${clicked ? 'active' : ''}`}>
          <Link to="/app" className="cursor" onClick={()=>handleCerrareIr("/app")}><h2><span>Inicio</span></h2></Link>
          <Link to="/app" className="cursor" ><h2><span>Ventas</span></h2></Link>
          <Link to="/app" className="cursor" ><h2><span>Compras</span></h2></Link>
          <Link to="/app" className="cursor" ><h2><span>Ventas</span></h2></Link>
          <Link to="/app" className="cursor" ><h2><span>Almacen</span></h2></Link>
          <Link to="/app" className="cursor" ><h2><span>Caja</span></h2></Link>
          <Link to="/app" className="cursor" ><h2><span>Gerencia</span></h2></Link>
        </div>
        <div className='burguer'>
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <BgDiv className={`initial ${clicked ? ' active' : ''}`}></BgDiv>
      </NavContainer>
  )
}


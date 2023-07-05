/* eslint-disable no-unused-vars */
import React from 'react';
import './Header.css';
import imagenLogoEmpresa from '../../images/logoPetsChico.png';
function Header() {
  return (
    <div className='header'>
      <img src={imagenLogoEmpresa} alt="Logo Empresa"/>
    </div>
  )
}

export default Header
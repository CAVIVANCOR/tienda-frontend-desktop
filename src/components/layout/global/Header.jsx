/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Header.css';
import imagenlogoOut from '../../../icons/logoutOut.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../../redux/features/task/login";
import { useNavigate } from 'react-router-dom';
import VerModalUsuarioLogueado from './verModalUsuarioLogueado';

function Header() {
  const usuarioLogueado = useSelector((state) => state.login.user);
  let datosEmpresa = useSelector((state) => state.datosGlobales.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mostrarVentanaModal, setMostrarVentanaModal] = useState(false);

  const handleInfUsuario = () => {
    setMostrarVentanaModal(true);
  };
  const handleCerrarVentanaModal = () => {
    setMostrarVentanaModal(false);
  };
  const handleLogoutUsuario = ()=>{
    dispatch(logout()); 
    navigate("/");
    //console.log("handleLogoutUsuario")
  };
 console.log("datosEmpresa.urlLogoEmpresa",datosEmpresa.urlLogoEmpresa,"usuarioLogueado.Personal.urlFoto",usuarioLogueado.Personal.urlFoto );
  const imageLogoEmpresaUrl = `http://localhost:3001${datosEmpresa.urlLogoEmpresa}`;
  const imageUsuarioLogueadoUrl = `http://localhost:3001${usuarioLogueado.Personal.urlFoto}`;
  //console.log("imageLogoEmpresaUrl", imageLogoEmpresaUrl);
  return (
    <div className='header'>
      <div className="logo-container">
        <img src={imageLogoEmpresaUrl} alt="Logo Empresa"/>
      </div>
      <div className="h1-container">
        <h1>{datosEmpresa.nombreComercial}</h1>
      </div>
      <div className="usuario-container">
        <button className="inf-usuario-btn" onClick={() => handleInfUsuario()}>
          <img className="foto-usuario" src={imageUsuarioLogueadoUrl} alt="Foto Usuario"/>
        </button>
        <button className="logout.usuario-btn" onClick={() => handleLogoutUsuario()}>
          <img className="foto-logout" src={imagenlogoOut} alt="LogoOut"/>
        </button>
      </div>
      {mostrarVentanaModal && (<VerModalUsuarioLogueado 
                                isOpen={mostrarVentanaModal}
                                onClose={handleCerrarVentanaModal}
                                usuarioLogueado={usuarioLogueado}
                                imageUsuarioLogueadoUrl={imageUsuarioLogueadoUrl}
                              />)}
    </div>
  )
}

export default Header;

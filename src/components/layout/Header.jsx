import React, { useState } from 'react';
import './Header.css';
import imagenlogoOut from '../../icons/logoutOut.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../redux/features/task/login";
import { useNavigate } from 'react-router-dom';

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
    console.log("handleLogoutUsuario")
  };
  console.log("datosEmpresa.urlLogoEmpresa",datosEmpresa)
  const imageLogoEmpresaUrl = `http://localhost:3001${datosEmpresa.urlLogoEmpresa}`;
  console.log("imageLogoEmpresaUrl", imageLogoEmpresaUrl);
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
          <img className="foto-usuario" src={usuarioLogueado.Personal.urlFoto} alt="Foto Usuario"/>
        </button>
        <button className="logout.usuario-btn" onClick={() => handleLogoutUsuario()}>
          <img className="foto-logout" src={imagenlogoOut} alt="LogoOut"/>
        </button>
      </div>
      {mostrarVentanaModal && (
        <div className="ventana-modal">
          <div className="ventana-modal-content">
            <div className='ventana-modal-content-info'>
              <img className="foto-usuario" src={usuarioLogueado.Personal.urlFoto} alt="Foto Usuario"/>
              <h2>{usuarioLogueado.Personal.nombres}</h2>
              <h2>Rol:{usuarioLogueado.Rol.descripcion}</h2>
              <h2>{usuarioLogueado.Personal.email}</h2>
              <h2>{usuarioLogueado.Personal.telefonos}</h2>
              <h2>{usuarioLogueado.Personal.TipoDocIdentidad.iniciales}:{usuarioLogueado.Personal.nroDocIdentidad}</h2>
              <h2>Almacen Asignado:{usuarioLogueado.AlmacenId} - {usuarioLogueado.Almacen.descripcion}</h2>
            </div>
            <div className='ventana-modal-content-btn'>
              <button onClick={handleCerrarVentanaModal}>Aceptar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header;

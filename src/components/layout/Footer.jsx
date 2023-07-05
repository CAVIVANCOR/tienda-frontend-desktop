/* eslint-disable no-unused-vars */
import React from 'react';
import './Footer.css';
import imagenLogo13 from '../../icons/logoCuadrado.png';
import logoWebsite from '../../icons/logoWebsite.png';
import logoWhatsApp from '../../icons/logoWhatsApp.png';
import logoEmail from '../../icons/logoEmail.png';

function Footer() {
  return (
    <div className='footer'>
      <div className='logo-creador'>
        <img src={imagenLogo13} alt="Logo Empresa"/>
        <p> © 2023 Todos los derechos reservados</p>
      </div>
      <div className='website'>
        <img src={logoWebsite} alt="Website Creador"/>
        <a href="https://www.13elfuturohoy.com/">https://www.13elfuturohoy.com/</a>
      </div>
      <div className='whatsapp'>
        <img src={logoWhatsApp} alt="Telefono Creador"/>
        <a aria-label="Chat on WhatsApp" href="https://wa.me/+51949101509">949101509</a>
      </div>
      <div className='email'>
        <img src={logoEmail} alt="Email Creador"/>
        <a href="mailto:sistemas.cavr@13elfuturohoy.com?Subject=Interesado%20en%20el%20Aplicativo">sistemas.cavr@13elfuturohoy.com</a>
      </div>
    </div>
    )
}

export default Footer
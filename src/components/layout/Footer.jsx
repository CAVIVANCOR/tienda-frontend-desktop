/* eslint-disable no-unused-vars */
import React from 'react';
import './Footer.css';
import imagenLogo13 from '../../icons/logoCuadrado.png';
import logoWhatsApp from '../../icons/logoWhatsApp.png';

function Footer() {
  return (
    <div className='footer'>
      <div className='website'>
        <img src={imagenLogo13} alt="Website Creador"/>
        <div className='website-texto'>
          <a href="https://www.13elfuturohoy.com/">https://www.13elfuturohoy.com/</a>
          <p>sistemas.cavr@13elfuturohoy.com</p>
        </div>
      </div>
      <div className='whatsapp'>
        <img src={logoWhatsApp} alt="Telefono Creador"/>
        <a aria-label="Chat on WhatsApp" href="https://wa.me/+51949101509">949101509</a>
      </div>
    </div>
    )
}

export default Footer
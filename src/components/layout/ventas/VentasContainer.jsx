/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../global/Header";
import Footer from "../global/Footer";
import Content from "../ventas/Content";
import NavBar from "../global/Navbar";
import './VentasContainer.css';
const VentasContainer = () => {
  console.log("Hola entro a VentasContainer");
  return (
    <main className="main-container-layout">
      <header className="header-container">
        <Header/>
      </header>
      <nav className="navbar">
        <NavBar />
      </nav>
      <section className="main-content">
        <Content />
      </section>
      <footer className="footer-container">
        <Footer/>
      </footer>
    </main>
  );
};

export default VentasContainer;

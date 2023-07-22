/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../global/Header";
import Footer from "../global/Footer";
import Content from "./Content";
import NavBar from "../global/Navbar";
import './InicioContainer.css';
const InicioContainer = () => {
  console.log("Hola entro a MainContainer");
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

export default InicioContainer;

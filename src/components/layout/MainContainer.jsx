/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import NavBar from "./Navbar";
import './MainContainer.css';

const MainContainer = () => {
  console.log("Hola entro a MainContainer");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [input, setInput] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");

  const itemsPerPage = 8;
  const totalPages = Math.ceil(results.length / itemsPerPage);
  return (
    <main className="main-container-layout">
      <header className="header-container">
        <Header/>
      </header>
      <nav className="navbar">
        <NavBar setResults={setResults} setCurrentPage={setCurrentPage}  setInput={setInput} setCodigoBarras={setCodigoBarras}/>
      </nav>
      <section className="main-content">
        <Content results={results} setResults={setResults} currentPage={currentPage} itemsPerPage={itemsPerPage} totalPages={totalPages} setCurrentPage={setCurrentPage} input={input} codigoBarras={codigoBarras} setInput={setInput} setCodigoBarras={setCodigoBarras}/>
      </section>
      <footer className="footer-container">
        <Footer/>
      </footer>
    </main>
  );
};

export default MainContainer;

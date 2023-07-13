/* eslint-disable no-unused-vars */
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import NavBar from "./Navbar";
import './MainContainer.css';

const MainContainerLayout = () => {
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

export default MainContainerLayout;

/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ContentControllers from './ContentControllers';
import ContentData from './ContentData';
import ContentTotals from './ContentTotals';
import './Content.css';


function Content({ results, setResults, currentPage, itemsPerPage, totalPages, setCurrentPage, input, codigoBarras, setInput, setCodigoBarras }) {
  console.log("Hola entro a Content");


  return (
    <main className="content">
      <section className="content-controllers">
        <ContentControllers setResults={setResults} input={input} codigoBarras={codigoBarras} setInput={setInput} setCodigoBarras={setCodigoBarras}/>
      </section>
      <section className="content-data" >
        <ContentData results={results} currentPage={currentPage} itemsPerPage={itemsPerPage}/>
      </section>
      <section className="content-totals">
      <ContentTotals currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
      </section>
    </main>
  )
}

export default Content;


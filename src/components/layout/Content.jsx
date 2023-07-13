/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ContentControllers from './ContentControllers';
import ContentData from './ContentData';
import ContentTotals from './ContentTotals';
import './Content.css';


function Content() {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(results.length / itemsPerPage);

  return (
    <main className="content">
      <section className="content-controllers">
        <ContentControllers setResults={setResults} results={results} />
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


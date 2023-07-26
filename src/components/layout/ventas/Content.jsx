/* eslint-disable no-unused-vars */
import React from 'react';
import ContentControllers from './ContentControllers';
import './Content.css';
import { useSelector } from 'react-redux';
import DataTableGrid from '../Table/DataTableGrid';
function Content() {
  const results = useSelector((state) => state.inicio.results);

  console.log("Hola entro a Content");
  return (
    <main className="content">
      <section className="content-controllers">
        <ContentControllers />
      </section>
      <section className="content-data" >
        {results && results.length > 0 && <DataTableGrid />}
      </section>
    </main>
  )
}

export default Content;


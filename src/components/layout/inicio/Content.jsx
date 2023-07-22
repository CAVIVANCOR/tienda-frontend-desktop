/* eslint-disable no-unused-vars */
import React from 'react';
import ContentControllers from './ContentControllers';
import ContentData from './ContentData';
import ContentTotals from './ContentTotals';
import './Content.css';


function Content() {
  console.log("Hola entro a Content");
  return (
    <main className="content">
      <section className="content-controllers">
        <ContentControllers />
      </section>
      <section className="content-data" >
        <ContentData />
      </section>
      <section className="content-totals">
        <ContentTotals />
      </section>
    </main>
  )
}

export default Content;


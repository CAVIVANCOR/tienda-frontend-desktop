/* eslint-disable no-unused-vars */
import React from 'react';
import './ContentTotals.css';
import imagenPrimeraPagina from '../../icons/primera-pagina.png';
import imagenUltimaPagina from '../../icons/ultima-pagina.png';
import imagenSiguientePagina from '../../icons/siguiente-pagina.png';
import imagenPreviaPagina from '../../icons/previa-pagina.png';
function ContentTotals({currentPage, totalPages, setCurrentPage}) {
  
  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage < totalPages ? prevPage + 1 : prevPage);
  };
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };
  return (
    <div className="content-pagination">
            {totalPages>0 && 
                <div className="pagination">
                  <button onClick={handleFirstPage} disabled={currentPage === 1}>
                    <img src={imagenPrimeraPagina} alt="Primera Pagina" />
                  </button>
                  <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <img src={imagenPreviaPagina} alt="Pagina Previa" />
                  </button>
                  <span>Página {currentPage} de {totalPages}</span>
                  <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <img src={imagenSiguientePagina} alt="Pagina Siguiente" />
                  </button>
                  <button onClick={handleLastPage} disabled={currentPage === totalPages}>
                    <img src={imagenUltimaPagina} alt="Ultima Pagina" />
                  </button>
                </div>
                
            }
  </div>
  )
}

export default ContentTotals
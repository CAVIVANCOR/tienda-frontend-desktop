/* eslint-disable no-unused-vars */
import React from 'react';
import './ContentTotals.css';
import imagenPrimeraPagina from '../../../icons/primera-pagina.png';
import imagenUltimaPagina from '../../../icons/ultima-pagina.png';
import imagenSiguientePagina from '../../../icons/siguiente-pagina.png';
import imagenPreviaPagina from '../../../icons/previa-pagina.png';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../../redux/features/task/inicio';
function ContentTotals() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.inicio.currentPage);
  const totalPages = useSelector((state) => state.inicio.totalPages);

  const handlePreviousPage = () => {
    dispatch(setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(prevPage => prevPage < totalPages ? prevPage + 1 : prevPage));
  };
  const handleFirstPage = () => {
    dispatch(setCurrentPage(1));
  };

  const handleLastPage = () => {
    dispatch(setCurrentPage(totalPages));
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
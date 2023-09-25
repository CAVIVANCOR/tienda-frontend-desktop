/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../../redux/features/task/inicio';
import { Pagination, Stack } from '@mui/material';

function ContentTotals() {
  const results = useSelector((state) => state.inicio.results);
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.inicio.currentPage);
  const totalPages = useSelector((state) => state.inicio.totalPages);
  const handleChangePage = (event, value) => {
    dispatch(setCurrentPage(value));
  }
  console.log("entro a ContentTotals de Inicio", currentPage, totalPages);
  return (
  <Stack direction="row" justifyContent="center" alignItems="center" spacing={4} mt={1} mb={1}>
    {results.length > 0 && <Pagination size="large"  color="primary" shape="rounded" count={totalPages} page={currentPage} siblingCount={1} onChange={handleChangePage} />}
  </Stack>
  )
}
export default ContentTotals
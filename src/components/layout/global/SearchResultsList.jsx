/* eslint-disable no-unused-vars */
import React from 'react';
import SearchResult from "./SearchResult";
import { useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

function SearchResultsList() {
  const results = useSelector((state) => state.inicio.results);
  const currentPage = useSelector((state) => state.inicio.currentPage);
  const itemsPerPage = useSelector((state) => state.inicio.itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = results.slice(startIndex, endIndex);
  return (
    <Box mx={1} sx={{ flexGrow: 1 }}>
      <Grid2 align="center" container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl:4 }}
      sx={{
        '--Grid-borderWidth': '1px',
        borderTop: 'var(--Grid-borderWidth) solid',
        borderLeft: 'var(--Grid-borderWidth) solid',
        borderColor: 'divider',
        '& > div': {
          borderRight: 'var(--Grid-borderWidth) solid',
          borderBottom: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
        },
      }}>
        {currentResults.map((product, id) => {
          return (
            <Grid2 xs={1} sm={1} md={1} lg={1} xl={1} key={id}>
              <SearchResult
                urlFotoProducto={`http://localhost:3001${product.urlFotoProducto}`}
                dataCompleta={product}
                key={id}
              />
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  )
}
export default SearchResultsList;
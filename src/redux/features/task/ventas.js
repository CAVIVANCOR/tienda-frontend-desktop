import { createSlice } from "@reduxjs/toolkit";

const ventasSlice = createSlice({
  name: "ventas",
  initialState: {
    inputSearch: "",
    inputCodigoBarras: "",
    results: [],
    currentPage: 1,
    itemsPerPage: 8,
    totalPages: 1,
    selectVentas:false,
    regProductoSelectVentas:{},
    idAlmacenStockProductoSelectVentas:0,
    stockProductoSelectVentas:0,
  },
  reducers: {
    setInputSearch: (state, action) => {
        state.inputSearch = action.payload;
    },
    setInputCodigoBarras: (state, action) => {
        state.inputCodigoBarras = action.payload;
    },
    setResults: (state, action) => {
        state.results = action.payload;
        state.currentPage = 1;
        state.totalPages = Math.ceil(action.payload.length / state.itemsPerPage);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    inicializarVentas: (state) => {
      state.inputSearch = "";
      state.inputCodigoBarras = "";
      state.results = [];
      state.currentPage = 1;
      state.itemsPerPage = 8;
      state.totalPages = 1;
      state.selectVentas=false;
      state.regProductoSelectVentas={},
      state.idAlmacenStockProductoSelectVentas=0,
      state.stockProductoSelectVentas=0
    },
    setSelectVentas: (state, action) => {
      state.selectVentas = action.payload;
    },
    setRegProdStockVentas: (state, action) => {
      state.regProductoSelectVentas = action.payload;
    },
    setIdAlmacenStockVentas: (state, action) => {
      state.idAlmacenStockProductoSelectVentas = action.payload;
    },
    setStockVentas: (state, action) => {
      state.stockProductoSelectVentas = action.payload;
    },
  },
});

export const { setInputSearch, setInputCodigoBarras, setResults, inicializarVentas, setCurrentPage, setSelectVentas, setRegProdStockVentas, setIdAlmacenStockVentas, setStockVentas } = ventasSlice.actions;

export default ventasSlice.reducer;


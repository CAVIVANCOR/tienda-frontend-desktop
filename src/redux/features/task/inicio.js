import { createSlice } from "@reduxjs/toolkit";

const inicioSlice = createSlice({
  name: "inicio",
  initialState: {
    inputSearch: "",
    inputCodigoBarras: "",
    results: [],
    currentPage: 1,
    itemsPerPage: 8,
    totalPages: 1,
  },
  reducers: {
    setInputSearch: (state, action) => {
        state.inputSearch = action.payload;
    },
    setInputCodigoBarras: (state, action) => {
        state.inputCodigoBarras = action.payload;
    },
    setResults: (state, action) => {
        state.inputCodigoBarras = action.payload;
    },
    inicializarInicio: (state) => {
      state.inputSearch = "";
      state.inputCodigoBarras = "";
      state.results = [];
      state.currentPage = 1;
      state.itemsPerPage = 8;
      state.totalPages = 1;
    },
  },
});

export const { setInputSearch, setInputCodigoBarras, setResults, inicializarInicio } = inicioSlice.actions;

export default inicioSlice.reducer;

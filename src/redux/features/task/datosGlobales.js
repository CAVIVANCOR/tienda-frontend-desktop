import { createSlice } from "@reduxjs/toolkit";

const datosGlobalesSlice = createSlice({
  name: "datosGlobales",
  initialState: {
    data: null,
  },
  reducers: {
    cargarDatosGlobales: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { cargarDatosGlobales } = datosGlobalesSlice.actions;

export default datosGlobalesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const ventasSlice = createSlice({
    name: "ventas",
    initialState: {
        ventas: null,
    },
    reducers: {
        setVentas: (state, action) => {
            state.ventas = action.payload;
        },
    },
});

export const { setVentas } = ventasSlice.actions;

export default ventasSlice.reducer;

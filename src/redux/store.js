import { configureStore } from "@reduxjs/toolkit";
import ventasReducer from "./features/task/ventas";
import loginReducer from "./features/task/login";
import datosGlobalesReducer from "./features/task/datosGlobales";
import inicioReducer from "./features/task/inicio";
export const store = configureStore({
  reducer: {
    ventas: ventasReducer,
    login: loginReducer,
    datosGlobales: datosGlobalesReducer,
    inicio: inicioReducer
  },
});
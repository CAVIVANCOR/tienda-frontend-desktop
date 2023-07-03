import { configureStore } from "@reduxjs/toolkit";
import ventasReducer from "./features/task/ventas";
import loginReducer from "./features/task/login";

export const store = configureStore({
  reducer: {
    ventas: ventasReducer,
    login: loginReducer,
  },
});
import { useSelector } from "react-redux";
import InicioContainer from "./components/layout/inicio/InicioContainer";
import VentasContainer from "./components/layout/ventas/VentasContainer";
import {Routes, Route} from "react-router-dom";
import Login from "./components/login/Login";

export function App () {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  return (
  <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        {isLoggedIn && <Route path="/inicio" element={<InicioContainer/>} />}
        {isLoggedIn && <Route path="/ventas" element={<VentasContainer/>} />}
      </Routes>
  </div>
  );
}


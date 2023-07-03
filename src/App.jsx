import { useSelector } from "react-redux";
import Navbar from "./components/layout/Navbar";
import {Routes, Route} from "react-router-dom";
import { useEffect, useRef } from "react";
import Login from "./components/login/Login";

export function App () {
    const ventasState = useSelector(state=>state.ventas);
    const isMounted = useRef(false);

    useEffect(() => {
      if (isMounted.current) {
        console.log(ventasState);
      } else {
        isMounted.current = true;
      }
    }, [ventasState]);
    return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<Navbar />} />
        </Routes>
    </div>
    );
}


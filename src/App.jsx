import { useSelector } from "react-redux";
import MainContainer from "./components/layout/MainContainer";
import {Routes, Route} from "react-router-dom";
import Login from "./components/login/Login";

export function App () {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  return (
  <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        {isLoggedIn && (<Route path="/app" element={<MainContainer/>} />)}
      </Routes>
  </div>
  );
}


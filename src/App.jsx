import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import BillPage from "./pages/BillPage";
import CartPage from "./pages/CartPage";
import CustomerPage from "./pages/CustomerPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import StatisticPage from "./pages/StatisticPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const card = useSelector((state) => state.card);

  useEffect(() => {
   localStorage.setItem("card", JSON.stringify(card));
  }, [card]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteControl><HomePage /></RouteControl>} />
        <Route path="/cart" element={<RouteControl><CartPage /></RouteControl>} />
        <Route path="/bills" element={<RouteControl><BillPage /></RouteControl>} />
        <Route path="/customers" element={<RouteControl><CustomerPage /></RouteControl>} />
        <Route path="/statistic" element={<RouteControl><StatisticPage /></RouteControl>} />
        <Route path="/products" element={<RouteControl><ProductPage /></RouteControl>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />
  }
}
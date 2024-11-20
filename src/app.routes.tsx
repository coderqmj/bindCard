import { HashRouter, Routes, Route } from "react-router-dom";
import { BuyRoute } from "./pages/buy";
import React from "react";

export default function RoutesRegister() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<BuyRoute />} />
        <Route path="/checkout" element={<BuyRoute />}>
          {/* <Route path="home/detail" element={<Mine />} /> */}
        </Route>
      </Routes>
    </HashRouter>
  );
}

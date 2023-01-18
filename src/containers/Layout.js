import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HeaderApp from "../components/HeaderApp";
import FooterApp from "../components/FooterApp";
import News from "./News";

export default function Layout() {
  return (
    <BrowserRouter>
      <HeaderApp />
      <Routes>
        <Route exact path="/" element={<News />} />
      </Routes>
      <FooterApp />
    </BrowserRouter>
  );
}

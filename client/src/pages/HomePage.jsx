import { BrowserRouter, Link, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import NavBar from "../components/NavBar";

const HomePage = () => {
  return (
    <section className="homepage-wrapper">
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </section>
  );
};

export default HomePage;

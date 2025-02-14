import { BrowserRouter, Link, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Register from "./../pages/Register";
import Login from "./../pages/Login";
import Logout from "./../pages/Logout";
import About from "./../pages/About";
import Dashboard from "./../pages/Dashboard";

import { getRedirectUser } from "./requestsAPI";

export default function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check cookie validity and update the state
    const checkAuthStatus = async () => {
      const result = await getRedirectUser(process.env.REACT_APP_REDIRECT_USER);
      setIsAuthenticated(result);
    };

    checkAuthStatus();
  }, []); // Empty dependency ensures this runs only on mount

  return (
    <div>
      <nav className="nav-wrapper">
        {!isAuthenticated ? (
          <Link className="navbar-item" to="/login">
            Login
          </Link>
        ) : (
          <Link className="navbar-item" to="/logout">
            Logout
          </Link>
        )}
        <Link className="navbar-item" to="/dashboard">
          Dashboard
        </Link>
        <Link className="navbar-item" to="/about">
          About
        </Link>
      </nav>
      <h1>MiniDoro</h1>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={setIsAuthenticated} />} />
        <Route
          path="/logout"
          element={<Logout onLogout={setIsAuthenticated} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

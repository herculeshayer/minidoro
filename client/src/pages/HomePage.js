
import { BrowserRouter, Link, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";



import Register from "./Register";
import Login from "./Login";
import About from "./About";
import Dashboard from "./Dashboard";

const HomePage = () => {
    /**
     * Experiment with react router to get a feel for it
     * 
     * To get feel---
     * 
     * *****************EXPERIMENT SUCCESSFUL!!
     */

    return(
        <section className="homepage-wrapper">
            <BrowserRouter>
            
                <nav>
                    {/* <Link to="/">Home</Link> */}
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/about">About</Link>
                </nav>
                <h1>MiniDoro</h1>
            
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>

            </BrowserRouter>
        </section>
    );
}

export default HomePage;
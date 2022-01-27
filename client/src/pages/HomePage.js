
import { BrowserRouter, Link, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";



import Register from "./Register";
import Login from "./Login";
import About from "./About";
import Dashboard from "./Dashboard";

const HomePage = () => {

    // const [username, setUserName] = useState(0);
    // const [email, setEmail] = useState(0);
    // const [password, setPassword] = useState(0);


    const [register, setRegister] = useState(false); 
    const [login, setLogin] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();

        setLogin(false);
        setRegister(true);
    }
    const handleLogin = (e) => {
        e.preventDefault();
        
        setRegister(false);
        setLogin(true);
    }
    
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
            
            <h1>MiniDoro</h1>
            
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
                {/* {
                    register ? <RegisterUser /> : <LoginUser />
                }
                    <div>
                        <button type="button" onClick={handleRegister}>register as new user</button>

                        <button type="button" onClick={handleLogin}>login as existing user</button>
                    </div> */}
                <nav>
                    {/* <Link to="/">Home</Link> */}
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/about">About</Link>
                </nav>
            </BrowserRouter>
        </section>
    );
}

export default HomePage;
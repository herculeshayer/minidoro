

import React, { useState } from "react";

import RegisterUser from "../components/Register.HomePage";
import LoginUser from "../components/Login.HomePage";



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
     */

    return(
        <section className="homepage-wrapper">
            <h1>MiniDoro</h1>
            
            {
                register ? <RegisterUser /> : <LoginUser />
            }
                <div>
                    <button type="button" onClick={handleRegister}>register as new user</button>

                    <button type="button" onClick={handleLogin}>login as existing user</button>
                </div>
                
            


        </section>
    );
}

export default HomePage;
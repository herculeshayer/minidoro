import React, { useState } from "react";

const HomePage = () => {

    const [username, setUserName] = useState(0);
    const [email, setEmail] = useState(0);
    const [password, setPassword] = useState(0);


    const handleSubmit = (e) => {

    }
    

    return(
        <section className="homepage-wrapper">
            <h1>MiniDoro</h1>
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input placeholder="Email"/>
                <label>Password: </label>
                <input placeholder="Password"/>
                <div>
                    <button>Signup</button>
                    <button>Submit</button>

                </div>
            </form>

        </section>
    );
}

export default HomePage;
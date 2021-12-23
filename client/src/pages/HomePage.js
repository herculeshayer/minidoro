import React, { useState } from "react";

const HomePage = () => {

    const [username, setUserName] = useState(0);
    const [email, setEmail] = useState(0);
    const [password, setPassword] = useState(0);


    

    return(
        <section className="homepage-wrapper">
            <h1>MiniDoro</h1>

        </section>
    );
}

export default HomePage;
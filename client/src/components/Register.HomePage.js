import React from 'react';

const RegisterUser = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <section className="register-login">
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input placeholder="Username"/>
                <label>Email</label>
                <input placeholder="Email"/>
                <label>Password</label>
                <input placeholder="Password"/>
            </form>
        </section>
    );
}

export default RegisterUser;


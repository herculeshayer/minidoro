import React, { useState } from 'react';

import { postRegistrationInformation } from './UserData.HomePage';

import { TiArrowRightThick } from 'react-icons/ti';

const RegisterUser = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    

    const handleSubmit = (event) => {
        event.preventDefault();

        postRegistrationInformation(process.env.REACT_APP_REGISTER_API_URL, {
            username,
            password,
            email
        })
    }

    return (
        <section className="register-login">
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
                <label>Email</label>
                <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value) }/>
                <label>Password</label>
                <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value) }/>
                <div>
                    <button style={{fontSize: 25}}><TiArrowRightThick /></button>
                </div>
            </form>
        </section>
    );
}

export default RegisterUser;


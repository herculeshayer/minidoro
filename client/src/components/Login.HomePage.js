import React, { useState } from 'react';
import { TiArrowRightThick } from 'react-icons/ti';

import { postLoginInformation } from './UserData.HomePage';

const LoginUser = () => {

    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);


    
    const handleSubmit = (event) => {
        event.preventDefault();
       

        console.log(username);
        console.log(password);

        postLoginInformation(process.env.REACT_APP_LOGIN_API_URL, {
            username, password
        });
    }
   
    return (
        <section className="register-login">
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" placeholder="Username" name="username" onChange={e=>setUsername(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder="Password" name="password" onChange={e=>setPassword(e.target.value)} />
                <div>
                    <button type="submit" style={{fontSize: 25}}><TiArrowRightThick /></button>
                </div>
            </form>
            

        </section>
        

    );
}
export default LoginUser;
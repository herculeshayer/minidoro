import React, { useState } from 'react';
import { TiArrowRightThick } from 'react-icons/ti';

import { postLoginInformation } from './UserData.HomePage';

const LoginUser = () => {

    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);


    // const [payloadBody, setPayloadBody] = useState({})

    // setPayloadBody({
    //     email: 'dds',
    //     password: 'dsaa'
    // })
 
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log('hi');
        // setEmail(event.target.value)
        // setPassword(event.target.value)

        console.log(event.target.getAttribute('email'));
        console.log(password);

        // postLoginInformation(process.env.REACT_APP_API_URL, {
        //     email: email, password: password
        // });
    }
    // console.log(email);
    return (
        <section className="register-login">
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" placeholder="Email" name="email" id="email" />
                <label>Password</label>
                <input type="password" placeholder="Password" name="password"  />
                <div>
                    <button type="submit" style={{fontSize: 25}}><TiArrowRightThick /></button>
                </div>
            </form>
            

        </section>
        

    );
}
export default LoginUser;
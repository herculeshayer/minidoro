import React from 'react';

import tomatoImg from './../assets/tomato-icon.svg'
const About = () => {
    return (
        <>
            <img src={tomatoImg} alt="tomato" style={{height: "35%", paddingBottom: "5%"}}/>

            <p>Welcome - this is a pomodoro timer application </p>
            <br/>
            <p>Tools used in the development of this application:
                <div style={{fontWeight: "550"}}>
                    React.js, Node.js, Express, PostgreSQL, SCSS - Hosting: [AWS, Netlify, Render]
                </div>
            </p>
            <br/>
            {/*<p>If already a user, login. Otherwise, <a href="">register.</a></p>*/}
            <p>For more information about the Pomodoro Technique<br/></p>

            Visit: <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">Wikipedia: Pomodoro Technique</a>
        </>
    );
}

export default About;
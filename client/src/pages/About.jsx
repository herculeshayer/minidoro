import React from "react";

import tomatoImg from "./../assets/tomato-icon.svg";
const About = () => {
  return (
    <div style={{ marginTop: "-5rem" }}>
      <p style={{ fontSize: "20px" }}>
        If you'd like to checkout the GitHub repository
        <br />
      </p>
      <a
        style={{ fontSize: "20px", paddingBottom: "4rem" }}
        href="https://github.com/herculeshayer/minidoro"
      >
        GitHub: MiniDoro Repository
      </a>
      <br />
      <img
        src={tomatoImg}
        alt="tomato"
        style={{ height: "35%", paddingBottom: "5%" }}
      />
      <p>Welcome! This is a pomodoro timer application</p>
      <br />
      <p>
        Tools used in the development of this application:
        <div style={{ fontWeight: "550" }}>
          <p>React.js, Node.js, Express, PostgreSQL, SCSS</p>{" "}
          <p>Hosting: [Netlify(Client), Render(Server), Supabase(DB)]</p>{" "}
        </div>
      </p>
      <br />
      <p>
        For more information about the Pomodoro Technique
        <br />
      </p>
      Visit:{" "}
      <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">
        Wikipedia: Pomodoro Technique
      </a>
    </div>
  );
};

export default About;

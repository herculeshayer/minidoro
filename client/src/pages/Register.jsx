import React, { useState } from "react";

import { postRegistrationInformation } from "../components/requestsAPI";

import { useNavigate } from "react-router-dom";

import { TiArrowRightThick } from "react-icons/ti";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    postRegistrationInformation(import.meta.env.VITE_REGISTER_API_URL, {
      username,
      password,
      email,
    });

    alert("User Created!");

    navigate("/login");
  };

  return (
    <section className="register-login">
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <button style={{ fontSize: 25 }}>
            <TiArrowRightThick />
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;

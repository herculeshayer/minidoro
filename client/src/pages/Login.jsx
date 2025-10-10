import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TiArrowRightThick } from "react-icons/ti";

import {
  postLoginInformation,
  getRedirectUser,
} from "../components/requestsAPI";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("testuser");
  const [password, setPassword] = useState("123123");

  const navigate = useNavigate();

  const userRedirect = getRedirectUser(import.meta.env.VITE_REDIRECT_USER);

  /**
   * Redirect if there is cookie present
   */
  useEffect(() => {
    if (userRedirect === true) {
      onLogin(true);
      alert("You've already logged in");
      navigate("/dashboard");
    }
  }, [userRedirect]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const success = await postLoginInformation(
      import.meta.env.VITE_LOGIN_API_URL,
      {
        username,
        password,
      }
    );

    if (success) {
      onLogin(true);
      alert("Login Successful!");
      navigate("/dashboard");
    }
    if (!success) {
      alert("Login False");
    }
  };

  return (
    <section className="register-login">
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <button type="submit" style={{ fontSize: 25 }}>
            <TiArrowRightThick />
          </button>
        </div>
      </form>
      <Link style={{ fontSize: "12px" }} to="/register">
        Not Registered? Sign Up.
      </Link>
    </section>
  );
};

export default Login;

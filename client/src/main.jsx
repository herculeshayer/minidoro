/**
 * Author: hhayer
 * Technology used: JavaScript(React, Node), CSS + SASS, PostgreSQL, Git, Heroku, Netlify
 * Description: An application to manage your work time
 */

import React from "react";
import ReactDOM from "react-dom";
import "./styles/css/index.css";
import HomePage from "./pages/HomePage";

ReactDOM.render(
  <React.StrictMode>
    {/* <ShowCasePage /> */}

    <HomePage />
  </React.StrictMode>,
  document.getElementById("root")
);

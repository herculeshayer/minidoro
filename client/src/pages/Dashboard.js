import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getUserDashboardInformation,
  getRedirectUser,
} from "../components/requestsAPI";

const Dashboard = () => {
  const navigate = useNavigate();

  const userRedirect = getRedirectUser(process.env.REACT_APP_REDIRECT_USER);

  /**
   * Redirect is there is NOT cookie present
   */
  useEffect(() => {
    if (userRedirect === false) {
      alert("Please login");
      navigate("/login");
    }
  }, [userRedirect]);

  const userData = getUserDashboardInformation(
    process.env.REACT_APP_DASHBOARD_API_URL
  );

  const [timer, setTimer] = useState(1500); //1500seconds = 25min
  const [startTimer, setStartTimer] = useState(false);
  const [workIntervalCount, setWorkIntervalCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStartTimer(!startTimer);
    if (timer === 0) {
      setTimer(1500);
    }
  };
  const handleReset = (e) => {
    e.preventDefault();
    localStorage.setItem("work-interval", 0);
    setWorkIntervalCount(0);
  };

  useEffect(() => {
    let countdownTimer;
    if (startTimer)
      countdownTimer = setInterval(() => {
        setTimer((count) => --count);
      }, 1000);

    return () => clearInterval(countdownTimer);
  }, [startTimer]);

  useEffect(() => {
    if (timer < 1 && startTimer) {
      setStartTimer(false);
      // setTimer(5);
      setWorkIntervalCount((count) => count + 1);
      localStorage.setItem("work-interval", workIntervalCount + 1);
    }
  }, [startTimer, timer]);

  const seconds = String(timer % 60).padStart(2, 0);
  const minutes = String(Math.floor(timer / 60)).padStart(2, 0);
  // console.log(seconds);
  // console.log(minutes);
  // if()
  // if(localStorage.getItem("work-interval") % 4 === 0) {
  //     // alert("You've completed 4 work sessions in row, time for a break!");
  // }

  return (
    <section class="user-dashboard">
      {/* <h1>Dashboard</h1> */}
      <div>
        <h2>{userData.username} dashboard</h2>
        {/* <h3>{userData.email}</h3> */}
        <h1>
          {minutes}:{seconds}
        </h1>
        <button onClick={handleSubmit}>{startTimer ? "pause" : "start"}</button>
      </div>
      <div>
        <h6>
          {localStorage.getItem("work-interval") % 4 === 0 &&
          startTimer === false &&
          workIntervalCount !== 0
            ? "You've completed 4 work sessions in row, time for a break!"
            : ""}
        </h6>

        <h3 style={{ marginTop: "50px" }}>
          Work Intervals Completed: {localStorage.getItem("work-interval")}
        </h3>
        <button onClick={handleReset}>Reset Work Intervals</button>
      </div>
    </section>
  );
};

export default Dashboard;

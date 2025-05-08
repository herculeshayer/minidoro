import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getUserDashboardInformation,
  getRedirectUser,
} from "../components/requestsAPI";

const Dashboard = () => {
  const navigate = useNavigate();

  const userRedirect = getRedirectUser(import.meta.env.VITE_REDIRECT_USER);

  useEffect(() => {
    if (userRedirect === false) {
      alert("Please login");
      navigate("/login");
    }
  }, [userRedirect]);

  const userData = getUserDashboardInformation(
    import.meta.env.VITE_DASHBOARD_API_URL
  );

  // const [timer, setTimer] = useState(1500); //1500seconds = 25min
  const [timer, setTimer] = useState(10); //TESTING WITH 10SECONDS
  const [startTimer, setStartTimer] = useState(false);
  const [workIntervalCount, setWorkIntervalCount] = useState(0);
  const [pomodoroComplete, setPomodoroComplete] = useState(false);

  // useEffect(() => {
  //   const submitInfo = async () => {
  //   submitInfo();
  // }, [pomodoroComplete]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStartTimer(!startTimer);
    if (timer === 0) {
      setPomodoroComplete(true);

      try {
        const response = await fetch(
          import.meta.env.VITE_POST_USER_POMODORO_DATA,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer ",
            },
            body: JSON.stringify(pomodoroComplete),
          }
        );
        if (await !response.ok) {
          console.log(
            "/Dashboard: HandleSubmit: Fetch Response: ",
            await response.json()
          );
        } else {
          console.log(await response.json());
          setPomodoroComplete(false);
        }
      } catch (error) {
        console.warn("/Dashboard Error: ", error);
      }
      //CHANGE BACCK AFTER TESTING
      // setTimer(1500);
      // set to 10seconds for testing purposes
      setTimer(10);
    }
  };
  // const handleReset = (e) => {
  //   e.preventDefault();
  //   localStorage.setItem("work-interval", 0);
  //   setWorkIntervalCount(0);
  // };

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
      setWorkIntervalCount((count) => count + 1);
      localStorage.setItem("work-interval", workIntervalCount + 1);
    }
  }, [startTimer, timer]);

  const seconds = String(timer % 60).padStart(2, 0);
  const minutes = String(Math.floor(timer / 60)).padStart(2, 0);

  return (
    <section class="user-dashboard">
      <div>
        <button class="timer-button" onClick={handleSubmit}>
          {minutes}:{seconds}
        </button>
      </div>
      <div>
        <h6>
          {/* {localStorage.getItem("work-interval") % 4 === 0 &&
          startTimer === false &&
          workIntervalCount !== 0
            ? "You've completed 4 work sessions in row, time for a break!"
            : ""} */}
        </h6>
      </div>
    </section>
  );
};

export default Dashboard;

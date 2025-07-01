import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getUserDashboardInformation,
  getRedirectUser,
} from "../components/requestsAPI";

const Dashboard = () => {
  const navigate = useNavigate();

  const [timer, setTimer] = useState(3); //TESTING WITH 10SECONDS
  const [startTimer, setStartTimer] = useState(false);
  const [workIntervalCount, setWorkIntervalCount] = useState(0);
  const [pomodoroComplete, setPomodoroComplete] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const userRedirect = getRedirectUser(import.meta.env.VITE_REDIRECT_USER);

  useEffect(() => {
    if (userRedirect === false) {
      alert("Please login");
      navigate("/login");
    }
  }, [userRedirect]);

  /**
   * GET todays pomodoro count
   */

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      const date = new Date();
      const response = await fetch(
        `${import.meta.env.VITE_USER_POMODORO_DATA}/day`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "date-iso": date,
          },
          mode: "cors",
          credentials: "include",
          signal,
        }
      );

      if (!response.ok) {
        console.log(
          `${import.meta.env.VITE_USER_POMODORO_DATA}/day: response not good: `,
          response
        );
      } else {
        const data = await response.json();
        setPomodoroCount(data.completedPomodoros[0].pomodorocount);
        console.log("data: ", data);
        console.log(
          "data.pomodorocountarray: ",
          data.completedPomodoros[0].pomodorocount
        );
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  const userData = getUserDashboardInformation(
    import.meta.env.VITE_DASHBOARD_API_URL
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStartTimer(!startTimer);

    if (timer === 0) {
      try {
        const date = new Date();
        console.log("Date: ", date);
        const response = await fetch(import.meta.env.VITE_USER_POMODORO_DATA, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "date-iso": date,
          },
          mode: "cors",
          credentials: "include",
        });
        if (!response.ok) {
          console.log(
            "/Dashboard: HandleSubmit: Fetch Response: ",
            await response.json()
          );
        } else {
          console.log(await response.json());
          setPomodoroComplete(true);
        }
      } catch (error) {
        console.warn("/Dashboard Error: ", error);
      }
      //CHANGE BACCK AFTER TESTING
      // setTimer(1500);
      // set to 10seconds for testing purposes
      setTimer(3);
    } else {
      setPomodoroComplete(false);
    }
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
      setWorkIntervalCount((count) => count + 1);
      localStorage.setItem("work-interval", workIntervalCount + 1);
    }
  }, [startTimer, timer]);

  const seconds = String(timer % 60).padStart(2, 0);
  const minutes = String(Math.floor(timer / 60)).padStart(2, 0);

  const pomoParseInt = parseInt(pomodoroCount);

  const [displayPomo, setDisplayPomo] = useState([]);

  console.log("PomoParseInt: ", pomoParseInt);
  let strArr = [];
  for (let i = 0; i < pomoParseInt; i++) {
    strArr.push("I");
  }

  let newArr = [];
  let arr = [];
  for (let i = 0; i < strArr.length; i++) {
    if (i % 4 === 0) {
      arr.push(strArr[i]);
      newArr.push(arr);
      // setDisplayPomo(newArr);
      arr = [];
    } else {
      arr.push(strArr[i]);
    }
  }

  console.log("newArr: ", newArr);

  console.log("strArr: ", strArr);

  console.log("setDisplayPomo: ", displayPomo);

  return (
    <section class="user-dashboard">
      <div>
        <button class="timer-button" onClick={handleSubmit}>
          {minutes}:{seconds}
        </button>
      </div>
      <div>{pomodoroCount}</div>
      <div>Pomodoros: {parseInt(pomodoroCount)}</div>
      <div>Yddsaa: </div>
    </section>
  );
};

export default Dashboard;

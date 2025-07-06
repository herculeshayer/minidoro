import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getUserDashboardInformation,
  getRedirectUser,
} from "../components/requestsAPI";

import Timer from "../components/Timer";

const Dashboard = () => {
  const navigate = useNavigate();

  const [timer, setTimer] = useState(1500);
  const [startTimer, setStartTimer] = useState(false);
  const [pomodoroComplete, setPomodoroComplete] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const userRedirect = getRedirectUser(import.meta.env.VITE_REDIRECT_USER);

  useEffect(() => {
    if (userRedirect === false) {
      alert("Please login");
      navigate("/login");
    }
  }, [userRedirect]);

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
  }, [pomodoroComplete]);

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
      setTimer(1500);
    } else {
      setPomodoroComplete(false);
    }
  };

  const pomoParseInt = parseInt(pomodoroCount);

  let strArr = [];
  for (let i = 0; i < pomoParseInt; i++) {
    strArr.push("🍅");
  }

  let newArr = [];
  let arr = [];
  for (let i = 0; i < strArr.length; i++) {
    arr.push(strArr[i]);
    if (arr.length === 4) {
      newArr.push(arr);
      arr = [];
    }
  }

  if (arr.length > 0) {
    newArr.push(arr);
  }

  let displayPomo = newArr.map((group) => group.join("")).join(" ");

  return (
    <section class="user-dashboard">
      <div>
        <button class="timer-button" onClick={handleSubmit}>
          <Timer
            timer={timer}
            setTimer={setTimer}
            startTimer={startTimer}
            setStartTimer={setStartTimer}
          />
        </button>
      </div>
      <div style={{ fontSize: "2rem", marginTop: "3rem" }}>{displayPomo}</div>
    </section>
  );
};

export default Dashboard;

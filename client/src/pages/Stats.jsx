import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
export default function Stats() {
  /**
   * Make sure I'm not making several api calls on button clicks
   * Need to check if the data is similar or something
   * so each click does not overload the server with api calls
   */
  const [pomodoroCount, setPomodoroCount] = useState([{}]);
  const [rangeOfPomodoroData, setRangeOfPomodoroData] = useState("");

  const handleSubmitDay = async (typeOfQuery) => {
    // event.preventDefault();

    setRangeOfPomodoroData(typeOfQuery);
    const controller = new AbortController();
    const signal = controller.signal;
    const date = new Date();
    const response = await fetch(
      `${import.meta.env.VITE_USER_POMODORO_DATA}/${typeOfQuery}`,
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
        `${
          import.meta.env.VITE_USER_POMODORO_DATA
        }/${typeOfQuery}: response not good: `,
        response
      );
    } else {
      const data = await response.json();
      console.log("data.sessions.length: ", data.sessions.length);
      setPomodoroCount(data.sessions);
      // const pomoChart = () => {
      //   <LineChart width={600} height={300} data={data.sessions}>
      //     <CartesianGrid />
      //     <Line dataKey="sessions" />
      //     <XAxis dataKey="pomodoros" />
      //     <YAxis />
      //   </LineChart>;
      // };
      // if (data.sessions.length > 1) {
      //   console.log("hit");
      //   setPomodoroCount(data.sessions);
      // } else {
      //   setPomodoroCount(data.sessions[0].pomodorocount);
      // }
      // setPomodoroCount(data.sessions[0].pomodorocount);
      console.log("data: ", data);
      console.log(
        "data.sessions[0].pomodorocount: ",
        data.sessions[0].pomodorocount
      );
      console.log("data.sessions", data.sessions);
    }

    console.log("TypeOfQuery: ", typeOfQuery);
  };

  /**
   * need to display chart based on selection
   */
  return (
    <section>
      <h1>Stats Page</h1>
      <h1>{rangeOfPomodoroData}</h1>
      {/* <h1>Pomodoro Count: {pomodoroCount}</h1> */}
      <h1>Chart Below</h1>
      <LineChart width={600} height={300} data={pomodoroCount}>
        <CartesianGrid />
        <Tooltip />
        <Line dataKey="pomodorocount" type="monotone" activeDot={{ r: 4 }} />
        <XAxis dataKey="sessiondate" />
        <YAxis dataKey="pomodorocount" />
      </LineChart>
      <button
        disabled={rangeOfPomodoroData === "Day"}
        type="button"
        onClick={() => handleSubmitDay("Day")}
      >
        Day
      </button>
      <button
        disabled={rangeOfPomodoroData == "Week"}
        type="button"
        onClick={() => handleSubmitDay("Week")}
      >
        Week
      </button>
      <button
        disabled={rangeOfPomodoroData == "Month"}
        type="button"
        onClick={() => handleSubmitDay("Month")}
      >
        Month
      </button>
      <button
        disabled={rangeOfPomodoroData == "Year"}
        type="button"
        onClick={() => handleSubmitDay("Year")}
      >
        Year
      </button>
      <button
        disabled={rangeOfPomodoroData == "All"}
        type="button"
        onClick={() => handleSubmitDay("All")}
      >
        All
      </button>
    </section>
  );
}

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
  const [pomodoroCount, setPomodoroCount] = useState([{}]);
  const [rangeOfPomodoroData, setRangeOfPomodoroData] = useState("");

  const handleSubmitDay = async (typeOfQuery) => {
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
      console.warn(
        `${
          import.meta.env.VITE_USER_POMODORO_DATA
        }/${typeOfQuery}: response not good: `,
        response
      );
    } else {
      const data = await response.json();

      setPomodoroCount(data.sessions);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <section className="statspage-graph">
      <h1>{rangeOfPomodoroData}</h1>
      {rangeOfPomodoroData == "" ? (
        ""
      ) : (
        <LineChart width={1000} height={400} data={pomodoroCount}>
          <CartesianGrid />
          <Tooltip labelFormatter={formatDate} />
          <Line dataKey="pomodorocount" type="monotone" activeDot={{ r: 4 }} />
          <XAxis dataKey="sessiondate" tickFormatter={formatDate} />
          <YAxis dataKey="pomodorocount" />
        </LineChart>
      )}
      {/* <button
        disabled={rangeOfPomodoroData === "Day"}
        type="button"
        onClick={() => handleSubmitDay("Day")}
      >
        Day
      </button> */}
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

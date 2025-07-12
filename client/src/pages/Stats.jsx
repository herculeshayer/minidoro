import React, { useState, useEffect } from "react";

export default function Stats() {
  /**
   * Make sure I'm not making several api calls on button clicks
   * Need to check if the data is similar or something
   * so each click does not overload the server with api calls
   */
  const [pomodoroCount, setPomodoroCount] = useState(0);

  const handleSubmitDay = async (typeOfQuery) => {
    // event.preventDefault();

    const controller = new AbortController();
    const signal = controller.signal;
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

    console.log("TypeOfQuery: ", typeOfQuery);
  };
  return (
    <section>
      <h1>Stats Page</h1>
      <h1>{pomodoroCount}</h1>
      <button type="button" onClick={() => handleSubmitDay("day")}>
        Day
      </button>
    </section>
  );
}

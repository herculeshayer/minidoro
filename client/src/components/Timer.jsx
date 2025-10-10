import React, { useState, useEffect } from "react";

const Timer = ({ timer, setTimer, startTimer, setStartTimer }) => {
  const seconds = String(timer % 60).padStart(2, 0);
  const minutes = String(Math.floor(timer / 60)).padStart(2, 0);

  useEffect(() => {
    let countdownTimer;
    if (startTimer) {
      countdownTimer = setInterval(() => {
        setTimer((count) => --count);
      }, 1000);
    }
    if (timer < 1) {
      const audio = new Audio("../../public/sounds/notification.wav");
      audio.play().catch((e) => console.error("Playback failed: ", e));
      setStartTimer(false);
    }

    return () => clearInterval(countdownTimer);
  }, [startTimer, timer]);

  return (
    <section>
      <div>
        {minutes}:{seconds}
      </div>
    </section>
  );
};

export default Timer;

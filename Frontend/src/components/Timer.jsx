import React, { useEffect, useRef } from "react";
import { useGame } from "../contexts/GameContext";

function Timer() {
  const { 
    secondsRemaining, 
    setMiliSecondsRemaining, 
    miliSecondsRemaining, 
    setSecondsRemaining, 
    status, 
    setStatus 
  } = useGame();

  const startTimeRef = useRef(null);
  const requestIdRef = useRef(null);

  useEffect(() => {
    if (status === "ready") return;

    const updateTimer = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsedTime = currentTime - startTimeRef.current;
      const totalStartTime = 30000; // 30 seconds in milliseconds
      const remainingTime = Math.max(0, totalStartTime - elapsedTime);

      const newSeconds = Math.floor(remainingTime / 1000);
      const newMilliseconds = Math.floor(remainingTime % 1000);

      if (remainingTime <= 0) {
        setSecondsRemaining(0);
        setMiliSecondsRemaining(0);
        setStatus("ready");
        if (requestIdRef.current) {
          cancelAnimationFrame(requestIdRef.current);
        }
        return;
      }

      if (newSeconds !== secondsRemaining) {
        setSecondsRemaining(newSeconds);
      }
      if (newMilliseconds !== miliSecondsRemaining) {
        setMiliSecondsRemaining(newMilliseconds);
      }

      requestIdRef.current = requestAnimationFrame(updateTimer);
    };

    startTimeRef.current = null; // Reset start time when effect runs
    requestIdRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, [status, setSecondsRemaining, setMiliSecondsRemaining, setStatus, secondsRemaining, miliSecondsRemaining]);

  const formatNumber = (num, digits) => {
    return Math.max(0, num).toString().padStart(digits, '0');
  };

  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const milliseconds = miliSecondsRemaining;

  return (
    <div className="timer">
      {formatNumber(mins, 2)}:{formatNumber(seconds, 2)}:
      {formatNumber(milliseconds, 3)}
    </div>
  );
}

export default Timer;


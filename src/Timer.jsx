import React, { useState, useEffect } from 'react';
import './App.css'


function Timer({ onComplete }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [startTime, setStartTime] = useState(null);


  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const start = Number(localStorage.getItem("startTime"));
      const duration = Number(localStorage.getItem("duration"));

      const elapsed = Math.floor((Date.now() - start) / 1000);
      const remaining = duration - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);


  useEffect(() => {
    if (timeLeft > 0) return;
    if (timeLeft <= 0) {
      setIsRunning(false);
      if (!isBreak) onComplete();
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25*60 : 5*60);

      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro', { body: isBreak ? 'Break over!' : 'Focus session over!' });
      } else {
        alert(isBreak ? 'Break over!' : 'Focus session over!');
      }

      if ("serviceWorker" in navigator && "SyncManager" in window) {
        navigator.serviceWorker.ready.then(reg => {
          reg.sync.register("pomodoro-finished");
        });
      }

    }
    
  }, [timeLeft, isBreak, onComplete]);

  const formatTime = t => `${Math.floor(t/60).toString().padStart(2,'0')}:${(t%60).toString().padStart(2,'0')}`;

  return (
    <div>
      <h2 className='timer-info'>{isBreak ? 'Break' : 'Focus'}: </h2>
      <h2 className='timer'>{formatTime(timeLeft)}</h2>
      <div className='controls'>
        <button onClick={() => {
          const now = Date.now();
          setStartTime(now);
          localStorage.setItem("startTime", now);
          localStorage.setItem("duration", timeLeft);
          setIsRunning(true);
          }}>
          Start
        </button>
        <button onClick={() => setIsRunning(false)}>Pause</button>
        <button onClick={() => {setIsRunning(false); setTimeLeft(isBreak?5*60:25*60)}}>Reset</button>
      </div>
      
    </div>
  );
}

export default Timer;

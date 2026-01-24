import React, { useState, useEffect } from 'react';
import './App.css'


function Timer({ onComplete }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsRunning(false);
      if (!isBreak) onComplete();
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25*60 : 5*60);

      // Notification fallback
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro', { body: isBreak ? 'Break over!' : 'Focus session over!' });
      } else {
        alert(isBreak ? 'Break over!' : 'Focus session over!');
      }
    }
  }, [timeLeft, isBreak, onComplete]);

  const formatTime = t => `${Math.floor(t/60).toString().padStart(2,'0')}:${(t%60).toString().padStart(2,'0')}`;

  return (
    <div>
      <h2 className='timer-info'>{isBreak ? 'Break' : 'Focus'}: </h2>
      <h2 className='timer'>{formatTime(timeLeft)}</h2>
      <div className='controls'>
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button onClick={() => setIsRunning(false)}>Pause</button>
        <button onClick={() => {setIsRunning(false); setTimeLeft(isBreak?5*60:25*60)}}>Reset</button>
      </div>
      
    </div>
  );
}

export default Timer;

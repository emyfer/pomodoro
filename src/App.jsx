import React, { useState } from 'react';
import Timer from './Timer';
import Stats from './Stats';
import './App.css';

function App() {
  const [sessions, setSessions] = useState(0);

  const handleSessionComplete = () => {
    setSessions(s => s + 1);
  };

  return (
    <div className="App">
      <img src='coffee_image.png' alt='coffe mug'></img>
      <h1>Pomodoro Focus</h1>
      <Timer onComplete={handleSessionComplete} />
      <Stats sessions={sessions} />
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import Timer from './Timer';
import Stats from './Stats';

function App() {
  const [sessions, setSessions] = useState(0);

  const handleSessionComplete = () => {
    setSessions(s => s + 1);
  };

  return (
    <div className="App">
      <h1>Pomodoro Focus</h1>
      <Timer onComplete={handleSessionComplete} />
      <Stats sessions={sessions} />
    </div>
  );
}

export default App;

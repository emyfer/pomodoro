import React from 'react';
import './App.css'


function Stats({ sessions }) {
  return (
    <div className='stats'>
      <p>Pomodoro sessions completed: <span style={{fontWeight: "bold"}}>{sessions}</span></p>
    </div>
  );
}

export default Stats;

import React from 'react';

function Stats({ sessions }) {
  return (
    <div>
      <h3>Pomodoro sessions completed: {sessions}</h3>
    </div>
  );
}

export default Stats;

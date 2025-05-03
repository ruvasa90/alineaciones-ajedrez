
import React, { useState } from 'react';
import PlayerForm from './components/PlayerForm';
import PlayerTable from './components/PlayerTable';
import LineupGenerator from './components/LineupGenerator';

function App() {
  const [players, setPlayers] = useState([]);

  return (
    <div>
      <h1>Actur - Rey Fernando</h1>
      <PlayerForm players={players} setPlayers={setPlayers} />
      <PlayerTable players={players} />
      <LineupGenerator players={players} />
    </div>
  );
}

export default App;


import React, { useState } from 'react';
import PlayerForm from './components/PlayerForm';
import PlayerTable from './components/PlayerTable';
import LineupGenerator from './components/LineupGenerator';

function App() {
  const [players, setPlayers] = useState([]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">Actur - Rey Fernando</h1>
      <PlayerForm players={players} setPlayers={setPlayers} />
      <PlayerTable players={players} setPlayers={setPlayers} />
      <LineupGenerator players={players} />
    </div>
  );
}

export default App;

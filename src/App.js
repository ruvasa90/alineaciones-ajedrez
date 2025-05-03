
import React, { useState, useEffect } from 'react';
import PlayerForm from './components/PlayerForm';
import PlayerTable from './components/PlayerTable';
import LineupGenerator from './components/LineupGenerator';

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(storedPlayers);
  }, []);

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

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

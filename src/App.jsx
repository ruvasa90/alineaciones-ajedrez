import React, { useState } from 'react';
import PlayerForm from './PlayerForm';
import PlayerList from './PlayerList';
import Alignments from './Alignments';

function App() {
  const [players, setPlayers] = useState([]);

  const addPlayer = (player) => {
    setPlayers([...players, player]);
  };

  const deletePlayer = (id) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  const updatePlayer = (updatedPlayer) => {
    setPlayers(players.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p)));
  };

  return (
    <div style={{ backgroundColor: '#f5e6d0', padding: '20px' }}>
      <h1>Actur - Rey Fernando</h1>
      <PlayerForm addPlayer={addPlayer} />
      <PlayerList
        players={players}
        deletePlayer={deletePlayer}
        updatePlayer={updatePlayer}
      />
      <Alignments players={players} />
    </div>
  );
}

export default App;
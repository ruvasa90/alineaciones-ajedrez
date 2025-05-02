import React, { useState } from 'react';
import PlayerTable from './PlayerTable';
import LineupGenerator from './LineupGenerator';

function App() {
  const [players, setPlayers] = useState([
    { name: "Juan Pérez", eloFide: 2200, eloFada: 2100, category: "Preferente", roundsWanted: 9, availability: [1,2,3,4,5,6,7,8,9] },
    { name: "Ana Torres", eloFide: 2150, eloFada: 2050, category: "Preferente", roundsWanted: 3, availability: [1,2,3] },
    { name: "Luis Gómez", eloFide: 2000, eloFada: 1950, category: "Primera", roundsWanted: 5, availability: [1,2,4,5,6] },
    { name: "María Sánchez", eloFide: 1850, eloFada: 1800, category: "Segunda", roundsWanted: 2, availability: [1,3,5] }
  ]);

  return (
    <div className="app">
      <h1>Actur - Rey Fernando</h1>
      <PlayerTable players={players} setPlayers={setPlayers} />
      <LineupGenerator players={players} />
    </div>
  );
}

export default App;
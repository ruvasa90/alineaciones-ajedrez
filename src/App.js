import React, { useState } from 'react';
import './index.css';
import logo from './src/logo.jpg';

const initialPlayers = [
  { id:1, name: 'David Lopez', fide: 2206, fada: 2203, category: 'Preferente', availableRounds: [1,2,3,4,5,6,7,8,9] },
  { id:2, name: 'Antonio Abos', fide: 2024, fada: 2017, category: 'Preferente', availableRounds: [1,2,3,4,5,6,7,8,9] },
  { id:3, name: 'José Joaquin Perez', fide: 1909, fada: 1911, category: 'Preferente', availableRounds: [1,2,3,4,5,6,7,8,9] },
  { id:4, name: 'Mateo Leon', fide: 1877, fada: 1826, category: 'Preferente', availableRounds: [1,2,3,4,5,6,7,8,9] },
  { id:5, name: 'Mariano Aviol', fide: 1871, fada: 1883, category: ['Preferente','Primera'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { id:6, name: 'Sergio Garcia', fide: 1865, fada: 1902, category: ['Preferente','Primera'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { id:7, name: 'Jose Maria Bernad', fide: 1835, fada: 1780, category: ['Preferente','Primera'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { id:8, name: 'Jose Manuel Manzanares', fide: 1758, fada: 1752, category: ['Preferente','Primera','Segunda'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { id:9, name: 'Alejandro Manzanares', fide: 1748, fada: 1727, category: ['Preferente','Primera','Segunda'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { id:10, name: 'Pablo Fernandez', fide: 1745, fada: 1677, category: ['Primera'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { id:11, name: 'Pedro Fernandez', fide: 1692, fada: 1665, category: ['Primera'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { id:12, name: 'Ruben Vazquez', fide: 1690, fada: 1621, category: ['Preferente','Primera','Segunda'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { id:13, name: 'Adrian Hernandez', fide: 1669, fada: 1561, category: ['Preferente','Primera','Segunda'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { id:14, name: 'Luis Llucia', fide: 1607, fada: 1586, category: ['Segunda'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { id:15, name: 'Sergio Bodega', fide: 1602, fada: 1571, category: ['Segunda'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { id:16, name: 'Jose Antonio Alvira', fide: 1504, fada: 1543, category: ['Segunda'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { id:17, name: 'Francisco Lara', fide: 1504, fada: 1506, category: ['Segunda'], availableRounds: [1,2,3,4,5,6,7,8,9] },
];

const categories = ['Preferente', 'Primera', 'Segunda'];
const roundsPerCategory = {
  Preferente: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  Primera: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  Segunda: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

function App() {
  const [players, setPlayers] = useState(initialPlayers);
  const [newPlayer, setNewPlayer] = useState({ name: '', fide: '', fada: '', category: 'Preferente', availableRounds: [] });

  const handleAddPlayer = () => {
    const id = players.length + 1;
    setPlayers([...players, { ...newPlayer, id, fide: parseInt(newPlayer.fide), fada: parseInt(newPlayer.fada) }]);
    setNewPlayer({ name: '', fide: '', fada: '', category: 'Preferente', availableRounds: [] });
  };

  const handleDeletePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const handleEditPlayer = (id, field, value) => {
    setPlayers(players.map(player =>
      player.id === id ? { ...player, [field]: field === 'fide' || field === 'fada' ? parseInt(value) : value } : player
    ));
  };

  const handleRoundsSelection = (category) => roundsPerCategory[category];

  const generateTeams = () => {
    const categorized = {
      Preferente: [],
      Primera: [],
      Segunda: []
    };

    players.forEach(player => {
      player.totalRounds = player.availableRounds.length;
      categorized[player.category].push(player);
    });

    categorized.Preferente.sort((a, b) => b.fide - a.fide);
    categorized.Primera.sort((a, b) => b.fada - a.fada);
    categorized.Segunda.sort((a, b) => b.fada - a.fada);

    const teams = {};

    ['Preferente', 'Primera', 'Segunda'].forEach(category => {
      const available = categorized[category].filter(p => p.totalRounds > 0);
      let starters = available.slice(0, 4);
      let reserves = available.slice(4);

      reserves.forEach(reserve => {
        const lowerCategory = category === 'Preferente' ? 'Primera' : (category === 'Primera' ? 'Segunda' : null);
        if (lowerCategory) {
          const lowerStarters = categorized[lowerCategory].slice(0, 4);
          lowerStarters.forEach((lower, idx) => {
            if (reserve.totalRounds > lower.totalRounds || reserve.fide > lower.fide) {
              [lowerStarters[idx], reserves[idx]] = [reserve, lower];
            }
          });
        }
      });

      teams[category] = { starters, reserves };
    });

    return teams;
  };

  return (
    <div className="app">
      <h1>ARF Chess Manager</h1>
      <PlayerForm addPlayer={addPlayer} />
      <PlayerTable
        players={players}
        updatePlayer={updatePlayer}
        deletePlayer={deletePlayer}
      />
      <button onClick={() => {
        const teams = generateTeams();
        console.log('Equipos generados:', teams);
        alert('Equipos generados. Revisa la consola.');
      }}>
        Generar Equipos
      </button>
    </div>
  );
}

export default App;

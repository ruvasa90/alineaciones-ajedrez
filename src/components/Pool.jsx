import React, { useState, useEffect } from 'react';

export default function Pool({ onDragStart }) {
  const [players, setPlayers] = useState(() => {
    const stored = localStorage.getItem('players');
    return stored ? JSON.parse(stored) : [];
  });
  const [newPlayer, setNewPlayer] = useState({ name: '', fide: 0, fada: 0 });

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  function handleAddPlayer() {
    if (!newPlayer.name.trim()) return;
    const newEntry = {
      id: Date.now(),
      name: newPlayer.name,
      fide: parseInt(newPlayer.fide, 10),
      fada: parseInt(newPlayer.fada, 10),
    };
    setPlayers([...players, newEntry].sort((a, b) => b.fide - a.fide));
    setNewPlayer({ name: '', fide: 0, fada: 0 });
  }

  function handleEditPlayer(id, field, value) {
    setPlayers(players.map(p => p.id === id ? { ...p, [field]: value } : p).sort((a, b) => b.fide - a.fide));
  }

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-xl font-bold mb-2">Pool Principal</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre"
          value={newPlayer.name}
          onChange={e => setNewPlayer({ ...newPlayer, name: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          type="number"
          placeholder="ELO FIDE"
          value={newPlayer.fide}
          onChange={e => setNewPlayer({ ...newPlayer, fide: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          type="number"
          placeholder="ELO FADA"
          value={newPlayer.fada}
          onChange={e => setNewPlayer({ ...newPlayer, fada: e.target.value })}
          className="border p-1 mr-2"
        />
        <button onClick={handleAddPlayer} className="bg-blue-500 text-white px-2 py-1 rounded">Añadir</button>
      </div>

      <ul>
        {players.map(player => (
          <li
            key={player.id}
            draggable
            onDragStart={() => onDragStart(player)}
            className="p-2 border-b cursor-move hover:bg-gray-100"
          >
            <input
              type="text"
              value={player.name}
              onChange={e => handleEditPlayer(player.id, 'name', e.target.value)}
              className="border p-1 mr-2"
            />
            FIDE: 
            <input
              type="number"
              value={player.fide}
              onChange={e => handleEditPlayer(player.id, 'fide', parseInt(e.target.value, 10))}
              className="border p-1 mx-1 w-20"
            />
            FADA: 
            <input
              type="number"
              value={player.fada}
              onChange={e => handleEditPlayer(player.id, 'fada', parseInt(e.target.value, 10))}
              className="border p-1 mx-1 w-20"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
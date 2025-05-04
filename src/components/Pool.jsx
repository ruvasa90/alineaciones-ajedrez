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

  function handleDeletePlayer(id) {
    setPlayers(players.filter(p => p.id !== id));
  }

  return (
    <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 max-w-2xl mx-auto mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Pool Principal</h2>

      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        <input
          type="text"
          placeholder="Nombre"
          value={newPlayer.name}
          onChange={e => setNewPlayer({ ...newPlayer, name: e.target.value })}
          className="border border-gray-300 rounded px-2 py-1"
        />
        <input
          type="number"
          placeholder="ELO FIDE"
          value={newPlayer.fide}
          onChange={e => setNewPlayer({ ...newPlayer, fide: e.target.value })}
          className="border border-gray-300 rounded px-2 py-1 w-24"
        />
        <input
          type="number"
          placeholder="ELO FADA"
          value={newPlayer.fada}
          onChange={e => setNewPlayer({ ...newPlayer, fada: e.target.value })}
          className="border border-gray-300 rounded px-2 py-1 w-24"
        />
        <button
          onClick={handleAddPlayer}
          className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-1"
        >
          Añadir
        </button>
      </div>

      <ul>
        {players.map(player => (
          <li
            key={player.id}
            draggable
            onDragStart={() => onDragStart(player)}
            className="flex items-center justify-between p-2 border-b border-gray-300 hover:bg-gray-50"
          >
            <div className="flex-grow">
              <input
                type="text"
                value={player.name}
                onChange={e => handleEditPlayer(player.id, 'name', e.target.value)}
                className="border rounded px-2 py-1 mr-2 w-40"
              />
              <span className="text-sm text-gray-600 mr-1">FIDE:</span>
              <input
                type="number"
                value={player.fide}
                onChange={e => handleEditPlayer(player.id, 'fide', parseInt(e.target.value, 10))}
                className="border rounded px-2 py-1 w-20 mr-2"
              />
              <span className="text-sm text-gray-600 mr-1">FADA:</span>
              <input
                type="number"
                value={player.fada}
                onChange={e => handleEditPlayer(player.id, 'fada', parseInt(e.target.value, 10))}
                className="border rounded px-2 py-1 w-20"
              />
            </div>
            <button
              onClick={() => handleDeletePlayer(player.id)}
              className="bg-red-400 hover:bg-red-500 text-white rounded px-3 py-1 ml-4"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

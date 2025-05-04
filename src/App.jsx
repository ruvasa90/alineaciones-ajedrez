import React, { useState, useEffect } from 'react';

const initialPlayers = [
  { name: 'David Lopez', fide: 2206, fada: 2203 },
  { name: 'Antonio Abos', fide: 2024, fada: 2017 },
  { name: 'José Joaquin Perez', fide: 1909, fada: 1911 },
  { name: 'Mateo Leon', fide: 1877, fada: 1826 },
  { name: 'Mariano Aviol', fide: 1871, fada: 1883 },
  { name: 'Sergio Garcia', fide: 1865, fada: 1902 },
  { name: 'Jose Maria Bernad', fide: 1835, fada: 1780 },
  { name: 'Jose Manuel Manzanares', fide: 1758, fada: 1752 },
  { name: 'Alejandro Manzanares', fide: 1748, fada: 1727 },
  { name: 'Pablo Fernandez', fide: 1745, fada: 1677 },
  { name: 'Pedro Fernandez', fide: 1692, fada: 1665 },
  { name: 'Ruben Vazquez', fide: 1690, fada: 1621 },
  { name: 'Adrian Hernandez', fide: 1669, fada: 1561 },
  { name: 'Luis Llucia', fide: 1607, fada: 1586 },
  { name: 'Sergio Bodega', fide: 1602, fada: 1571 },
  { name: 'Jose Antonio Alvira', fide: 1504, fada: 1543 },
  { name: 'Francisco Lara', fide: 1504, fada: 1506 }
];

const App = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({ name: '', fide: '', fada: '' });
  const [rounds, setRounds] = useState({
    PF: Array(9).fill().map(() => ({ titulares: [], reservas: [] })),
    PR: Array(9).fill().map(() => ({ titulares: [], reservas: [] })),
    SE: Array(9).fill().map(() => ({ titulares: [], reservas: [] }))
  });

  useEffect(() => {
    const stored = localStorage.getItem('players');
    if (stored) {
      setPlayers(JSON.parse(stored));
    } else {
      setPlayers(initialPlayers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  const handleDragStart = (e, player) => {
    e.dataTransfer.setData('player', JSON.stringify(player));
  };

  const handleDrop = (e, category, roundIdx, type) => {
    e.preventDefault();
    const player = JSON.parse(e.dataTransfer.getData('player'));

    setRounds((prev) => {
      const updated = { ...prev };
      const round = updated[category][roundIdx];

      const isTitularElsewhere = Object.keys(updated).some(cat =>
        cat !== category && updated[cat][roundIdx].titulares.find(p => p.name === player.name)
      );

      if (type === 'titulares' && !isTitularElsewhere) {
        if (!round.titulares.find(p => p.name === player.name)) {
          round.titulares.push(player);
        }
      } else if (type === 'reservas') {
        if (!round.reservas.find(p => p.name === player.name)) {
          round.reservas.push(player);
        }
      }

      return updated;
    });
  };

  const handleAddPlayer = () => {
    if (newPlayer.name && newPlayer.fide && newPlayer.fada) {
      setPlayers((prev) => [...prev, {
        name: newPlayer.name,
        fide: parseInt(newPlayer.fide),
        fada: parseInt(newPlayer.fada)
      }].sort((a, b) => b.fide - a.fide));
      setNewPlayer({ name: '', fide: '', fada: '' });
    }
  };

  return (
    <div className="min-h-screen p-6 bg-[#f4ecd8] text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestor de Alineaciones de Ajedrez</h1>

      <div className="mb-6 p-4 bg-white rounded-2xl shadow-md max-w-xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Añadir Nuevo Jugador</h2>
        <div className="flex gap-2 mb-2">
          <input
            className="flex-1 border rounded px-2 py-1"
            placeholder="Nombre"
            value={newPlayer.name}
            onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
          />
          <input
            className="w-20 border rounded px-2 py-1"
            placeholder="FIDE"
            type="number"
            value={newPlayer.fide}
            onChange={(e) => setNewPlayer({ ...newPlayer, fide: e.target.value })}
          />
          <input
            className="w-20 border rounded px-2 py-1"
            placeholder="FADA"
            type="number"
            value={newPlayer.fada}
            onChange={(e) => setNewPlayer({ ...newPlayer, fada: e.target.value })}
          />
          <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={handleAddPlayer}>Añadir</button>
        </div>
      </div>

      <div className="mb-10 p-4 bg-white rounded-2xl shadow-md max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Pool de Jugadores</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {players.map((player, idx) => (
            <div
              key={idx}
              className="p-2 bg-green-100 rounded cursor-move hover:bg-green-200 transition"
              draggable
              onDragStart={(e) => handleDragStart(e, player)}
            >
              <div className="font-medium">{player.name}</div>
              <div className="text-sm">FIDE: {player.fide} / FADA: {player.fada}</div>
            </div>
          ))}
        </div>
      </div>

      {['PF', 'PR', 'SE'].map((cat) => (
        <div key={cat} className="mb-10 max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Categoría {cat}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rounds[cat].map((round, idx) => (
              <div key={idx} className="p-3 bg-white rounded-2xl shadow-md">
                <h3 className="font-semibold mb-2">Ronda {idx + 1}</h3>
                <div
                  className="mb-3 p-2 bg-blue-50 rounded min-h-[60px]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, cat, idx, 'titulares')}
                >
                  <strong className="block mb-1">Titulares:</strong>
                  {round.titulares.map((p, i) => (
                    <div key={i} className="p-1 bg-blue-100 rounded mb-1 text-sm">{p.name}</div>
                  ))}
                </div>
                <div
                  className="p-2 bg-yellow-50 rounded min-h-[60px]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, cat, idx, 'reservas')}
                >
                  <strong className="block mb-1">Reservas:</strong>
                  {round.reservas.map((p, i) => (
                    <div key={i} className="p-1 bg-yellow-100 rounded mb-1 text-sm">{p.name}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

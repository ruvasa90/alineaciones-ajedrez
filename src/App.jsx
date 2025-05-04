import React, { useState, useEffect } from 'react';
import RoundsBoard from './components/RoundsBoard';

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

      if (type === 'titulares') {
        if (!round.titulares.find(p => p.name === player.name)) {
          round.titulares.push(player);
        }
      } else {
        if (!round.reservas.find(p => p.name === player.name)) {
          round.reservas.push(player);
        }
      }

      return updated;
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestor de Alineaciones de Ajedrez</h1>

      <div className="mb-6 p-2 border rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Pool Principal</h2>
        <div className="grid grid-cols-3 gap-2">
          {players.sort((a, b) => b.fide - a.fide).map((player, idx) => (
            <div
              key={idx}
              className="p-2 bg-green-100 rounded cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, player)}
            >
              {player.name} (FIDE: {player.fide}, FADA: {player.fada})
            </div>
          ))}
        </div>
      </div>

      {['PF', 'PR', 'SE'].map((cat) => (
        <div key={cat} className="mb-8">
          <h2 className="text-xl font-bold mb-2">Categoría {cat}</h2>
          <div className="grid grid-cols-3 gap-4">
            {rounds[cat].map((round, idx) => (
              <div key={idx} className="border p-2 rounded-xl">
                <h3 className="font-semibold mb-1">Ronda {idx + 1}</h3>
                <div
                  className="mb-2 p-1 bg-blue-100 rounded"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, cat, idx, 'titulares')}
                >
                  <strong>Titulares:</strong>
                  {round.titulares.map((p, i) => (
                    <div key={i} className="p-1 bg-blue-200 rounded my-1">
                      {p.name}
                    </div>
                  ))}
                </div>
                <div
                  className="p-1 bg-yellow-100 rounded"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, cat, idx, 'reservas')}
                >
                  <strong>Reservas:</strong>
                  {round.reservas.map((p, i) => (
                    <div key={i} className="p-1 bg-yellow-200 rounded my-1">
                      {p.name}
                    </div>
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

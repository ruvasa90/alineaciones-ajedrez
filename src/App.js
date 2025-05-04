import React, { useState } from 'react';
import './App.css';

const initialPlayers = [
  { name: 'David Lopez', fide: 2206, fada: 2203, category: ['Preferente'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { name: 'Antonio Abos', fide: 2024, fada: 2017, category: ['Preferente'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { name: 'José Joaquin Perez', fide: 1909, fada: 1911, category: ['Preferente'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { name: 'Mateo Leon', fide: 1877, fada: 1826, category: ['Preferente'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { name: 'Mariano Aviol', fide: 1871, fada: 1883, category: ['Preferente'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { name: 'Sergio Garcia', fide: 1865, fada: 1902, category: ['Preferente'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { name: 'Jose Maria Bernad', fide: 1835, fada: 1780, category: ['Preferente'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { name: 'Jose Manuel Manzanares', fide: 1758, fada: 1752, category: ['Preferente'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { name: 'Alejandro Manzanares', fide: 1748, fada: 1727, category: ['Preferente'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { name: 'Pablo Fernandez', fide: 1745, fada: 1677, category: ['Preferente'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { name: 'Pedro Fernandez', fide: 1692, fada: 1665, category: ['Preferente'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { name: 'Ruben Vazquez', fide: 1690, fada: 1621, category: ['Preferente'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { name: 'Adrian Hernandez', fide: 1669, fada: 1561, category: ['Preferente'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { name: 'Luis Llucia', fide: 1607, fada: 1586, category: ['Preferente'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { name: 'Sergio Bodega', fide: 1602, fada: 1571, category: ['Preferente'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { name: 'Jose Antonio Alvira', fide: 1504, fada: 1543, category: ['Preferente'], availableRounds: [1,2,3,4,5,6,7,8,9] },
  { name: 'Francisco Lara', fide: 1504, fada: 1506, category: ['Preferente'], availableRounds: [1,2,3,4,5,6,7,8,9] },
];

function App() {
  const [players, setPlayers] = useState(initialPlayers);

  const handleCategoryChange = (index, category) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].category = category;
    setPlayers(updatedPlayers);
  };

  const handleRoundsChange = (index, rounds) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].availableRounds = rounds;
    setPlayers(updatedPlayers);
  };

  return (
    <div style={{ backgroundColor: '#f4ecd8', padding: '20px' }}>
      <h1>Actur - Rey Fernando: Gestión de Jugadores</h1>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>ELO FIDE</th>
            <th>ELO FADA</th>
            <th>Categorías</th>
            <th>Rondas Disponibles</th>
          </tr>
        </thead>
        <tbody>
          {players.sort((a, b) => b.fide - a.fide).map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.fide}</td>
              <td>{player.fada}</td>
              <td>
                <select
                  multiple
                  value={player.category}
                  onChange={(e) =>
                    handleCategoryChange(
                      index,
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                >
                  <option value="Preferente">Preferente</option>
                  <option value="Primera">Primera</option>
                  <option value="Segunda">Segunda</option>
                </select>
              </td>
              <td>
                <select
                  multiple
                  value={player.availableRounds}
                  onChange={(e) =>
                    handleRoundsChange(
                      index,
                      Array.from(e.target.selectedOptions, (option) => parseInt(option.value))
                    )
                  }
                >
                  {[...Array(9)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Ronda {i + 1}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

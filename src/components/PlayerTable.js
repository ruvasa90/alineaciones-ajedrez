
import React from 'react';

function PlayerTable({ players, setPlayers }) {
  const handleDelete = id => setPlayers(players.filter(p => p.id !== id));

  return (
    <table className="w-full bg-white shadow rounded mb-4">
      <thead>
        <tr>
          <th>Nombre</th><th>ELO Fide</th><th>ELO Fada</th><th>Categoría</th><th>Rondas</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {players.map(p => (
          <tr key={p.id}>
            <td>{p.name}</td><td>{p.fideElo}</td><td>{p.fadaElo}</td><td>{p.category}</td><td>{p.rounds}</td>
            <td><button onClick={() => handleDelete(p.id)} className="text-red-500">Eliminar</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlayerTable;

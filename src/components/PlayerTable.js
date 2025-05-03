
import React from 'react';

function PlayerTable({ players }) {
  const sortedPlayers = [...players].sort((a, b) => b.fideElo - a.fideElo);

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>ELO FIDE</th>
          <th>ELO FADA</th>
          <th>Categorías</th>
          <th>Rondas</th>
        </tr>
      </thead>
      <tbody>
        {sortedPlayers.map(player => (
          <tr key={player.id}>
            <td>{player.name}</td>
            <td>{player.fideElo}</td>
            <td>{player.fadaElo}</td>
            <td>{player.categories.join(', ')}</td>
            <td>{player.availableRounds.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlayerTable;

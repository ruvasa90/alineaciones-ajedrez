import React from 'react';

function PlayerList({ players, deletePlayer, updatePlayer }) {
  return (
    <div>
      <h2>Lista de Jugadores</h2>
      <ul>
        {players.map((p) => (
          <li key={p.id}>
            {p.name} - FIDE: {p.fideElo} / FADA: {p.fadaElo} - Categorías: {p.category.join(', ')}
            <button onClick={() => deletePlayer(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;
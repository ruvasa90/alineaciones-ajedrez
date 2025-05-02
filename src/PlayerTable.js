import React from 'react';

function PlayerTable({ players, setPlayers }) {
  const handleChange = (index, field, value) => {
    const updated = [...players];
    updated[index][field] = value;
    setPlayers(updated);
  };

  return (
    <div>
      <h2>Lista de jugadores</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th><th>ELO Fide</th><th>ELO Fada</th><th>Categoría</th><th>Rondas deseadas</th><th>Disponibilidad</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, idx) => (
            <tr key={idx}>
              <td>{p.name}</td>
              <td><input type="number" value={p.eloFide} onChange={e => handleChange(idx, 'eloFide', +e.target.value)} /></td>
              <td><input type="number" value={p.eloFada} onChange={e => handleChange(idx, 'eloFada', +e.target.value)} /></td>
              <td>
                <select value={p.category} onChange={e => handleChange(idx, 'category', e.target.value)}>
                  <option>Preferente</option>
                  <option>Primera</option>
                  <option>Segunda</option>
                </select>
              </td>
              <td><input type="number" value={p.roundsWanted} onChange={e => handleChange(idx, 'roundsWanted', +e.target.value)} /></td>
              <td><input type="text" value={p.availability.join(',')} onChange={e => handleChange(idx, 'availability', e.target.value.split(',').map(Number))} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerTable;
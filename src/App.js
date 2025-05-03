import React, { useState } from 'react';
import PlayerTable from './components/PlayerTable';

function App() {
  const [players, setPlayers] = useState([]);

  const handleAdd = (newPlayer) => {
    setPlayers([...players, newPlayer]);
  };

  const handleEdit = (player) => {
    // Lógica de edición aquí
  };

  const handleDelete = (player) => {
    setPlayers(players.filter(p => p !== player));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#5a4635] mb-4">Actur - Rey Fernando</h1>
      <PlayerTable players={players} onEdit={handleEdit} onDelete={handleDelete} />
      {/* Aquí puedes agregar más componentes: formulario, exportar PDF, etc. */}
    </div>
  );
}

export default App;
import React from 'react';
import Pool from './components/Pool';
import RoundsBoard from './components/RoundsBoard';

export default function App() {
  const [draggedPlayer, setDraggedPlayer] = React.useState(null);

  function handleDragStart(player) {
    setDraggedPlayer(player);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestor de Alineaciones de Ajedrez</h1>
      <Pool onDragStart={handleDragStart} />
      <RoundsBoard draggedPlayer={draggedPlayer} setDraggedPlayer={setDraggedPlayer} />
    </div>
  );
}
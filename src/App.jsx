import React from 'react';
import RoundsBoard from './components/RoundsBoard';

const App = () => {
  const pfRounds = Array(9).fill([]);
  const prRounds = Array(9).fill([]);
  const seRounds = Array(9).fill([]);

  const handleDrop = (e, category, roundIndex) => {
    console.log(`Dropped on ${category} round ${roundIndex + 1}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestor de Alineaciones de Ajedrez</h1>
      <RoundsBoard category="PF" rounds={pfRounds} onDropPlayer={handleDrop} />
      <RoundsBoard category="PR" rounds={prRounds} onDropPlayer={handleDrop} />
      <RoundsBoard category="SE" rounds={seRounds} onDropPlayer={handleDrop} />
    </div>
  );
};

export default App;

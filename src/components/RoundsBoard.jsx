import React from 'react';

const RoundsBoard = ({ category, rounds, onDropPlayer }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{category}</h2>
      <div className="grid grid-cols-3 gap-4">
        {rounds.map((round, index) => (
          <div key={index} className="border rounded-xl p-2 bg-gray-100 shadow">
            <h3 className="font-semibold mb-1">Ronda {index + 1}</h3>
            <div
              className="min-h-20 bg-white rounded p-1"
              onDrop={(e) => onDropPlayer(e, category, index)}
              onDragOver={(e) => e.preventDefault()}
            >
              {round.map((player, idx) => (
                <div key={idx} className="p-1 m-1 bg-blue-100 rounded">
                  {player.name} ({player.role})
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoundsBoard;

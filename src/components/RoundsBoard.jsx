import React from "react";

export default function RoundsBoard({ categories, onDrop }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {categories.map((category) => (
        <div
          key={category.name}
          className="p-4 bg-white rounded-2xl shadow-md"
        >
          <h3 className="text-lg font-bold mb-2">{category.name}</h3>
          {category.rounds.map((round, index) => (
            <div
              key={index}
              className="mb-2 p-2 bg-gray-100 rounded-xl min-h-[80px]"
              onDrop={(e) => onDrop(e, category.name, index)}
              onDragOver={(e) => e.preventDefault()}
            >
              <p className="text-sm font-semibold mb-1">Ronda {index + 1}</p>
              <ul className="space-y-1">
                {round.players.map((player, idx) => (
                  <li
                    key={idx}
                    className="p-1 bg-gray-200 rounded"
                  >
                    {player.name} ({player.role})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

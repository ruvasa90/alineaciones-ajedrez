import React from "react";

export default function PlayerPool({ players, onEdit, onDelete }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2">Player Pool</h2>
      <ul className="space-y-2">
        {players.map((player, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 bg-gray-100 rounded-xl"
          >
            <span>
              {player.name} (FIDE: {player.eloFide}, FADA: {player.eloFada})
            </span>
            <div>
              <button
                onClick={() => onEdit(player)}
                className="mr-2 text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(player)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

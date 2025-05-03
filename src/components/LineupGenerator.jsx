
import React from 'react';

function LineupGenerator({ players }) {
  const categories = ['Preferente', 'Primera', 'Segunda'];
  const rounds = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <div>
      {rounds.map(r => (
        <div key={r} className="mb-6">
          <h2 className="text-xl font-bold mb-2">Ronda {r}</h2>
          {categories.map(cat => {
            const catPlayers = players.filter(p => p.category.includes(cat));
            const sorted = [...catPlayers].sort((a, b) =>
              cat === 'Preferente' ? b.fideElo - a.fideElo : b.fadaElo - a.fadaElo
            );
            const lineup = sorted.slice(0, 4);
            return (
              <div key={cat} className="mb-4">
                <h3 className="font-semibold">{cat}</h3>
                <ul className="list-disc pl-5">
                  {lineup.length > 0
                    ? lineup.map(p => <li key={p.id}>{p.name}</li>)
                    : <li>Jugador no asignado</li>}
                </ul>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default LineupGenerator;
    
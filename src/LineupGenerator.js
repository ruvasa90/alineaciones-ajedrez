import React from 'react';

function LineupGenerator({ players }) {
  const categories = ["Preferente", "Primera", "Segunda"];

  const getLineup = (category, round) => {
    let pool = players.filter(p => p.availability.includes(round));

    // Priorizar jugadores con <=4 rondas deseadas
    let priorityPlayers = pool.filter(p => p.roundsWanted <= 4);
    let restPlayers = pool.filter(p => p.roundsWanted > 4);

    const sortPlayers = (arr) => {
      if (category === "Preferente") {
        return arr.sort((a, b) => b.eloFide - a.eloFide);
      } else {
        return arr.sort((a, b) => b.eloFada - a.eloFada);
      }
    };

    if (category === "Preferente") {
      priorityPlayers = priorityPlayers.filter(p => p.category === "Preferente");
      restPlayers = restPlayers.filter(p => p.category === "Preferente");
    } else if (category === "Primera") {
      priorityPlayers = priorityPlayers.filter(p => p.category === "Primera" || p.category === "Preferente");
      restPlayers = restPlayers.filter(p => p.category === "Primera" || p.category === "Preferente");
    } else {
      priorityPlayers = priorityPlayers.filter(p => p.category === "Segunda" || p.category === "Primera" || p.category === "Preferente");
      restPlayers = restPlayers.filter(p => p.category === "Segunda" || p.category === "Primera" || p.category === "Preferente");
    }

    const ordered = [...sortPlayers(priorityPlayers), ...sortPlayers(restPlayers)];
    return ordered.slice(0, 4);
  };

  return (
    <div>
      <h2>Alineaciones por ronda</h2>
      {[...Array(9).keys()].map(round => (
        <div key={round} style={{marginBottom: '20px', padding: '10px', border: '1px solid #bfa980', borderRadius: '10px'}}>
          <h3>Ronda {round + 1}</h3>
          {categories.map(cat => (
            <div key={cat}>
              <h4>{cat}</h4>
              <ul>
                {getLineup(cat, round + 1).map(p => (
                  <li key={p.name}>{p.name} (ELO: {cat === "Preferente" ? p.eloFide : p.eloFada})</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default LineupGenerator;
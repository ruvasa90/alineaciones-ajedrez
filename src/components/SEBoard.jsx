import React from 'react';

const SEBoard = ({ rounds, onDropPlayer }) => {
  return (
    <div className="category-board">
      <h2 className="category-title">Categoría SE (ELO FADA)</h2>
      {rounds.map((round, index) => (
        <div key={index} className="round">
          <h3>Ronda {index + 1}</h3>
          <div className="section">
            <h4>Titulares</h4>
            <div className="slot" onDrop={(e) => onDropPlayer(e, 'SE', index, 'titular')} onDragOver={(e) => e.preventDefault()}>
              {round.titulares.map(player => (
                <div key={player.id} className="player-card">{player.name} ({player.eloFada})</div>
              ))}
            </div>
          </div>
          <div className="section">
            <h4>Reservas</h4>
            <div className="slot" onDrop={(e) => onDropPlayer(e, 'SE', index, 'reserva')} onDragOver={(e) => e.preventDefault()}>
              {round.reservas.map(player => (
                <div key={player.id} className="player-card">{player.name} ({player.eloFada})</div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SEBoard;

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialPlayers = [
  { id: '1', name: 'David Lopez', fide: 2206, fada: 2203 },
  { id: '2', name: 'Antonio Abos', fide: 2024, fada: 2017 },
  { id: '3', name: 'José Joaquin Perez', fide: 1909, fada: 1911 },
  { id: '4', name: 'Mateo Leon', fide: 1877, fada: 1826 },
  { id: '5', name: 'Mariano Aviol', fide: 1871, fada: 1883 },
  { id: '6', name: 'Sergio Garcia', fide: 1865, fada: 1902 },
  { id: '7', name: 'Jose Maria Bernad', fide: 1835, fada: 1780 },
  { id: '8', name: 'Jose Manuel Manzanares', fide: 1758, fada: 1752 },
  { id: '9', name: 'Alejandro Manzanares', fide: 1748, fada: 1727 },
  { id: '10', name: 'Pablo Fernandez', fide: 1745, fada: 1677 },
  { id: '11', name: 'Pedro Fernandez', fide: 1692, fada: 1665 },
  { id: '12', name: 'Ruben Vazquez', fide: 1690, fada: 1621 },
  { id: '13', name: 'Adrian Hernandez', fide: 1669, fada: 1561 },
  { id: '14', name: 'Luis Llucia', fide: 1607, fada: 1586 },
  { id: '15', name: 'Sergio Bodega', fide: 1602, fada: 1571 },
  { id: '16', name: 'Jose Antonio Alvira', fide: 1504, fada: 1543 },
  { id: '17', name: 'Francisco Lara', fide: 1504, fada: 1506 }
];

const App = () => {
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState({
    PF: Array(9).fill().map(() => ({ titulares: [], reservas: [] })),
    PR: Array(9).fill().map(() => ({ titulares: [], reservas: [] })),
    SE: Array(9).fill().map(() => ({ titulares: [], reservas: [] }))
  });

  useEffect(() => {
    const stored = localStorage.getItem('players');
    if (stored) {
      setPlayers(JSON.parse(stored));
    } else {
      setPlayers(initialPlayers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (source.droppableId === 'playerPool') {
      const player = players.find(p => p.id === draggableId);
      const [cat, roundIdx, type] = destination.droppableId.split('-');
      setRounds(prev => {
        const updated = { ...prev };
        const round = updated[cat][roundIdx];
        if (!round[type].find(p => p.id === player.id)) {
          round[type].push(player);
        }
        return updated;
      });
    }
  };

  return (
    <div className="min-h-screen p-6 bg-[#f4ecd8] text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestor de Alineaciones de Ajedrez</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="playerPool" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="mb-10 p-4 bg-white rounded-2xl shadow-md max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
              {players.map((player, idx) => (
                <Draggable key={player.id} draggableId={player.id} index={idx}>
                  {(prov) => (
                    <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} className="p-2 bg-green-100 rounded cursor-move hover:bg-green-200 transition">
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm">FIDE: {player.fide} / FADA: {player.fada}</div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {['PF', 'PR', 'SE'].map((cat) => (
          <div key={cat} className="mb-10 max-w-6xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Categoría {cat}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rounds[cat].map((round, idx) => (
                <div key={idx} className="p-3 bg-white rounded-2xl shadow-md">
                  <h3 className="font-semibold mb-2">Ronda {idx + 1}</h3>
                  <Droppable droppableId={`${cat}-${idx}-titulares`}>
                    {(prov) => (
                      <div ref={prov.innerRef} {...prov.droppableProps} className="mb-3 p-2 bg-blue-50 rounded min-h-[60px]">
                        <strong className="block mb-1">Titulares:</strong>
                        {round.titulares.map((p, i) => (
                          <div key={p.id} className="p-1 bg-blue-100 rounded mb-1 text-sm">{p.name}</div>
                        ))}
                        {prov.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <Droppable droppableId={`${cat}-${idx}-reservas`}>
                    {(prov) => (
                      <div ref={prov.innerRef} {...prov.droppableProps} className="p-2 bg-yellow-50 rounded min-h-[60px]">
                        <strong className="block mb-1">Reservas:</strong>
                        {round.reservas.map((p, i) => (
                          <div key={p.id} className="p-1 bg-yellow-100 rounded mb-1 text-sm">{p.name}</div>
                        ))}
                        {prov.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default App;

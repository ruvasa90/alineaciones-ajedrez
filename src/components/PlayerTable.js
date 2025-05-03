import React from "react";

const PlayerTable = ({ players, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-[#f5f0e6] rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#5a4635]">Lista de Jugadores</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-[#e0d6c3] text-[#5a4635]">
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">ELO FIDE</th>
            <th className="px-4 py-2">ELO FADA</th>
            <th className="px-4 py-2">Categorías</th>
            <th className="px-4 py-2">Rondas deseadas</th>
            <th className="px-4 py-2">Disponibilidad</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {players.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">No hay jugadores asignados</td>
            </tr>
          ) : (
            players.map((player, index) => (
              <tr key={index} className="hover:bg-[#f0e8d9] transition-colors">
                <td className="border-t px-4 py-2">{player.nombre}</td>
                <td className="border-t px-4 py-2">{player.eloFide}</td>
                <td className="border-t px-4 py-2">{player.eloFada}</td>
                <td className="border-t px-4 py-2">{player.categorias.join(", ")}</td>
                <td className="border-t px-4 py-2">{player.rondasDeseadas}</td>
                <td className="border-t px-4 py-2">{player.disponibilidad.join(", ")}</td>
                <td className="border-t px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    onClick={() => onEdit(player)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => onDelete(player)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;

import React, { useState } from 'react';

function PlayerForm({ players, setPlayers }) {
  const [form, setForm] = useState({
    name: '', fideElo: '', fadaElo: '', category: '', rounds: 0, availability: []
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setPlayers([...players, { ...form, id: Date.now() }]);
    setForm({ name: '', fideElo: '', fadaElo: '', category: '', rounds: 0, availability: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} className="border p-2 m-1" />
      <input name="fideElo" placeholder="ELO Fide" value={form.fideElo} onChange={handleChange} className="border p-2 m-1" />
      <input name="fadaElo" placeholder="ELO Fada" value={form.fadaElo} onChange={handleChange} className="border p-2 m-1" />
      <input name="category" placeholder="Categoría" value={form.category} onChange={handleChange} className="border p-2 m-1" />
      <input name="rounds" placeholder="Rondas deseadas" type="number" value={form.rounds} onChange={handleChange} className="border p-2 m-1" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Agregar jugador</button>
    </form>
  );
}

export default PlayerForm;

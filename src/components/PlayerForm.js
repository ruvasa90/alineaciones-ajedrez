
import React, { useState } from 'react';

function PlayerForm({ players, setPlayers }) {
  const [form, setForm] = useState({
    name: '',
    fideElo: '',
    fadaElo: '',
    categories: [],
    rounds: 0,
    availableRounds: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setForm(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, value]
        : prev.categories.filter(category => category !== value)
    }));
  };

  const handleRoundsChange = (e) => {
    const rounds = e.target.value.split(',').map(r => parseInt(r.trim(), 10));
    setForm({ ...form, availableRounds: rounds });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayers([...players, { ...form, id: Date.now() }]);
    setForm({
      name: '',
      fideElo: '',
      fadaElo: '',
      categories: [],
      rounds: 0,
      availableRounds: [],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" value={form.name} onChange={handleInputChange} required />
      <input name="fideElo" placeholder="ELO Fide" value={form.fideElo} onChange={handleInputChange} required />
      <input name="fadaElo" placeholder="ELO Fada" value={form.fadaElo} onChange={handleInputChange} required />
      
      <div>
        <label>Seleccione categorías:</label>
        <input type="checkbox" value="Preferente" onChange={handleCategoryChange} /> Preferente
        <input type="checkbox" value="Primera" onChange={handleCategoryChange} /> Primera
        <input type="checkbox" value="Segunda" onChange={handleCategoryChange} /> Segunda
      </div>

      <input name="rounds" placeholder="Número de rondas" type="number" value={form.rounds} onChange={handleInputChange} required />

      <input name="availableRounds" placeholder="Rondas disponibles (Ej: 1,2,3)" value={form.availableRounds} onChange={handleRoundsChange} required />

      <button type="submit">Agregar Jugador</button>
    </form>
  );
}

export default PlayerForm;

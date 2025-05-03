import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function PlayerForm({ addPlayer }) {
  const [form, setForm] = useState({
    name: '',
    fideElo: '',
    fadaElo: '',
    category: [],
    desiredRounds: '',
    availableRounds: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCategories = (e) => {
    const options = Array.from(e.target.selectedOptions, (o) => o.value);
    setForm({ ...form, category: options });
  };

  const handleAvailableRounds = (e) => {
    const rounds = e.target.value.split(',').map((r) => parseInt(r.trim(), 10));
    setForm({ ...form, availableRounds: rounds });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlayer({ ...form, id: uuidv4() });
    setForm({
      name: '',
      fideElo: '',
      fadaElo: '',
      category: [],
      desiredRounds: '',
      availableRounds: [],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
      <input name="fideElo" placeholder="ELO FIDE" value={form.fideElo} onChange={handleChange} />
      <input name="fadaElo" placeholder="ELO FADA" value={form.fadaElo} onChange={handleChange} />
      <select name="category" multiple onChange={handleCategories}>
        <option value="Preferente">Preferente</option>
        <option value="Primera">Primera</option>
        <option value="Segunda">Segunda</option>
      </select>
      <input name="desiredRounds" placeholder="Nº rondas deseadas" value={form.desiredRounds} onChange={handleChange} />
      <input name="availableRounds" placeholder="Rondas disponibles (ej: 1,2,3)" onChange={handleAvailableRounds} />
      <button type="submit">Agregar jugador</button>
    </form>
  );
}

export default PlayerForm;
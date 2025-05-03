import React from 'react';

function Alignments({ players }) {
  const generateAlignments = () => {
    alert('Generando alineaciones...');
  };

  return (
    <div>
      <h2>Alineaciones</h2>
      <button onClick={generateAlignments}>Generar alineaciones</button>
      <button onClick={() => alert('Exportando a PDF...')}>Exportar a PDF</button>
    </div>
  );
}

export default Alignments;
// función para guardar los datos en LocalStorage
function guardarJugadores() {
  localStorage.setItem('jugadores', JSON.stringify(jugadores));
}

// función para recuperar los datos de LocalStorage
function recuperarJugadores() {
  const datos = localStorage.getItem('jugadores');
  return datos ? JSON.parse(datos) : [
  { nombre: 'David Lopez', eloFide: 2206, eloFada: 2203, categoria: 'Preferente', rondasDeseadas: '9', rondasDisponibles: [] },
  { nombre: 'Antonio Abos', eloFide: 2024, eloFada: 2017, categoria: 'Preferente', rondasDeseadas: '4', rondasDisponibles: [] },
  { nombre: 'José Joaquin Perez', eloFide: 1909, eloFada: 1911, categoria: 'Preferente', rondasDeseadas: '7', rondasDisponibles: [] },
  { nombre: 'Mateo Leon', eloFide: 1877, eloFada: 1826, categoria: 'Preferente', rondasDeseadas: '3', rondasDisponibles: [] },
  { nombre: 'Mariano Aviol', eloFide: 1871, eloFada: 1883, categoria: 'Preferente, Primera', rondasDeseadas: '9', rondasDisponibles: [] },
  { nombre: 'Sergio Garcia', eloFide: 1865, eloFada: 1902, categoria: 'Preferente, Primera', rondasDeseadas: '8', rondasDisponibles: [] },
  { nombre: 'Jose Maria Bernad', eloFide: 1835, eloFada: 1780, categoria: 'Preferente, Primera', rondasDeseadas: '5', rondasDisponibles: [] },
  { nombre: 'Jose Manuel Manzanares', eloFide: 1758, eloFada: 1752, categoria: 'Preferente, Primera', rondasDeseadas: '4', rondasDisponibles: [] },
  { nombre: 'Alejandro Manzanares', eloFide: 1748, eloFada: 1727, categoria: 'Preferente, Primera', rondasDeseadas: '3', rondasDisponibles: [] },
  { nombre: 'Pablo Fernandez', eloFide: 1745, eloFada: 1677, categoria: 'Primera, Segunda', rondasDeseadas: '5', rondasDisponibles: [] },
  { nombre: 'Pedro Fernandez', eloFide: 1692, eloFada: 1665, categoria: 'Primera, Segunda', rondasDeseadas: '6', rondasDisponibles: [] },
  { nombre: 'Ruben Vazquez', eloFide: 1690, eloFada: 1621, categoria: 'Preferente, Primera, Segunda', rondasDeseadas: '5', rondasDisponibles: [] },
  { nombre: 'Adrian Hernandez', eloFide: 1669, eloFada: 1561, categoria: 'Preferente, Primera, Segunda', rondasDeseadas: '7', rondasDisponibles: [] },
  { nombre: 'Luis Llucia', eloFide: 1607, eloFada: 1586, categoria: 'Primera, Segunda', rondasDeseadas: '3', rondasDisponibles: [] },
  { nombre: 'Sergio Bodega', eloFide: 1602, eloFada: 1571, categoria: 'Primera, Segunda', rondasDeseadas: '6', rondasDisponibles: [] },
  { nombre: 'Jose Antonio Alvira', eloFide: 1504, eloFada: 1543, categoria: 'Primera, Segunda', rondasDeseadas: '5', rondasDisponibles: [] },
  { nombre: 'Francisco Lara', eloFide: 1504, eloFada: 1506, categoria: 'Primera, Segunda', rondasDeseadas: '4', rondasDisponibles: [] },
];

// recuperar los datos de LocalStorage
let jugadores = recuperarJugadores();

// función para generar las rondas disponibles según la categoría
function generarRondasDisponibles(categoria) {
  const categorias = categoria.split(', ');
  const rondasDisponibles = [];
  categorias.forEach((cat) => {
    for (let i = 1; i <= 9; i++) {
      rondasDisponibles.push(`${cat} - Ronda ${i}`);
    }
  });
  return rondasDisponibles;
}

// función para crear la tabla
function crearTabla() {
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';
  jugadores.forEach((jugador, index) => {
    const rondasDisponibles = generarRondasDisponibles(jugador.categoria);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td contenteditable="true" data-field="nombre">${jugador.nombre}</td>
      <td contenteditable="true" data-field="eloFide">${jugador.eloFide}</td>
      <td contenteditable="true" data-field="eloFada">${jugador.eloFada}</td>
      <td contenteditable="true" data-field="categoria">${jugador.categoria}</td>
      <td contenteditable="true" data-field="rondasDeseadas">${jugador.rondasDeseadas}</td>
      <td contenteditable="true" data-field="rondasDisponibles">${rondasDisponibles.join(', ')}</td>
    `;
    tbody.appendChild(row);
    // agregar evento de edición
    const cells = row.querySelectorAll('td');
    cells.forEach((cell) => {
      cell.addEventListener('input', (e) => {
        const field = cell.getAttribute('data-field');
        const value = cell.textContent;
        if (field === 'categoria') {
          const nuevasRondasDisponibles = generarRondasDisponibles(value);
          jugador.rondasDisponibles = nuevasRondasDisponibles;
          cell.nextElementSibling.textContent = nuevasRondasDisponibles.join(', ');
        } else {
          jugador[field] = value;
        }
        guardarJugadores();
      });
    });
  });
}

// agregar evento al botón de agregar jugador
document.getElementById('btn-agregar-jugador').addEventListener('click', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const eloFide = parseInt(document.getElementById('eloFide').value);
  const eloFada = parseInt(document.getElementById('eloFada').value);
  const categoria = Array.from(document.getElementById('categoria').selectedOptions).map(option => option.value).join(', ');
  const rondasDeseadas = document.getElementById('rondasDeseadas').value;
  const rondasDisponibles = generarRondasDisponibles(categoria);
  const nuevoJugador = {
    nombre,
    eloFide,
    eloFada,
    categoria,
    rondasDeseadas,
    rondasDisponibles
  };
  jugadores.push(nuevoJugador);
  guardarJugadores();
  crearTabla();
  document.getElementById('formulario-jugador').reset();
});

// llamar a la función para crear la tabla
crearTabla();
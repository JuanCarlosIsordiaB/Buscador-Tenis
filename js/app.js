const marca = document.querySelector('#marca');
const talla = document.querySelector('#talla');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');

const resultado = document.querySelector('#resultado');

const datosBusqueda = {
  marca: '',
  talla: '',
  minimo: '',
  maximo: '',
};

document.addEventListener('DOMContentLoaded', () => {
  llenarTenis(tenis);
});

function llenarTenis(tenis) {
  limpiarHTML();

  tenis.forEach((teni) => {
    const tenisHTML = document.createElement('p');

    tenisHTML.textContent = `
      Marca: ${teni.marca} - Talla: ${teni.talla} - Precio: $${teni.precio}
    `;

    resultado.appendChild(tenisHTML);
  });
}

marca.addEventListener('change', (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarResultados();
});

talla.addEventListener('change', (e) => {
  datosBusqueda.talla = parseInt(e.target.value);
  filtrarResultados();
});

minimo.addEventListener('change', (e) => {
  datosBusqueda.minimo = e.target.value;
  filtrarResultados();
});

maximo.addEventListener('change', (e) => {
  datosBusqueda.maximo = e.target.value;
  filtrarResultados();
});

function filtrarResultados() {
  const resultadosFiltrados = tenis.filter(filtrarMarca)
    .filter(filtrarPrecioMax)
    .filter(filtrarPrecioMin)
    .filter(filtrarTalla);

  if (resultadosFiltrados.length) {
    llenarTenis(resultadosFiltrados);
  } else {
    noDisponible();
  }
}

function noDisponible() {
  limpiarHTML();
  const error = document.createElement('p');
  error.textContent = 'No hay tenis con esas especificaciones';
  error.classList.add('error');
  resultado.appendChild(error);
}

function filtrarMarca(teni) {
  if (datosBusqueda.marca) {
    return teni.marca === datosBusqueda.marca;
  } else {
    return teni;
  }
}

function filtrarPrecioMax(teni) {
  if (datosBusqueda.maximo) {
    return teni.precio <= datosBusqueda.maximo;
  } else {
    return teni;
  }
}

function filtrarPrecioMin(teni) {
  if (datosBusqueda.minimo) {
    return teni.precio >= datosBusqueda.minimo;
  } else {
    return teni;
  }
}

function filtrarTalla(teni) {
  if (datosBusqueda.talla) {
    return teni.talla === datosBusqueda.talla;
  } else {
    return teni;
  }
}

// Limpiar HTML
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

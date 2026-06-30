
// Selección de elementos
const inputSearch = document.getElementById('search-input');
const buttonSearch = document.getElementById('button-search');
const resultsContainer = document.getElementById('results');
const modal = document.getElementById('modal-details');


//función para buscar la api de TVMaze
async function searchShows(query) {
  try {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const data = await response.json();
    renderCards(data);
  } catch (error) {
    console.error('Error al buscar en TVMaze:', error);
    resultsContainer.innerHTML = `<p>Error al cargar los resultados.</p>`;
  }
}


//Función para renderizar las tarjetas
function renderCards(shows) {
  resultsContainer.innerHTML = ''; // Limpia resultados previos
  if (shows.length === 0) {
    resultsContainer.innerHTML = `<p>No se encontraron resultados.</p>`;
    return;
  }
  shows.forEach(item => {
    const show = item.show;
    const image = show.image ? show.image.medium : 'https://via.placeholder.com/250x380?text=Sin+imagen';
    const genres = show.genres.length ? show.genres.join(', ') : 'Sin género';
    const rating = show.rating.average ? show.rating.average : 'Sin calificación';
    const premiered = show.premiered ? show.premiered : 'Fecha no disponible';

    const card = document.createElement('article');
    card.classList.add('card');
    card.innerHTML = `
      <img class="card__image" src="${image}" alt="${show.name}">
      <h3 class="card__title">${show.name}</h3>
      <p class="card__genre">${genres}</p>
      <p class="card__date">${premiered}</p>
      <p class="card__rating">⭐ ${rating}</p>
      <button class="card__button">Ver detalles</button>
    `;

    // Evento para abrir el modal
    card.querySelector('.card__button').addEventListener('click', () => openModal(show));
    resultsContainer.appendChild(card);
  });
}



//Funcón para abrir el modal
function openModal(show) {
  modal.innerHTML = `
    <h2 class="modal__title">${show.name}</h2>
    <img class="modal__image" src="${show.image ? show.image.original : 'https://via.placeholder.com/600x350?text=Sin+imagen'}" alt="${show.name}">
    <div class="modal__info">
      <p><strong>Género:</strong> ${show.genres.join(', ') || 'Sin género'}</p>
      <p><strong>Idioma:</strong> ${show.language}</p>
      <p><strong>Rating:</strong> ${show.rating.average || 'Sin calificación'}</p>
      <p><strong>Resumen:</strong> ${show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'Sin resumen disponible'}</p>
    </div>
    <button class="modal__close">Cerrar</button>
  `;

  modal.showModal();

  modal.querySelector('.modal__close').addEventListener('click', () => modal.close());
}



//Eventos principales
const searchButton = document.getElementById("button-search");

searchButton.addEventListener('click', () => {
  const query = inputSearch.value.trim();
  if (query) {
    searchShows(query);
  }
});
import { loadFromLibrary } from './library';
import { renderMovieCard } from './library';

const filmsPerPage = 9;
let currentPage = 1;

const queueBtn = document.querySelector('#gueueButton');
const watchedBtn = document.querySelector('#watchedButton');
const movieContainer = document.querySelector('.film-list');

queueBtn.addEventListener('click', async () => {
  loadMoviesPage(1);
  queueBtn.classList.add('active');
  watchedBtn.classList.remove('active');
  saveSelectedCategory('queue');

});

//ładowanie strony

function loadMoviesPage(page) {
  movieContainer.innerHTML = '';
  if (JSON.parse(localStorage.getItem('queue'))) {
    const movieOnWatched = loadFromLibrary('queue');
    const totalPagesCount = Math.ceil(movieOnWatched.length / filmsPerPage);
    currentPage = page;
    let startIndex = (currentPage - 1) * filmsPerPage;
    let endIndex = startIndex + filmsPerPage;
    let moviesOnPage = movieOnWatched.slice(startIndex, endIndex);
    renderMovieCard(moviesOnPage);
    renderPagination(totalPagesCount, currentPage);
  } else {
    movieContainer.insertAdjacentHTML('beforeend', 'Sorry, there are no films in your QUEUE list.');
  }
}

//renderowanie paginacji

function renderPagination(totalPages, currentPage) {
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = '';

  const visiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = Math.min(totalPages, startPage + visiblePages - 1);

  if (endPage - startPage + 1 < visiblePages) {
    endPage = Math.min(totalPages, currentPage + Math.floor(visiblePages / 2));
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  const firstPageButton = document.createElement('button');
  firstPageButton.innerHTML = `
      <svg class="icon icon-arrow-left" viewBox="0 0 32 32" width="18" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.667" d="M25.333 16H6.666M16 25.333 6.667 16 16 6.667" style="stroke:var(--color2, #000)"/>
      </svg>
  `;

  firstPageButton.style.cursor = 'pointer';
  firstPageButton.classList.add('page-button', 'first-button');
  firstPageButton.addEventListener('click', () => {
    loadMoviesPage(1);
    window.scroll({ top: 0, behavior: 'smooth' });
  });
  paginationContainer.appendChild(firstPageButton);

  for (let page = startPage; page <= endPage; page++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = page;
    pageButton.style.cursor = 'pointer';
    pageButton.classList.add('page-button');
    if (page === currentPage) {
      pageButton.classList.add('active');
    }
    pageButton.addEventListener('click', () => {
      loadMoviesPage(page);
      window.scroll({ top: 0, behavior: 'smooth' });
    });
    paginationContainer.appendChild(pageButton);
  }

  const lastPageButton = document.createElement('button');
  lastPageButton.innerHTML = `
        <svg class="icon icon-arrow-right" viewBox="0 0 32 32" width="18" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.667" d="M6.667 16h18.667M16 25.333l9.333-9.333-9.333-9.333" style="stroke:var(--color2, #000)"/>
        </svg>
    `;
  lastPageButton.classList.add('page-button', 'last-button');
  lastPageButton.style.cursor = 'pointer';
  lastPageButton.addEventListener('click', () => {
    const nextPage = Math.min(currentPage + 1, totalPages);
    loadMoviesPage(nextPage);
    window.scroll({ top: 0, behavior: 'smooth' });
  });

  paginationContainer.appendChild(lastPageButton);
}

loadMoviesPage(currentPage);

function saveSelectedCategory(category) {
  sessionStorage.setItem('selectedCategory', category);
}

window.addEventListener('load', () => {
  const selectedCategory = sessionStorage.getItem('selectedCategory');
  if (selectedCategory === 'queue') {
    queueBtn.click(); 
  }
});
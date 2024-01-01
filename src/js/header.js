import axios from 'axios';
import apiSearch from './api-search.js';
import { getMovieGenres } from './api-genres.js';
import { createMovieCard } from './markup.js';
import { openModal } from './modal.js';
import { createPaginationButtonsSearch } from './pagination-search.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('.searchInput');
const resultContainer = document.querySelector('.resultContainer');
const galleryContainer = document.querySelector('.gallery');
const libraryContainer = document.querySelector('.library');
const searchErrorContainer = document.querySelector('.searchError');
const loaderContainer = document.querySelector('.loader-container');
const paginationContainer = document.querySelector('.pagination');

let currentPage = 1;
const TOTAL_PAGES = 500; // Numărul total maxim de pagini disponibile.
const ITEMS_PER_PAGE = 20; // Numărul de elemente pe pagină.
const MAX_PAGES_DISPLAYED = 5; // Numărul maxim de pagini afișate în paginare

// Funcția pentru atașarea event listener-ului la un card de film:
function attachCardClickListener(movieCard, movieId) {
  movieCard.addEventListener('click', () => {
    openModal(movieId); // Deschide fereastra modală când este apăsat un card de film.
  });
}

// Funcția pentru eliminarea event listener-ului de pe un card de film:
function removeCardClickListener(movieCard) {
  movieCard.removeEventListener('click', openModal);
}

// Function to toggle loader visibility
function toggleLoader(show) {
  loaderContainer.style.display = show ? 'flex' : 'none';
}

// Show loader initially
toggleLoader(true);

// Use the window's load event to hide the loader when all content is loaded
window.addEventListener('load', function () {
  // Set a small delay before hiding the loader to ensure smooth transition
  setTimeout(function () {
    toggleLoader(false);
  }, 500);
});

function hideLoaderAfterSearch() {
  // Set a small delay before hiding the loader to ensure smooth transition
  setTimeout(function () {
    toggleLoader(false);
  }, 500);
}

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    showError('Please enter a search term');
    toggleLoader(false);
    return;
  }

  // Toggle the loader when a search is initiated
  toggleLoader(true);

  // Remove the error message when a new search is initiated
  clearError();

  const searchUrl = `${apiSearch.url}&query=${encodeURIComponent(searchTerm)}`;

  try {
    const genres = await getMovieGenres();
    const response = await axios.get(searchUrl, apiSearch);
    const movies = response.data.results;

    // Eliminarea event listener-ilor de pe cardurile vechi înainte de adăugarea noilor carduri:
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(movieCard => {
      removeCardClickListener(movieCard);
      movieCard.remove();
    });

    // Ascunde Gallery cand apar filme din search
    galleryContainer.style.display = movies.length > 0 ? 'none' : 'block';

    // Afiseaza search-movies.html cand apar filme din search
    resultContainer.style.display = movies.length > 0 ? 'flex' : 'none';

    if (movies.length === 0) {
      showError('No results found.');
      paginationContainer.style.display = 'none';
    toggleLoader(false);
      return;
    }

    // loaderContainer.style.display = 'flex';

    // Clear any existing results
    resultContainer.innerHTML = '';

    movies.forEach(async movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card-search');

      let movieImage = document.createElement('img');
      // Check if the movie has a poster before creating the card
      if (movie.poster_path) {
        // If a poster exists, use the poster image
        const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        movieImage.src = imageUrl;
      } else {
        // If no poster exists, use a default image
        movieImage.src = 'https://i.imgur.com/p3MsT9t.jpg';
      }
      movieImage.alt = movie.title;
      movieImage.classList.add('movie-image');
      movieImage.tabIndex = 0;

      const movieTitle = document.createElement('h3');
      movieTitle.textContent = movie.title;
      movieTitle.classList.add('movie-title');

      const movieInfo = document.createElement('p');
      const releaseYear =
        (movie.release_date && movie.release_date.split('-')[0]) || 'undefined';

      const movieGenres = movie.genre_ids.map(genreId => {
        const foundGenre = genres.find(genre => genre.id === genreId);
        return foundGenre ? foundGenre.name : '';
      });

      const genresString = movieGenres.join(' ');
      movieInfo.textContent = `${genresString} | ${releaseYear}`;
      movieInfo.classList.add('movie-info');

      movieCard.appendChild(movieImage);
      movieCard.appendChild(movieTitle);
      movieCard.appendChild(movieInfo);
      resultContainer.appendChild(movieCard);
      attachCardClickListener(movieCard, movie.id);
    });

    hideLoaderAfterSearch();
  } catch (error) {
    console.error('Error:', error);
    showError('An error occurred while fetching data.');
    toggleLoader(false);
  }
});


paginationContainer.addEventListener('click', function (event) {
  const target = event.target;

  // Check if the clicked element is a button
  if (target.tagName === 'BUTTON') {
    const pageNumber = parseInt(target.textContent);

    if (!isNaN(pageNumber)) {
      updatePaginationAndDisplaySearch(pageNumber);
    } else if (target.id === 'previousButton') {
      updatePaginationAndDisplaySearch(currentPage - 1);
    } else if (target.id === 'nextButton') {
      updatePaginationAndDisplaySearch(currentPage + 1);
    }
  }
});
async function updatePaginationAndDisplaySearch(newPage) {
  // Update the current page
  currentPage = newPage;

  // Toggle the loader when fetching data for the new page
  toggleLoader(true);

  // Remove the error message when a new page is selected
  clearError();

  const searchUrl = `${apiSearch.url}&query=${encodeURIComponent(
    searchInput.value.trim()
  )}&page=${currentPage}`;

  try {
    const genres = await getMovieGenres();
    const response = await axios.get(searchUrl, apiSearch);
    const movies = response.data.results;

    // Hide Gallery and show Search Results when movies are available
    galleryContainer.style.display = movies.length > 0 ? 'none' : 'block';
    resultContainer.style.display = movies.length > 0 ? 'flex' : 'none';

    // if (movies.length === 0) {
    //   showError('No results found.');
    //   hideLoaderAfterSearch();
    //   return;
    // }

    // Clear any existing results
    resultContainer.innerHTML = '';

    movies.forEach(async movie => {
      // Check if the movie has a poster before creating the card
      if (movie.poster_path || !movie.poster_path) {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card-search');

        const movieImage = document.createElement('img');
        const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        movieImage.src = imageUrl;
        movieImage.alt = movie.title;
        movieImage.classList.add('movie-image');
        movieImage.tabIndex = 0;

        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title;
        movieTitle.classList.add('movie-title');

        const movieInfo = document.createElement('p');
        const releaseYear =
          (movie.release_date && movie.release_date.split('-')[0]) ||
          'undefined';

        const movieGenres = movie.genre_ids.map(genreId => {
          const foundGenre = genres.find(genre => genre.id === genreId);
          return foundGenre ? foundGenre.name : '';
        });

        const genresString = movieGenres.join(' ');
        movieInfo.textContent = `${genresString} | ${releaseYear}`;
        movieInfo.classList.add('movie-info');

        movieCard.appendChild(movieImage);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(movieInfo);

        resultContainer.appendChild(movieCard);
        attachCardClickListener(movieCard, movie.id);
      }
    });

    // Hide the loader after displaying the results for the new page
    hideLoaderAfterSearch();

    // Update pagination UI based on the new current page and total pages
    // createPaginationButtonsSearch(
    //   currentPage,
    //   updatePaginationAndDisplaySearch
    // );
  } catch (error) {
    console.error('Error:', error);
    showError('An error occurred while fetching data.');
    toggleLoader(false);
  }
}

// Apelul inițial pentru afișarea cardurilor pentru prima pagină:
updatePaginationAndDisplaySearch(currentPage);

function showError(message) {
  searchErrorContainer.textContent = message;
  searchErrorContainer.style.display = 'block';
}

function clearError() {
  searchErrorContainer.textContent = '';
  searchErrorContainer.style.display = 'none';
}

// Functiile butoanelor care arata si ascund diferite sectiuni

const btnContainer1 = document.querySelector('.btn-52');
const btnContainer2 = document.querySelector('.btn-53');
const searchContainer = document.querySelector('.search-container');
const libraryBtnsContainer = document.querySelector('.library-btns-container');
const logoContainer = document.querySelector('.logo-alignment');
galleryContainer.style.display = 'block';
libraryContainer.style.display = 'none';

btnContainer1.addEventListener('click', function () {
  // When btn-container-1 is clicked, show the gallery and hide the library
  galleryContainer.style.display = 'block';
  libraryContainer.style.display = 'none';
});

btnContainer2.addEventListener('click', function () {
  // When btn-container-2 is clicked, hide the gallery and show the library
  galleryContainer.style.display = 'none';
  searchContainer.style.display = 'none';
  resultContainer.style.display = 'none';
  paginationContainer.style.display = 'none';
  libraryContainer.style.display = 'block';
  libraryBtnsContainer.style.display = 'flex';
});

// functie pentru activarea si dezactivarea butoanelor de clear pentru watched si queue

const clearWatchedBtn = document.querySelector('.clear-watched-btn');
const clearQueueBtn = document.querySelector('.clear-queue-btn');
const watchedBtn = document.querySelector('.btn-watched');
const queueBtn = document.querySelector('.btn-queue');
// Function to set the default state
function setDefaultState() {
  // Set the default state for the queue button
  queueBtn.classList.add('active-btn');
  clearWatchedBtn.style.display = 'none';
  clearQueueBtn.style.display = 'flex';
  // watchedBtn.classList.remove('active');
}

// Call the function to set the default state
setDefaultState();

watchedBtn.addEventListener('click', function () {
  // watchedBtn.classList.add('active');
  // Check if the clear watched button is active
  if (!watchedBtn.classList.contains('active-btn')) {
    // Hide the clear queue button
    clearQueueBtn.style.display = 'none';
    // Show the clear watched button
    clearWatchedBtn.style.display = 'flex'; // or 'block' based on your styling

    watchedBtn.classList.add('active-btn');
    // Remove the active class from the clear queue button
    queueBtn.classList.remove('active-btn');
  }
});

queueBtn.addEventListener('click', function () {
  // Check if the clear watched button is active
  if (!queueBtn.classList.contains('active-btn')) {
    // Hide the clear queue button
    clearWatchedBtn.style.display = 'none';
    // Show the clear watched button
    clearQueueBtn.style.display = 'flex'; // or 'block' based on your styling

    queueBtn.classList.add('active-btn');
    // Remove the active class from the clear queue button
    watchedBtn.classList.remove('active-btn');
  }
});

logoContainer.addEventListener('click', function () {
  window.location.href = 'index.html';
});

btnContainer1.addEventListener('click', function () {
  window.location.href = 'index.html';
});

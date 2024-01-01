import axios from 'axios';
import apiMovie from './api-movie.js';
import axios from 'axios';
import apiMovie from './api-movie.js';

// Declarațiile pentru butoane
let addToQueueButton;
let addToWatchedButton;

// Funcția de adăugare a movie ID-ului în local storage
function toggleLocalStorage(movieId, key) {
  const storedIds = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : [];

  // Verifică dacă ID-ul filmului este în storage
  const index = storedIds.indexOf(movieId);
  if (index !== -1) {
    // Dacă este, îl elimină
    storedIds.splice(index, 1);
    console.log(`Movie ID ${movieId} removed from ${key}.`);
  } else {
    // Dacă nu este, îl adaugă
    storedIds.push(movieId);
    console.log(`Movie ID ${movieId} added to ${key}.`);
  }

  localStorage.setItem(key, JSON.stringify(storedIds));

  // Actualizează textul butonului după modificare în stocarea locală
  updateButtonText(
    key === 'queue' ? addToQueueButton : addToWatchedButton,
    movieId,
    key
  );
}

// Funcția de modificare a textului butonului
function updateButtonText(button, movieId, key) {
  const storedIds = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : [];

  if (button) {
    if (storedIds.includes(movieId)) {
      button.textContent = `Remove from ${
        key.charAt(0).toUpperCase() + key.slice(1)
      }`;
    } else {
      button.textContent = `Add to ${
        key.charAt(0).toUpperCase() + key.slice(1)
      }`;
    }
  }
}

// Funcția de deschidere a modalului
export async function openModal(movieId) {
  const modal = document.querySelector('.modal-movie-card');
  const overlay = document.querySelector('.overlay');
  const closeModalMovieCard = document.querySelector('.modal-movie-card-close');
  const openModalMovieCard = document.querySelector('.modal-movie-card-open');

  const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  closeModalMovieCard.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Importarea filmelor din API
  try {
    const response = await axios({
      method: apiMovie.method,
      url: `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      headers: apiMovie.headers,
    });

    const movieDetails = response.data;

    console.log(movieDetails);

    // Adaugarea continutului modalului
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
      <div class="left-side-content">
        <div class="image-size">
          <img src="${getMovieImageUrl(movieDetails.poster_path)}" alt="${
      movieDetails.title
    }" class="modal-movie-poster">
        </div>
      </div>
      <div class="right-side-content">
        <div class="modal-content-details">
            <p class="modal-movie-tille">Title:${movieDetails.title}</p>
            <p class="modal-movie-averageVote">Vote Average: ${
              movieDetails.vote_average
            }</p>
            <p class="modal-movie-voteCount">Vote count: ${
              movieDetails.vote_count
            }</p>
            <p class="modal-movie-popularity">Popularity: ${
              movieDetails.popularity
            }</p>
            <p class="modal-movie-originalTitle">Original title: ${
              movieDetails.original_title
            }</p>
            <p class="modal-movie-RealeseDate">Release Date: ${
              movieDetails.release_date
            }</p>
            <p class="modal-movie-overview">Overview: ${
              movieDetails.overview
            }</p>
            <p class="modal-movie-genders">Genres: ${movieDetails.genres
              .map(genre => genre.name)
              .join(', ')}</p>
              <div class="btn-q-w">
                 <div class="btn-w">
                     <button class="add-watched-btn"></button>
                 </div>

                  <div class="btn-q">
                     <button class="add-queue-btn"></button>
                 </div>

               
              </div>
          </div>
      </div>
      
    `;
    function getMovieImageUrl(posterPath) {
      return posterPath
        ? `https://image.tmdb.org/t/p/w500/${posterPath}`
        : 'https://i.imgur.com/p3MsT9t.jpg'; // default image
    }

    // Deschiderea modalului
    openModal();

    // Adaugarea evenimentelor de click după deschiderea modalului
    addToQueueButton = document.querySelector('.add-queue-btn');
    addToWatchedButton = document.querySelector('.add-watched-btn');

    // Adaugarea evenimentelor de click pentru butoane
    addToQueueButton.addEventListener('click', function () {
      const currentMovieId = movieId;
      toggleLocalStorage(currentMovieId, 'queue');
    });

    addToWatchedButton.addEventListener('click', function () {
      const currentMovieId = movieId;
      toggleLocalStorage(currentMovieId, 'watched');
    });

    // Actualizarea textului butoanelor la încărcarea paginii
    const currentMovieId = movieId;
    updateButtonText(addToQueueButton, currentMovieId, 'queue');
    updateButtonText(addToWatchedButton, currentMovieId, 'watched');
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}

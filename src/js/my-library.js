import axios from 'axios';
import apiMovie from './api-movie.js';
import { getMovieGenres } from './api-genres.js';
import { createMovieCard } from './markup.js';
import { openModal } from './modal.js';

document.addEventListener('DOMContentLoaded', async function () {
  const btnMyLibrary = document.querySelector('.btn-container-2');
  const btnWatched = document.querySelector('.btn-watched');
  const btnQueue = document.querySelector('.btn-queue');
  const sectionWatched = document.querySelector('.library-watched');
  const sectionQueue = document.querySelector('.library-queue');

  // Ascunde initial ambele sectiuni
  sectionWatched.style.display = 'none';
  sectionQueue.style.display = 'none';

  btnMyLibrary.addEventListener('click', function () {
    // Afiseaza initial sectiunea "QUEUE" la apasarea butonului "My Library"
    sectionWatched.style.display = 'none';
    sectionQueue.style.display = '';

    // Apelează funcția pentru a afișa filmele din "watched" și "queue"
    displayMoviesFromLocalStorage('watched', sectionWatched);
    displayMoviesFromLocalStorage('queue', sectionQueue);
  });

  btnWatched.addEventListener('click', function () {
    // Afiseaza sectiunea "WATCHED" la apasarea butonului "WATCHED"
    sectionWatched.style.display = '';
    sectionQueue.style.display = 'none';

    // Apelează funcția pentru a afișa filmele din "watched"
    displayMoviesFromLocalStorage('watched', sectionWatched);
  });

  btnQueue.addEventListener('click', function () {
    // Afiseaza sectiunea "QUEUE" la apasarea butonului "QUEUE"
    sectionWatched.style.display = 'none';
    sectionQueue.style.display = '';

    // Apelează funcția pentru a afișa filmele din "queue"
    displayMoviesFromLocalStorage('queue', sectionQueue);
  });

  function attachCardClickListener(movieCard, movieId) {
    movieCard.addEventListener('click', () => {
      openModal(movieId); // Deschide fereastra modală când este apăsat un card de film.
    });
  }

  // Funcția pentru afișarea filmelor din "watched" și "queue"
  async function displayMoviesFromLocalStorage(listType, targetSection) {
    const movies = JSON.parse(localStorage.getItem(listType)) || [];

    // Golește secțiunea pentru a evita duplicarea filmelor
    targetSection.innerHTML = ' ';

    // Verifică dacă lista de filme este goală
    if (movies.length === 0) {
      const messageElement = document.createElement('p');
      messageElement.textContent = `Your ${listType} list is empty.`;
      targetSection.appendChild(messageElement);
      return;
    }

    // Folosește Promise.all pentru a aștepta completarea tuturor cererilor asincrone
    await Promise.all(
      movies.map(async movieId => {
        try {
          const movieDetails = await getMovieDetails(movieId);
          const genres = await getMovieGenres(); // Obține genurile

          // Creează un card pentru fiecare film și adaugă-l în secțiunea corespunzătoare
          const movieCard = createMovieCard(movieDetails, genres);
          attachCardClickListener(movieCard, movieId);

          targetSection.appendChild(movieCard);
        } catch (error) {
          console.error(
            `Error fetching movie details for ID ${movieId}:`,
            error
          );
        }
      })
    );
  }

  // Funcția pentru a obține detalii despre un film în funcție de id
  async function getMovieDetails(movieId) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        apiMovie
      );
      return response.data;
    } catch (error) {
      throw new Error('Error fetching movie details');
    }
  }

  // Apelează funcția pentru ambele tipuri de liste
  displayMoviesFromLocalStorage('watched', sectionWatched);
  displayMoviesFromLocalStorage('queue', sectionQueue);

  const clearWatchedBtn = document.querySelector('.clear-watched-btn');
  const clearQueueBtn = document.querySelector('.clear-queue-btn');

  // Adaugă un eveniment de ascultare pentru butoanele "Clear"
  clearWatchedBtn.addEventListener('click', function () {
    clearLocalStorage('watched', sectionWatched);
  });

  clearQueueBtn.addEventListener('click', function () {
    clearLocalStorage('queue', sectionQueue);
  });

  // Funcția pentru a curăța datele din local storage
  function clearLocalStorage(listType, targetSection) {
    localStorage.removeItem(listType);
    // Actualizează afișajul pentru "watched" sau "queue"
    displayMoviesFromLocalStorage(listType, targetSection);
  }
});

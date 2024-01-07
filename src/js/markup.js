// markup.js

// Funcție pentru generarea sablonului unui card de film:
export function createMovieCard(movie, genres) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');
  movieCard.setAttribute('data-movieid', movie.id);
  movieCard.setAttribute('modal-movie-card-open', 'true');

  const movieImage = document.createElement('img');

  // Verificăm dacă există un poster_path valid înainte de a crea URL-ul imaginii:
  if (movie.poster_path) {
    const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    movieImage.src = imageUrl;
  } else {
    // Dacă nu există poster_path, folosim o imagine implicită:
    movieImage.src = 'https://i.imgur.com/p3MsT9t.jpg';
    movieImage.alt = 'Image not available';
    console.info('No poster available');
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

  // Verifică dacă movie.genre_ids este definit și este o matrice

  const movieGenres =
    Array.isArray(movie.genres) && movie.genres.length > 0
      ? movie.genres.map(genre => genre.name)
      : Array.isArray(movie.genre_ids)
      ? movie.genre_ids.map(genreId => {
          const foundGenre = genres.find(genre => genre.id === genreId);
          return foundGenre ? foundGenre.name : '';
        })
      : [];

  // Verifică dacă există genuri disponibile; în caz contrar, afișează un mesaj alternativ
  const genresString = movieGenres.length > 0 ? movieGenres.join(' ') : 'N/A';

  const voteAverage = movie.vote_average || 0;
  const formattedVoteAverage = voteAverage.toFixed(1); // Afiseaza votul cu o singura zecimala

  // Creăm un element <span> pentru a încadra valoarea votului mediu
  const voteAverageSpan = document.createElement('span');
  voteAverageSpan.textContent = formattedVoteAverage;
  voteAverageSpan.classList.add('vote');

  movieInfo.textContent = `${genresString} | ${releaseYear} | `;
  movieInfo.classList.add('movie-info');

  movieCard.appendChild(movieImage);
  movieCard.appendChild(movieTitle);
  movieCard.appendChild(movieInfo);
  movieInfo.appendChild(voteAverageSpan);

  return movieCard;
}

// Funcție pentru generarea sablonului unui card de film:
export function createMovieCard(movie, genres) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');
  movieCard.setAttribute('data-movieid', movie.id);
  movieCard.setAttribute('modal-movie-card-open', 'true');

  const movieImage = document.createElement('img');
  // If a poster exists, use the poster image:
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  try {
    movieImage.src = imageUrl;
  } catch (error) {
    // If no poster exists, use a default image:
    movieImage.src = 'https://i.imgur.com/p3MsT9t.jpg';
    movieImage.alt = 'Image not available';
    console.error('Failed to load image:', error);
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
  movieInfo.textContent = `${genresString} | ${releaseYear} `;
  movieInfo.classList.add('movie-info');

  movieCard.appendChild(movieImage);
  movieCard.appendChild(movieTitle);
  movieCard.appendChild(movieInfo);

  return movieCard;
}

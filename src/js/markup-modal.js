// markup-modal.js

export const modalContentMarkup = movieDetails => {
  return `
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
    <p class="modal-movie-voteCount">Vote count: ${movieDetails.vote_count}</p>
    <p class="modal-movie-popularity">Popularity: ${movieDetails.popularity}</p>
    <p class="modal-movie-originalTitle">Original title: ${
      movieDetails.original_title
    }</p>
    <p class="modal-movie-RealeseDate">Release Date: ${
      movieDetails.release_date
    }</p>
    <p class="modal-movie-overview">Overview: ${movieDetails.overview}</p>
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
};

function getMovieImageUrl(posterPath) {
  return posterPath
    ? `https://image.tmdb.org/t/p/w500/${posterPath}`
    : 'https://i.imgur.com/p3MsT9t.jpg'; // imagine implicita
}

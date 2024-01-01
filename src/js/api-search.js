const apiSearch = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmZiNGNlMzE4ZWEyMzFmODJjN2Y3MTc5NmFhM2M2ZSIsInN1YiI6IjY1NzBkZjkyZGQ3MzFiMDBhYjk2Nzc0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F4GA0UkBmMTH3hTtFSbrMrSBqudmtfgqt4w1tmAKyIU',
  },
};

export default apiSearch;

// Pentru a importa API-ul folositi codul de mai jos

// import axios from 'axios';
// import apiMovie from './api-search.js';

// pentru axios

// axios
//   .request(apiSearch)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

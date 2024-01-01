// const loaderContainer = document.querySelector('.loader-container');

// setTimeout(function () {
//   document.querySelector('.loader-container').style.display = 'none';
// }, 900);

// const searchForm = document.getElementById('search-form');
// searchForm.addEventListener('submit', function (event) {
//   event.preventDefault();

//   // Show the loader when a search is initiated
//   loaderContainer.style.display = 'block';

//   // Set a timer to hide the loader after 900ms
//   setTimeout(function () {
//     loaderContainer.style.display = 'none';
//   }, 900);
// });

// ----------------------------------------- test


// Store the loader container in a variable
const loaderContainer = document.querySelector('.loader-container');

// Show the loader when the page starts loading
loaderContainer.style.display = 'flex';

// Use the window's load event to hide the loader when all content is loaded
window.addEventListener('load', function () {
  // Set a small delay before hiding the loader to ensure smooth transition
  setTimeout(function () {
    loaderContainer.style.display = 'none';
  }, 500);
});

// const searchForm = document.getElementById('search-form');
// searchForm.addEventListener('submit', function (event) {
//   event.preventDefault();

//   // Show the loader when a search is initiated
//   loaderContainer.style.display = 'block';

//   // Set a timer to hide the loader after 900ms
//   setTimeout(function () {
//     loaderContainer.style.display = 'none';
//   }, 900);
// });

const btn1_ctn = document.getElementsByClassName('btn1_container')[0];
const one = document.querySelector('.fas');

// Function to set the dark mode state
function setDarkMode(isDarkMode) {
  // Toggle classes for the moon icon, active state, and background change
  one.classList.toggle('fa-circle', !isDarkMode);
  one.classList.toggle('fa-moon', isDarkMode);
  one.classList.toggle('active1', isDarkMode);
  btn1_ctn.classList.toggle('changeBg', isDarkMode);

  // Toggle the dark mode class on the body
  document.body.classList.toggle('dark-mode', isDarkMode);

  // Save the dark mode state to localStorage
  localStorage.setItem('darkMode', isDarkMode);
}

// Function to get the dark mode state from localStorage
function getDarkMode() {
  // Use 'true' as a string to check if the value is truthy
  return localStorage.getItem('darkMode') === 'true';
}

// Set the initial dark mode state
setDarkMode(getDarkMode());

btn1_ctn.addEventListener('click', () => {
  // Toggle the dark mode state
  const isDarkMode = !getDarkMode();
  setDarkMode(isDarkMode);
});

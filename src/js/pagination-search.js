// pagination.js

const TOTAL_PAGES = 500;

function createPaginationButtonsSearch(
  currentPage,
  updatePaginationAndDisplaySearch
) {
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  const prevButton = document.createElement('button');
  prevButton.innerHTML = '&laquo;';
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      updatePaginationAndDisplaySearch(1); // Du-te la prima pagină când este apăsată săgeata spre stânga
    }
  });
  pagination.appendChild(prevButton);

  const maxPages = Math.min(currentPage + 2, TOTAL_PAGES);
  const minPages = Math.max(1, maxPages - 4);

  for (let i = minPages; i <= maxPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    if (i === currentPage) {
      pageButton.classList.add('active');
    }
    pageButton.addEventListener('click', () => {
      updatePaginationAndDisplaySearch(i);
    });
    pagination.appendChild(pageButton);
  }

  const nextButton = document.createElement('button');
  nextButton.innerHTML = '&raquo;';
  nextButton.addEventListener('click', () => {
    if (currentPage < TOTAL_PAGES) {
      updatePaginationAndDisplaySearch(TOTAL_PAGES); // Du-te la ultima pagină când este apăsată săgeata spre dreapta
    }
  });
  pagination.appendChild(nextButton);
}

export { createPaginationButtonsSearch };

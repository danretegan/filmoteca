// pagination-search.js

import axios from 'axios';
import apiSearch from './api-search.js';

const TOTAL_PAGES = 500;

async function createPaginationButtonsSearch(
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

  // Adaugă apelul către API și afișarea rezultatelor în consolă
  const searchUrl = `${apiSearch.url}&query=your_query_here&page=${currentPage}`;

  try {
    const response = await axios.get(searchUrl, apiSearch);
    console.log('response from API:', response);
    console.log('page:', response.data.page);
    console.log('first 20 results:', response.data.results);
    console.log('total_pages:', response.data.total_pages);
    console.log('total_results:', response.data.total_results);
  } catch (error) {
    console.error('Error:', error);
  }
}

export { createPaginationButtonsSearch };

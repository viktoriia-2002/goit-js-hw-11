import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36126930-7b2057d774b58ed23a3e8d721';

async function getImages(searchQuery, page, totalHits) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function displayTotalHits(totalHits) {
  const totalHitsEl = document.querySelector('.total-hits');
  if (totalHitsEl) {
    totalHitsEl.textContent = `Total Images Found: ${totalHits}`;
  } else {
    const totalHitsMarkup = `<p class="total-hits">Total Images Found: ${totalHits}</p>`;
    refs.gallery.insertAdjacentHTML('beforebegin', totalHitsMarkup);
  }

  Notiflix.Notify.info(`Total Images Found: ${totalHits}`);
}

export { getImages };

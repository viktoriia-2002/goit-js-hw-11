import './css/style.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36126930-7b2057d774b58ed23a3e8d721';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';

  const searchQuery = refs.input.value.trim();

  if (searchQuery === '') {
    return;
  }

  getImages(searchQuery)
    .then(images => {
      if (images.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderImages(images);
      }
    })
    .catch(error => {
      console.error(error);
      Notiflix.Notify.failure(
        'An error occurred while fetching images. Please try again later.'
      );
    });
}

async function getImages() {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        ID: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getImages(searchQuery) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });

    return response.data.hits;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function renderImages(images) {
  const imageElMarkup = images.map(image => {
    return `
        <div class="photo-card">
          <img src="${image.webformatURL}" alt="${image.tags}"  width="500" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${image.likes}
            </p>
            <p class="info-item">
              <b>Views:</b> ${image.views}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${image.comments}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${image.downloads}
            </p>
          </div>
        </div>`;
  });

  refs.gallery.insertAdjacentHTML('beforeend', imageElMarkup.join(''));
}




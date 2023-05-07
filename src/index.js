import './css/style.css'
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36126930-7b2057d774b58ed23a3e8d721';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let page = 1;

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmit(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';

  const searchQuery = refs.input.value.trim();

  if (searchQuery === '') {
    return;
  }

  page = 1;

  getImages(searchQuery)
    .then(images => {
      if (images.length === 0) {
        checkLoadMoreButtonVisibility(0);
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        checkLoadMoreButtonVisibility(images.totalHits);
        renderImages(images.hits);
      }
    })
    .catch(error => {
      console.error(error);
      Notiflix.Notify.failure(
        'An error occurred while fetching images. Please try again later.'
      );
    });
}

function onLoadMore() {
  const searchQuery = refs.input.value.trim();

  if (searchQuery === '') {
    return;
  }

  page++;

  getImages(searchQuery)
    .then(images => {
      checkLoadMoreButtonVisibility(images.totalHits);
      renderImages(images.hits);
    })
    .catch(error => {
      console.error(error);
      Notiflix.Notify.failure(
        'An error occurred while fetching more images. Please try again later.'
      );
    });
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
function renderImages(images) {
  const imageElMarkup = images.map(image => {
    return `
        <a href="${image.largeImageURL}">
          <div class="photo-card">
            <img src="${image.webformatURL} width="500"  alt="${image.tags}" width="500" loading="lazy" />
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
          </div>
        </a>`;
  });

  refs.gallery.insertAdjacentHTML('beforeend', imageElMarkup.join(''));

  lightbox.refresh();

  scrollDown();
}

function scrollDown() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
}

function checkLoadMoreButtonVisibility(totalHits) {
  if (page === 1) {
    refs.loadMoreBtn.style.display = 'none';
  } else if (page > 1 && totalHits > page * 40) {
    refs.loadMoreBtn.style.display = 'block';
  } else {
    refs.loadMoreBtn.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  rel: false,
});

document.body.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    lightbox.close();
  }
});

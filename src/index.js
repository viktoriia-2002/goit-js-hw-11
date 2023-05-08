import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderImages } from './render.js';
import { getImages } from './async.js';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let page = 1;
refs.loadMoreBtn.style.visibility = 'hidden';

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

  getImages(searchQuery, page)
    .then(images => {
      if (images.length === 0) {
        checkLoadMoreButtonVisibility(0);
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        checkLoadMoreButtonVisibility(images.totalHits);
        renderImages(images.hits, refs);
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

  getImages(searchQuery, page)
    .then(images => {
      checkLoadMoreButtonVisibility(images.totalHits);
      renderImages(images.hits, refs);
    })
    .catch(error => {
      console.error(error);
      Notiflix.Notify.failure(
        'An error occurred while fetching more images. Please try again later.'
      );
    });
}

function checkLoadMoreButtonVisibility(totalHits) {
  if (page === 1) {
    refs.loadMoreBtn.style.visibility = 'visible';
    refs.loadMoreBtn.style.display = 'flex';
    refs.loadMoreBtn.style.margin = '30px auto';
  } else if (page > 1 && totalHits > page * 40) {
    refs.loadMoreBtn.style.visibility = 'visible';
  } else {
    refs.loadMoreBtn.style.visibility = 'hidden';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}



lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  rel: false,
});

document.body.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    lightbox.close();
  }
});

import './css/style.css';
//import API from './fetchImages';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';


const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36126930-7b2057d774b58ed23a3e8d721';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('.searchQuery'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(){
    const imageElMarkup =  ` <div class="photo-card">
    <img src="" alt="" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
      </p>
      <p class="info-item">
        <b>Views</b>
      </p>
      <p class="info-item">
        <b>Comments</b>
      </p>
      <p class="info-item">
        <b>Downloads</b>
      </p>
    </div>
  </div> `
    gallery.insertAdjacentHTML('beforeend',imageElMarkup)
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
  }
}

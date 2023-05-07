import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36126930-7b2057d774b58ed23a3e8d721';

async function getImages(searchQuery, page) {
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

export { getImages };

import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32943531-cb871ea456f4d19bb7942720c';

export const fetchApi = async (searchQuery, page = 1) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: KEY,
      q: `${searchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page: `${page}`,
    },
  });

  return response.data;
};

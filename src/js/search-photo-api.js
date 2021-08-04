import axios from 'axios';

export default class PhotosApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
    this.key = '22753762-fd63e7dfb5c4c0a273cbd20a6';
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  getPhotos = async function getPhotos() {
    const response = await axios({
      method: 'get',
      url: `https://pixabay.com/api/?key=${this.key}&q=${this.searchQuery}&per_page=${this.per_page}&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`,
      responseType: 'text',
    });

    this.page = +1;
    return await response.data;
  };
}

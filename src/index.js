import './sass/main.scss';
import PhotosApiService from './js/search-photo-api';
import Notiflix from 'notiflix';
import photoCardExecutionTpl from './templates/photo-card-execution.hbs';
import LoadMoreBtn from './js/load-more-btn';

photoCardExecutionTpl({});

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryCardsContainer: document.querySelector('.gallery'),
};

const photosApiService = new PhotosApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();

  clearPhotoCardsMarkup();

  photosApiService.query = event.currentTarget.elements.searchQuery.value;

  if (photosApiService.query === '') {
    return;
  }

  photosApiService.resetPage();
  photosApiService.getPhotos().then(appendPhotoCardsMarkup);
}

function onLoadMore() {
  photosApiService.getPhotos().then(appendPhotoCardsMarkup);
}

function appendPhotoCardsMarkup(data) {
  if (data.totalHits > 0) {
    refs.galleryCardsContainer.insertAdjacentHTML('beforeend', photoCardExecutionTpl(data.hits));

    if (photosApiService.per_page * (photosApiService.page - 1) > data.totalHits) {
      loadMoreBtn.hide();
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
      loadMoreBtn.show();
    }
  }
  if (data.totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    loadMoreBtn.hide();
  }
}

function clearPhotoCardsMarkup() {
  refs.galleryCardsContainer.innerHTML = '';
}

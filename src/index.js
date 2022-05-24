import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ApiServise from './fetchPhoto';
import cardElem from './card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './style.css';

const per_page = 40;
let displayedHits = 0;
const form = document.querySelector('.search-form');
const buttonMore = document.querySelector('.load-more');
const cardList = document.querySelector('.gallery');
const apiServise = new ApiServise();

form.addEventListener('submit', onSearch);
buttonMore.addEventListener('click', onButtonMore);

function onSearch(e) {
  e.preventDefault();
  clearContainer();
  apiServise.query = e.currentTarget.elements.searchQuery.value.trim();
  apiServise.resetPage();
  apiServise.fetchPhoto().then(renderUserList);
  clearContainer();
}

function onButtonMore() {
  apiServise.fetchPhoto().then(renderUserList).then(pageScroll);
}

function renderUserList(data) {
  buttonMore.classList.add('is-hidden');
  cardList.insertAdjacentHTML('beforeend', cardElem(data.hits));
  displayedHits += data.hits.length;
  Notify.success(`Hooray! We found ${data.totalHits} images.`);
  lightboxGallery();

  if (apiServise.query === '' || data.totalHits === 0) {
    clearContainer();
    buttonMore.classList.remove('is-hidden');
    return error();
  }

  if (data.totalHits < per_page || displayedHits === data.totalHits) {
    Notify.warning('We are sorry, but you have reached the end of search results.');
    buttonMore.classList.remove('is-hidden');
  }
}
//очищает контейне если нечего не найдено
function clearContainer() {
  cardList.innerHTML = '';
}
///Если бэкенд возвращает пустой массив,
function error() {
  return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}
///Прокрутка страницы
function pageScroll() {
  const { height: cardHeight } = cardList.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
///Библиотека SimpleLightbox
function lightboxGallery() {
  var lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250 /* options */,
  });
}

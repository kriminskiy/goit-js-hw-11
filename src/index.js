import './style.css';
import NewsApiService from './fetchingData';
import { renderHTML } from './editHTML';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import throttle from 'lodash.throttle';

const newsApiService = new NewsApiService();

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');
let bottomMsg = document.querySelector('.bottomMessage');
let pages;

loadMoreBtn.classList.add('is-hidden');

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

function onFormSubmit(e) {
  e.preventDefault();
  clearHTML();
  loadMoreBtn.classList.add('is-hidden');
  newsApiService.resetpage();
  newsApiService.query = e.currentTarget.elements.searchQuery.value;

  if (bottomMsg) {
    bottomMsg.remove();
  }

  if (newsApiService.query.trim() === '') {
    Notiflix.Notify.failure('Please fill in the field');
    return;
  }
  newsApiService
    .fetchData()
    .then(({ totalHits, hits }) => {
      pages = Math.ceil(totalHits / hits.length);
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again',
        );
        return;
      }
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images!`);
      renderHTML(hits);
      loadMoreBtn.classList.remove('is-hidden');
      if (pages === 1) {
        loadMoreBtn.classList.add('is-hidden');
        addBottomMsg();
      }
    })
    .catch(error => console.log(error));
}

function clearHTML() {
  galleryEl.innerHTML = '';
}

function onLoadMore() {
  newsApiService.fetchData().then(({ hits }) => {
    if (pages === newsApiService.nowPage()) {
      loadMoreBtn.classList.add('is-hidden');
      addBottomMsg();
    }
    renderHTML(hits);
  });
}

function addBottomMsg() {
  bottomMsg = document.createElement('p');
  bottomMsg.textContent = "We're sorry, but you've reached the end of search results.";
  bottomMsg.classList.add('bottomMessage');
  galleryEl.after(bottomMsg);
}
// window.addEventListener('scroll', throttle(infiniteScroll,300))

// function infiniteScroll() {
// const documentRect = document.documentElement.getBoundingClientRect();
//   if (documentRect.bottom < document.documentElement.clientHeight + 100) {
//     newsApiService.fetchData()
//       .then(({ hits }) => {
//         if (hits.length === 0) {
//           Notiflix.Notify.failure('End');
//           console.log('this is the end');
//           return;
//         }
//         renderHTML(hits)
//       })
//       .catch(error => {
//         console.log(error);
//         return;
//       });

//   }
// }

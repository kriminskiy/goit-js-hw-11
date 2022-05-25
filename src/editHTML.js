import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const galleryLigthbox = new SimpleLightbox('.gallery a');

export function renderHTML(picturesArr) {
  const markup = picturesArr
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" height="190px"/>
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: <br>${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: <br>${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: <br>${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: <br>${downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  galleryLigthbox.refresh();
}

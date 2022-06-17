import axios from 'axios';
import Notiflix from 'notiflix';
import GetPhotoApi from './fetchFoto';
const getPhotoApi = new GetPhotoApi();
const galleryRefs = document.querySelector('.gallery');
const $Form = document.querySelector('#search-form');
const $Input = document.querySelector('input[name=searchQuery]');
const $loadMoreBtn = document.querySelector('.btn-show');
$Form.addEventListener('submit', submitHandler);
$loadMoreBtn.addEventListener('click', loadMorePhoto);

function submitHandler(e) {
  e.preventDefault();

  getPhotoApi.searchValue = e.target.searchQuery.value;
  getPhotoApi.resetPage();
  getPhotoApi
    .getPhoto()
    .then(({ totalHits, hits }) => {
      // console.log(data);
      if (totalHits > 0) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      }
      clearGallery();
      renderSearchFoto(hits);
      $loadMoreBtn.removeAttribute('hidden');
      if (hits.length < 40) {
        $loadMoreBtn.setAttribute('hidden', 'hidden');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error));
}

function renderSearchFoto(response) {
  const markUpList = response
    .map(
      el =>
        `<div class="photo-card">
  <img src="${el.webformatURL}" alt="cat" loading="lazy" width=275 height=250/>
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
</div>`
    )
    .join('');
  galleryRefs.insertAdjacentHTML('beforeend', markUpList);
}

function loadMorePhoto(e) {
  getPhotoApi.getPhoto().then(hits => renderSearchFoto(hits));
}

function clearGallery() {
  galleryRefs.innerHTML = '';
}

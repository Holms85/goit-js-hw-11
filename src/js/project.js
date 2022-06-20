import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import GetPhotoApi from './fetchFoto';
const getPhotoApi = new GetPhotoApi();
const galleryRefs = document.querySelector('.gallery');
const $Form = document.querySelector('#search-form');
const $Input = document.querySelector('input[name=searchQuery]');
const $loadMoreBtn = document.querySelector('.btn-show');
$Form.addEventListener('submit', submitHandler);
$loadMoreBtn.addEventListener('click', loadMorePhoto);
const lightbox = new SimpleLightbox('.gallery div a', {
  captionsData: 'alt',
  captionDelay: 250,
});
hiddenLoadBtn();
function submitHandler(e) {
  e.preventDefault();
  showLoadBtn();
  createStyle();
  getPhotoApi.searchValue = e.target.searchQuery.value;
  getPhotoApi.resetPage();
  getPhotoApi
    .getPhoto()
    .then(({ totalHits, hits }) => {
      if (totalHits > 0) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      }
      clearGallery();
      if (totalHits <= 40 && hits.length > 0) {
        Notify.success(`Hooray! We found ${hits.length} images.`);
        hiddenLoadBtn();
      }

      renderSearchFoto(hits);
      if (getPhotoApi.page > Math.ceil(totalHits / 40)) {
        hiddenLoadBtn();
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }

      if (hits.length === 0) {
        hiddenLoadBtn();
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
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
        <a href="${el.largeImageURL}">
  <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" width=275 height=250/>
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${el.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${el.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${el.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${el.downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
  galleryRefs.insertAdjacentHTML('beforeend', markUpList);
  lightbox.refresh();
}

function createStyle() {
  $loadMoreBtn.style.backgroundColor = 'rgba(0, 204, 255, 0.692)';
  $loadMoreBtn.style.display = 'block';
  $loadMoreBtn.style.marginLeft = 'auto';
  $loadMoreBtn.style.marginRight = 'auto';
}

function loadMorePhoto(e) {
  getPhotoApi.getPhoto().then(({ hits, totalHits }) => {
    renderSearchFoto(hits);
    if (getPhotoApi.page > Math.ceil(totalHits / 40)) {
      hiddenLoadBtn();
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}

function clearGallery() {
  galleryRefs.innerHTML = '';
}

function showLoadBtn() {
  $loadMoreBtn.classList.remove('is-hidden');
  createStyle();
}

function hiddenLoadBtn() {
  $loadMoreBtn.classList.add('is-hidden');
  $loadMoreBtn.style.display = '';
}

// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });

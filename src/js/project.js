import axios from "axios";
import Notiflix from 'notiflix';
import GetPhotoApi from "./fetchFoto";
const getPhotoApi = new GetPhotoApi();
const galleryRefs = document.querySelector('.gallery')
const $Form = document.querySelector('#search-form');
const $Input = document.querySelector('input[name=searchQuery]');
const $Button = document.querySelector('button')
$Form.addEventListener('submit', submitHandler)
// const myKey = '28048409-7c5d239fb0980a21fe8515423';
// const baseURL = "https://pixabay.com/api/";
// getFoto
function submitHandler(e) {
    e.preventDefault()
    getPhotoApi.searchValue = e.target.searchQuery.value;
  getPhotoApi.getPhoto();
        
}

function renderSearchFoto(response) {
  const markUpList = response
    .map(
      el =>
        `<div class="photo-card">
  <img src="${el.webformatURL}" alt="cat" loading="lazy" />
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
    .join("");
  galleryRefs.innerHTML = markUpList;
}

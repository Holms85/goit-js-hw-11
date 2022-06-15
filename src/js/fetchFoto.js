import axios from "axios";
import Notiflix from 'notiflix';
export { getFoto };
    const galleryRefs = document.querySelector('.gallery')
const $Form = document.querySelector('#search-form');
const $Input = document.querySelector('input[name=searchQuery]');
const $Button = document.querySelector('button')
$Form.addEventListener('submit', getFoto)
const myKey = '28048409-7c5d239fb0980a21fe8515423';
const baseURL = "https://pixabay.com/api/";

async function getFoto(e) {
    e.preventDefault()
    const text = e.target.searchQuery.value;

      const response = await axios.get(`${baseURL}`, {params: {
    key: myKey,
    q: text,
    image_type: 'foto',
    orientation: 'horizontal',
    safesearch: true,
      }
      });
    console.log(response);
    //   if (!response.ok) {
    //   throw new Error(
    //     Notiflix.Notify.failure('Oops, there is no foto with that name')
    //   );
    // } 
    // return response;
    const data = await response.data
    console.log(data);
    const hits = await data.hits
    console.log(hits);
    renderSearchFoto(hits);
    // return hits;
}

// getFoto().then(hits => {
// renderSearchFoto(hits)
// }
// )
    
function renderSearchFoto(response) {
  const markUpList = response
    .map(
      el =>
        `<div class="photo-card">
  <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
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
    .join("");
  galleryRefs.innerHTML = markUpList;
}
import axios from "axios";
import Notiflix from 'notiflix';
export default class GetPhotoApi {
  constructor() {
    this.searchValue = '';
    this.page = 1;
  }
  async getPhoto() {
    const url = 'https://pixabay.com/api/';
const searchParams = new URLSearchParams({
  key: '28048409-7c5d239fb0980a21fe8515423',
  q: this.searchValue,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: this.page,
  per_page: 40,
});
      const response = await axios.get(`${url}?${searchParams}`);
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
    // return hits;
}
}
// export { getFoto };
//     const galleryRefs = document.querySelector('.gallery')
// const $Form = document.querySelector('#search-form');
// const $Input = document.querySelector('input[name=searchQuery]');
// const $Button = document.querySelector('button')
// $Form.addEventListener('submit', getFoto)
// const myKey = '28048409-7c5d239fb0980a21fe8515423';
// const baseURL = "https://pixabay.com/api/";

// async function getFoto(e) {
//     e.preventDefault()
//     const text = e.target.searchQuery.value;

//       const response = await axios.get(`${baseURL}`, {params: {
//     key: myKey,
//     q: text,
//     image_type: 'foto',
//     orientation: 'horizontal',
//     safesearch: true,
//       }
//       });
//     console.log(response);
//     //   if (!response.ok) {
//     //   throw new Error(
//     //     Notiflix.Notify.failure('Oops, there is no foto with that name')
//     //   );
//     // } 
//     // return response;
//     const data = await response.data
//     console.log(data);
//     const hits = await data.hits
//     console.log(hits);
//     renderSearchFoto(hits);
//     // return hits;
// }


    

import axios from 'axios';
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

    this.page += 1;
    if (response.status !== 200) {
      throw new Error(
        Notiflix.Notify.failure('Oops, there is no foto with that name')
      );
    }

    const data = await response.data;

    return data;
  }
  resetPage() {
    this.page = 1;
  }
}

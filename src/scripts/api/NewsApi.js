import { getDate } from '../utils/getDate';

export default class NewsApi {
  constructor() {
  }

  async getNews(keyword) {
    try {
      const res = await fetch(
        `https://nomoreparties.co/news/v2/everything?q=${keyword}&`
          + `pageSize=100&`
          + `from=${getDate(7)}&to=${getDate()}&`
          + `sortBy=popularity&`
          + `apiKey=d56d8a535e76424fb15a0af694deed2d`,
      );
      return res.json();
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        return new Error('Ошибка запроса');
      }
    }
  }
}
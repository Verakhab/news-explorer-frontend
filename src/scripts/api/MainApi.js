import BaseComponent from '../components/BaseComponent';

export default class MainApi extends BaseComponent {
  constructor(url) {
    super();
    this.url = url;
  }

  async getUserInfo() {
    try {
      const res = await fetch(this.url, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return await res.json();
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        return new Error('Ошибка запроса');
      }
      return new Error(err.message);
    }
  }

  async signUp(json) {
    this.json = json;
    try {
      const res = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.json,
      });
      return await res.json();
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        return new Error('Ошибка запроса');
      }
      return new Error(err.message);
    }
  }

  async signIn(json) {
    this.json = json;
    try {
      const res = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.json,
      });
      return await res.json();
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        return new Error('Ошибка запроса');
      }
      return new Error(err.message);
    }
  }

  async getArticles() {
    try {
      const res = await fetch(`${this.url}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return await res.json();
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        return new Error('Ошибка запроса');
      }
    }
  }

  async createArticle(keyword, title, text, date, source, link, image) {
    try {
      const res = await fetch(this.url, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword,
          title,
          text,
          date,
          source,
          link,
          image,
        }),
      });
      return await res.json();
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        return new Error('Ошибка запроса');
      }
    }
  }

  async removeArticle(id) {
    try {
      const res = await fetch(`${this.url}articles/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      return await res.json();
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        return new Error('Ошибка запроса');
      }
    }
  }
}

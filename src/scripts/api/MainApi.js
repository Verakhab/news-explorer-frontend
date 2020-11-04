export default class MainApi {
  constructor(url, token) {
    this.url = url;
    this.token = token;
  }

  async getUserInfo() {
    try {
      const res = await fetch(this.url, {
        credentials: 'include',
      });
      return await console.log(res.json());
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
        // credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.json,
      });
      return await console.log(res.json());
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        return new Error('Ошибка запроса');
      }
      return new Error(err.message);
    }
  }

  async getArticles() {
    try {
      const res = await fetch(this.url, {
        credentials: 'include',
      });
      return await res.json();
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        return new Error('Ошибка запроса');
      }
    }
  }

  async createArticle(keyword, title, text, date, source, link, image) {
    const res = await fetch(`${this._baseURL}articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
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
  }

  async removeArticle(id) {
    const res = await fetch(`${this._baseURL}articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
    // {
    //   if (res.ok) {
    //     return res.json();
    //   }
    //   return res.json().then((err) => err);
    // })
    // .catch((err) => {
    //   const resErr = err;
    //   resErr.message = 'Произошла ощибка на сервере, попробуйте снова позже';
    //   return err;
    // });
  }
}

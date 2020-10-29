export default class MainApi {
  constructor(url) {
    this.url = url;
    // this.token = token;
  }

  async signUp(json) {
    this.json = json;
    try {
      const res = await fetch(this.url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.json,
      });
      console.log(res.json());
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }
}

import MainApi from '../api/MainApi';
import { parseDate } from '../utils/getDate';
import BaseComponents from './BaseComponent';

export default class NewsArticle extends BaseComponents {
  constructor(image, date, title, link, text, source, keyword, _id) {
    super();
    this.image = image;
    this.date = date;
    this.link = link;
    this.title = title;
    this.text = text;
    this.source = source;
    this.keyword = keyword;
    this._id = _id;
    this.setEventListeners();
  }

  createElem(tagName, className) {
    const elem = document.createElement(tagName);
    elem.classList.add(className);
    return elem;
  }

  createNews() {
    const news = this.createElem('div', 'news');

    const imgConteiner = this.createElem('div', 'news__container-img');
    news.append(imgConteiner);

    const imgNews = this.createElem('img', 'news__img');
    imgNews.setAttribute('src', this.image);
    imgConteiner.append(imgNews);

    if (document.location.href.includes('articles.html')) {
      const imgShareDelete = this.createElem('img', 'news__img-share');
      imgShareDelete.setAttribute('src', '../../images/Group11.png');
      imgConteiner.append(imgShareDelete);
    } else {
      const imgShareButton = this.createElem('button', 'news__img-share');
      this.imgShareButton = imgShareButton;
      const imgShare = this.createElem('img', 'news__img-share');
      imgShare.setAttribute('src', '../../images/Group14.png');
      imgConteiner.append(imgShare);
      imgShare.append(imgShareButton);
    }

    if (document.location.href.includes('articles.html')) {
      const newsImgShareTitle = this.createElem('img', 'news__img-share_title');
      newsImgShareTitle.setAttribute('src', '../../images/Rectangle77.png');
      imgConteiner.append(newsImgShareTitle);
      const newsImgShareTitleText = this.createElem('a', 'news__img-share_title-text');
      newsImgShareTitleText.textContent = this.keyword;
      imgConteiner.append(newsImgShareTitleText);
    }
    const imgShareAbout = this.createElem('img', 'news__img-share_about');
    imgShareAbout.setAttribute('src', '../../images/bg.png');
    imgConteiner.append(imgShareAbout);

    const imgShareAboutText = this.createElem('a', 'news__img-share_about-text');
    if (document.location.href.includes('articles.html')) {
      imgShareAboutText.textContent = 'Убрать из сохраненных';
    } else {
      imgShareAboutText.textContent = 'Войдите, чтобы сохранять статьи';
    }
    imgConteiner.append(imgShareAboutText);

    const newsAboutContainer = this.createElem('div', 'news__about');
    news.append(newsAboutContainer);

    const newsDate = this.createElem('p', 'news__date');
    newsDate.textContent = parseDate(this.date);
    newsAboutContainer.append(newsDate);

    const newsTitle = this.createElem('h3', 'news__title');
    newsAboutContainer.append(newsTitle);

    const newsLink = this.createElem('a', 'news__link');
    newsLink.setAttribute('href', this.link);
    newsLink.textContent = this.title;
    newsTitle.append(newsLink);

    const newsResume = this.createElem('p', 'news__resume');
    newsResume.textContent = this.text;
    newsAboutContainer.appendChild(newsResume);

    const newsSource = this.createElem('p', 'news__author');
    newsSource.textContent = this.source;
    newsAboutContainer.appendChild(newsSource);

    const container = document.querySelector('.result__container');
    this.container = container;
    return news;
  }

  renderIcon() {
    const mouseOver = {
      element: this.card,
      eventType: 'mouseover',
      callback: (event) => {
        if (document.location.href.includes('articles.html')) {
          if (event.target.closest('.news__img-share') && this.card
            .querySelector('.news__img-share')
            .getAttribute('src')
            .includes('Group11.png')) {
            this.card
              .querySelector('.news__img-share')
              .setAttribute('src', '../../images/Group122.png');
            this.card
              .querySelector('.news__img-share_about')
              .setAttribute('style', 'display: flex');
            this.card
              .querySelector('.news__img-share_about-text')
              .setAttribute('style', 'display: flex');
          }
        } else if (!localStorage.getItem('token')) {
          if (event.target.closest('.news__img-share')) {
            this.card
              .querySelector('.news__img-share_about')
              .setAttribute('style', 'display: flex');
            this.card
              .querySelector('.news__img-share_about-text')
              .setAttribute('style', 'display: flex');
          }
        }
      },
    };
    const mouseOut = {
      element: this.card,
      eventType: 'mouseout',
      callback: (event) => {
        if (document.location.href.includes('articles.html')) {
          if (event.target.closest('.news__img-share') && this.card
            .querySelector('.news__img-share')
            .getAttribute('src')
            .includes('Group122.png')) {
            this.card
              .querySelector('.news__img-share')
              .setAttribute('src', '../../images/Group11.png');
            this.card
              .querySelector('.news__img-share_about')
              .setAttribute('style', 'display: none');
            this.card
              .querySelector('.news__img-share_about-text')
              .setAttribute('style', 'display: none');
          }
        } else if (!localStorage.getItem('token')) {
          if (event.target.closest('.news__img-share')) {
            this.card
              .querySelector('.news__img-share_about')
              .setAttribute('style', 'display: none');
            this.card
              .querySelector('.news__img-share_about-text')
              .setAttribute('style', 'display: none');
          }
        }
      },

    };
    const click = {
      element: this.card,
      eventType: 'click',
      callback: (event) => {
        event.stopPropagation();
        if (document.location.href.includes('articles.html')) {
          if (this.card
            .querySelector('.news__img-share')
            .getAttribute('src')
            .includes('Group122.png')
            && localStorage.getItem('token')
            && event.target.closest('.news__img-share') && window
            .confirm('Действительно удалить статью из сохраненных?')) {
            new MainApi('https://api.web.students.nomoreparties.space/')
              .removeArticle(this._id);
            this.container.removeChild(this.card);
          }
        }
        if (!document.location.href.includes('articles.html')) {
          if (this.card
            .querySelector('.news__img-share')
            .getAttribute('src')
            .includes('Group14.png')
            && localStorage.getItem('token')
            && event.target.closest('.news__img-share')) {
            this.card
              .querySelector('.news__img-share')
              .setAttribute('src', '../../images/Group12.png');
            new MainApi('https://api.web.students.nomoreparties.space/articles')
              .createArticle(
                this.keyword,
                this.title,
                this.text,
                this.date,
                this.source,
                this.link,
                this.image,
              )
              .then((res) => {
                const articleId = res._id;
                this.articleId = articleId;
              });
          } else if (window.confirm('Действительно удалить статью из сохраненных?')) {
            new MainApi('https://api.web.students.nomoreparties.space/')
              .removeArticle(this.articleId);
            this.card
              .querySelector('.news__img-share')
              .setAttribute('src', '../../images/Group14.png');
          }
        }
      },
    };
    this.mouseOver = mouseOver;
    this.mouseOut = mouseOut;
    this.click = click;
  }

  setEventListeners() {
    this.card = this.createNews();
    this.container.appendChild(this.card);
    this.renderIcon();
    this._listeners.push(this.mouseOver, this.mouseOut, this.click);
    this._setListener(this._listeners);
  }
}

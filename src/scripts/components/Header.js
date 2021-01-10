import BaseComponent from './BaseComponent';
import toggle from '../utils/toggle';

const root = document.querySelector('.root');

export default class Header extends BaseComponent {
  constructor() {
    super();
  }

  render(props) {
    if (document.location.href.includes('articles.html')) {
      const usExit = root.querySelector('.menu__item-signin-text_articles');
      const title = root.querySelector('.header__title');
      usExit.textContent = `${props.name} [->`;
      title.textContent = `${props.name}${title.textContent}`;
    } else {
      const signIn = root.querySelector('.menu_signin-news');
      const signUp = root.querySelector('.menu_save-news');
      const usExit = root.querySelector('.menu__item-signin-text_signin');
      if (!props) {
        toggle(signUp, signIn);
      } else {
        toggle(signIn, signUp);
        usExit.textContent = `${props.name} [->`;
      }
    }

  }

  _setEventListeners() {
    const popupSignIn = root.querySelector('.popup_signin-block');
    const popupMobile = root.querySelector('.popup_mobile-320');
    const logo = {
      element: root.querySelector('.logo'),
      eventType: 'click',
      callback: () => {
        document.location.replace('./index.html');
      },
    };
    const main = {
      element: root.querySelector('.menu__item-main'),
      eventType: 'click',
      callback: () => {
        document.location.replace('./index.html');
      },
    };
    const mainIn = {
      element: root.querySelector('.menu__item-main_two'),
      eventType: 'click',
      callback: () => {
        document.location.replace('./index.html');
      },
    };
    const mainMobile = {
      element: root.querySelector('.menu__item-main-text_mobile'),
      eventType: 'click',
      callback: () => {
        document.location.replace('./index.html');
      },
    };
    const loggedIn = {
      element: root.querySelector('.menu__item-signin'),
      eventType: 'click',
      callback: () => {
        popupSignIn.setAttribute('style', 'display: flex');
      },
    };
    const loggedInMobile = {
      element: root.querySelector('.menu__item-signin_mobile'),
      eventType: 'click',
      callback: () => {
        popupMobile.setAttribute('style', 'display: none');
        popupSignIn.setAttribute('style', 'display: flex');
      },
    };
    const pageArticles = {
      element: root.querySelector('.menu__item-main_save'),
      eventType: 'click',
      callback: () => {
        document.location.replace('./articles.html');
      },
    };
    const pageArticlesMobile = {
      element: root.querySelector('.menu__item-main-text_mobile-two'),
      eventType: 'click',
      callback: () => {
        document.location.replace('./articles.html');
      },
    };
    const userExit = {
      element: root.querySelector('.menu__item-signin-text_signin'),
      eventType: 'click',
      callback: () => {
        localStorage.removeItem('token');
        this.render();
      },
    };
    const userExitArticles = {
      element: root.querySelector('.menu__item-signin-text_articles'),
      eventType: 'click',
      callback: () => {
        root.querySelector('.menu__item-signin-text_articles')
          .setAttribute('href', './index.html');
        localStorage.removeItem('token');
      },
    };
    this._listeners.push(
      logo,
      main,
      mainIn,
      loggedIn,
      pageArticles,
      userExit,
      loggedInMobile,
      mainMobile,
      pageArticlesMobile,
      userExitArticles,
    );
    this._setListener(this._listeners);
  }
}

new Header()._setEventListeners();

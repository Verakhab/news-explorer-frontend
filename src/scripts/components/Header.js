import BaseComponent from './BaseComponent';
import toggle from '../utils/toggle';

const root = document.querySelector('.root');

const a = {
  userName: 'Денис [->',
  isLoggedIn: true,
};

export default class Header extends BaseComponent {
  constructor(props) {
    super();
    this.userName = props.userName;
    this.isLoggedIn = props.isLoggedIn;
    this._setEventListeners();
  }

  render() {
    const signIn = root.querySelector('.menu_signin-news');
    const signUp = root.querySelector('.menu_save-news');
    const usExit = root.querySelector('.menu__item-signin-text_signin');
    if (this.isLoggedIn) {
      toggle(signIn, signUp);
      usExit.textContent = this.userName;
    } else toggle(signUp, signIn);
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
        document.location.replace('./articles.html');
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
    );
    this._setListener(this._listeners);
  }

  _clearEventListeners() {
    this._clearListener();
  }
}

const Head = new Header(a);

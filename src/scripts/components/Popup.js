import BaseComponent from './BaseComponent';

const root = document.querySelector('.root');

export default class Popup extends BaseComponent {
  constructor() {
    super();
    this.open();
    this.close();
    this.handleEscClose();
  }

  open() {
    const popupSignIn = root.querySelector('.popup_signin-block');
    const popupReg = root.querySelector('.popup_reg-block');
    const popupWelcome = root.querySelector('.popup_welcome-block');
    const popupMobile = root.querySelector('.popup_mobile-320');
    const popupError = root.querySelector('.popup_error-block');
    const openSignUpPopup = {
      element: root.querySelector('.popup__registration-link'),
      eventType: 'click',
      callback: () => {
        popupSignIn.setAttribute('style', 'display: none');
        popupReg.setAttribute('style', 'display: flex');
      },
    };
    const loggedInPopupReg = {
      element: root.querySelector('.popup__registration-link_in'),
      eventType: 'click',
      callback: () => {
        popupReg.setAttribute('style', 'display: none');
        popupSignIn.setAttribute('style', 'display: flex');
      },
    };
    const loggedInPopupWelcome = {
      element: root.querySelector('.popup__registration-succes'),
      eventType: 'click',
      callback: () => {
        popupWelcome.setAttribute('style', 'display: none');
        popupSignIn.setAttribute('style', 'display: flex');
      },
    };
    const openMobilePopup = {
      element: root.querySelector('.menu_signin-news-two'),
      eventType: 'click',
      callback: () => {
        popupMobile.setAttribute('style', 'display: flex');
      },
    };
    const openPopupError = {
      element: root.querySelector('.popup_error-block'),
      eventType: 'click',
      callback: () => {
        popupError.setAttribute('style', 'display: flex');
      },
    };
    this._listeners.push(
      openSignUpPopup,
      openMobilePopup,
      loggedInPopupReg,
      loggedInPopupWelcome,
      openPopupError,
    );
    this._setListener(this._listeners);
  }

  close() {
    const popupSignIn = root.querySelector('.popup');
    const popupReg = root.querySelector('.popup_reg-block');
    const popupWelcome = root.querySelector('.popup_welcome-block');
    const popupMobile = root.querySelector('.popup_mobile-320');
    const popupError = root.querySelector('.popup_error-block');
    const closePopupSignIn = {
      element: root.querySelector('.popup'),
      eventType: 'click',
      callback: (e) => {
        if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
          popupSignIn.setAttribute('style', 'display: none');
        }
      },
    };
    const closePopupReg = {
      element: root.querySelector('.popup_reg-block'),
      eventType: 'click',
      callback: (e) => {
        if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
          popupReg.setAttribute('style', 'display: none');
        }
      },
    };
    const closePopupWelcome = {
      element: root.querySelector('.popup_welcome-block'),
      eventType: 'click',
      callback: (e) => {
        if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
          popupWelcome.setAttribute('style', 'display: none');
        }
      },
    };
    const closePopupMobile = {
      element: root.querySelector('.popup_mobile-320'),
      eventType: 'click',
      callback: (e) => {
        if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
          popupMobile.setAttribute('style', 'display: none');
        }
      },
    };
    const closePopupError = {
      element: root.querySelector('.popup_error-block'),
      eventType: 'click',
      callback: (e) => {
        if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
          popupError.setAttribute('style', 'display: none');
        }
      },
    };
    this._listeners.push(
      closePopupSignIn,
      closePopupReg,
      closePopupWelcome,
      closePopupError,
      closePopupMobile,
    );
    this._setListener(this._listeners);
  }

  handleEscClose() {
    const popupSignIn = root.querySelector('.popup');
    const popupReg = root.querySelector('.popup_reg-block');
    const popupWelcome = root.querySelector('.popup_welcome-block');
    const popupMobile = root.querySelector('.popup_mobile-320');
    const popupError = root.querySelector('.popup_error-block');
    const closeEscPopup = {
      element: document,
      eventType: 'keyup',
      callback: (e) => {
        if (e.code === 'Escape') {
          popupSignIn.setAttribute('style', 'display: none');
          popupReg.setAttribute('style', 'display: none');
          popupWelcome.setAttribute('style', 'display: none');
          popupMobile.setAttribute('style', 'display: none');
          popupError.setAttribute('style', 'display: none');
        }
      },
    };
    this._listeners.push(closeEscPopup);
    this._setListener(this._listeners);
  }
}

const Pop = new Popup();

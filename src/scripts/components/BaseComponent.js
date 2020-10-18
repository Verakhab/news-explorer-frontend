const root = document.querySelector('.root');
const main = root.querySelector('.menu__item-main-text');
// const loggedIn = root.querySelector('.menu__item-signin');
// const saveArticles = root.querySelector('.menu__item-main_save');
// const usExit = root.querySelector('.menu__item-signin-text_signin');

export default class BaseComponent {
  constructor() {
    // this._addListener = this._addListener.bind(this);
    this._listeners = [
      {
        element: main,
        eventType: 'click',
        callback: (e) => {
          console.log(e);
          // if (e.target.classList.contains('menu__item-main')) {
          //   document.location.replace('./articles.html');
        },
      },
    ];
  }

  _addListener(element, eventType, callback) {
    const selector = element.getAttribute('class');
    const sel = document.querySelector(`.${selector}`);
    console.log(typeof  sel);
    sel.addEventlistener(eventType, callback);
  }

  _setListener(listeners) {
    listeners.forEach((listener) => {debugger;
      console.log(typeof listener.element);
      // const selector = listener.element.getAttribute('class');
      // console.log(selector);
      // console.log(root.querySelector(`.${selector}`));
      this._addListener(listener.element, listener.eventType, listener.callback);
    });
  }

  _clearListener() {
    this._listeners.forEach((listener) => {
      const { element, event, callback } = listener;
      element.removeEventListeners(event, callback);
    });
  }
}

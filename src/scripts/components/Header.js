import BaseComponent from './BaseComponent';
import toggle from '../utils/toggle';

const root = document.querySelector('.root');
const signIn = root.querySelector('.menu_signin-news');
const signUp = root.querySelector('.menu_save-news');
const usExit = root.querySelector('.menu__item-signin-text_signin');

const a = {
  userName: 'Денис [->',
  isLoggedIn: true,
};

export default class Header extends BaseComponent {
  constructor(props) {
    super();
    this.userName = props.userName;
    this.isLoggedIn = props.isLoggedIn;
  }

  render() {
    if (this.isLoggedIn) {
      toggle(signIn, signUp);
      usExit.textContent = this.userName;
    } else toggle(signUp, signIn);
  }

  _setEventListeners() {
    this._setListener(this._listeners);
  }
}

const Head = new Header(a);

Head.render();
Head._setEventListeners();

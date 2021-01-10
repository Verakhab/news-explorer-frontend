import BaseComponent from './BaseComponent';
import validButton from '../utils/validButton';
import MainApi from '../api/MainApi';
import Header from './Header';
import NewsApi from '../api/NewsApi';
import NewsArticle from './NewsArticle';

const root = document.querySelector('.root');
const popupSignIn = root.querySelector('.popup_signin-block');
const popupWelcome = root.querySelector('.popup_welcome-block');
const popupReg = root.querySelector('.popup_reg-block');

export default class Form extends BaseComponent {
  constructor() {
    super();
    this.popupSignIn = popupSignIn;
    this.popupReg = popupReg;
    this.popupWelcome = popupWelcome;
    this._validatorForm = this._validatorForm.bind(this);
  }

  setServerError(error) {
    const errorFormSignIn = root.querySelector('.popup__error_signin-form');
    errorFormSignIn.textContent = error;
    errorFormSignIn.setAttribute('style', 'display: flex');
    const errorFormReg = root.querySelector('.popup__error_user-is');
    errorFormReg.textContent = error;
    errorFormReg.setAttribute('style', 'display: flex');
  }

  _validateInputElement(input) {
    let error = '';
    if (!input.checkValidity()) {
      if (input.name === 'email' && !input.typeMismatch) {
        error = 'Здесь должен быть email';
      }
      if (input.validity.tooShort || input.validity.tooLong) {
        error = 'Не менее 2 и не более 30 символов';
      }
      if (input.validity.valueMissing) {
        error = 'Обязательное поле';
      }
    }
    if (input.nextElementSibling !== null) {
      input.nextElementSibling.textContent = error;
      input.nextElementSibling.setAttribute('style', 'display: flex');
    }
  }

  _validatorForm(e) {
    const formSignIn = document.forms.signin;
    const formSignUp = document.forms.reg;
    const buttonSubmitFormSignIn = validButton.bind(formSignIn);
    const buttonSubmitFormSignUp = validButton.bind(formSignUp);

    this._validateInputElement(e.target);
    buttonSubmitFormSignIn();
    buttonSubmitFormSignUp();
  }

  _clear() {
    const formSignIn = document.forms.signin;
    const formSignUp = document.forms.reg;
    formSignIn.reset();
    formSignUp.reset();
  }

  _getInfo() {
    const formSignIn = document.forms.signin;
    const emailSignIn = formSignIn.elements.email;
    const passSignIn = formSignIn.elements.pass;
    const formSignUp = document.forms.reg;
    const emailSignUp = formSignUp.elements.email;
    const passSignUp = formSignUp.elements.pass;
    const nameSignUp = formSignUp.elements.name;
    const arrInputInfo = [
      emailSignIn.value,
      passSignIn.value,
      emailSignUp.value,
      passSignUp.value,
      nameSignUp.value,
    ];
    return console.log(arrInputInfo);
  }

  _setEventListeners() {
    const formSignIn = document.forms.signin;
    const emailSignIn = formSignIn.elements.email;
    const passSignIn = formSignIn.elements.pass;
    const formSignUp = document.forms.reg;
    const emailSignUp = formSignUp.elements.email;
    const passSignUp = formSignUp.elements.pass;
    const nameSignUp = formSignUp.elements.name;
    const formSignInInput = {
      element: root.querySelector('.popup__form-signin'),
      eventType: 'input',
      callback: (e) => {
        if (e.target.classList.contains('popup__input_email')
            || e.target.classList.contains('popup__input_pass')) {
          this._validatorForm(e);
        }
      },
    };
    const formSignUpInput = {
      element: root.querySelector('.popup__form-reg'),
      eventType: 'input',
      callback: (e) => {
        if (e.target.classList.contains('popup__input_email-reg')
            || e.target.classList.contains('popup__input_pass-reg')
            || e.target.classList.contains('popup__input_name')) {
          this._validatorForm(e);
        }
      },
    };
    const formSignUpButton = {
      element: root.querySelector('.popup__button_reg'),
      eventType: 'click',
      callback: (e) => {
        e.preventDefault();
        const serverUrl = 'https://api.web.students.nomoreparties.space/';
        formSignUpButton.element.textContent = 'Загрузка...';
        const dataUser = {
          email: emailSignUp.value,
          password: passSignUp.value,
          name: nameSignUp.value,
        };
        const dataUserJson = JSON.stringify(dataUser);
        new MainApi(`${serverUrl}signup`)
          .signUp(dataUserJson)
          .then((res) => {
            if (!res.message) {
              formSignUpButton.element.textContent = 'Зарегистрироваться';
              this.popupReg.setAttribute('style', 'display: none');
              this.popupWelcome.setAttribute('style', 'display: flex');
              return res;
            }
            formSignUpButton.element.textContent = 'Зарегистрироваться';
            this.setServerError(res.message);
            return Promise.reject(res.message);
          });
      },
    };
    const formSignInButton = {
      element: root.querySelector('.popup__button_signin'),
      eventType: 'click',
      callback: (e) => {
        e.preventDefault();
        const serverUrl = 'https://api.web.students.nomoreparties.space/';
        formSignInButton.element.textContent = 'Загрузка...';
        const dataUser = {
          email: emailSignIn.value,
          password: passSignIn.value,
        };
        const dataUserJson = JSON.stringify(dataUser);
        new MainApi(`${serverUrl}signin`)
          .signIn(dataUserJson)
          .then((res) => {
            if (!res.message) {
              formSignInButton.element.textContent = 'Войти';
              this.popupSignIn.setAttribute('style', 'display: none');
              localStorage.setItem('token', res.token);
              new MainApi(`${serverUrl}users/me`)
                .getUserInfo()
                .then((data) => {
                  if (!res.message) {
                    new Header().render(data);
                    return data;
                  }
                  return Promise.reject(data.message);
                });
              return res;
            }
            formSignInButton.element.textContent = 'Войти';
            this.setServerError(res.message);
            return Promise.reject(res.message);
          });
      },
    };
    const formSerch = {
      element: root.querySelector('.header__button'),
      eventType: 'click',
      callback: (e) => {
        e.preventDefault();
        const formSearch = document.forms.search;
        const inputSearch = formSearch.elements.search;
        const inputError = root.querySelector('.header__form-error');
        if (!inputSearch.value) {
          root.querySelector('.header__button')
            .setAttribute('style', 'background-color: #2F71E5');
          inputError.textContent = 'Нужно ввести ключевое слово';
          inputError.setAttribute('style', 'display: flex');
        } else {
          root.querySelector('.header__button')
            .setAttribute('style', 'background-color: #2F71E5');
          inputError.textContent = '';
          inputError.setAttribute('style', 'display: none');
          root.querySelector('.popup__button.popup__button_result')
            .setAttribute('style', 'display: none');
          root.querySelector('.result__container')
            .textContent = '';
          root.querySelector('.result')
            .setAttribute('style', 'display: flex');
          root.querySelector('.result__title')
            .setAttribute('style', 'display: none');
          root.querySelector('.preloader-block_no-result')
            .setAttribute('style', 'display: none');
          root.querySelector('.preloader-block')
            .setAttribute('style', 'display: flex');
          new NewsApi()
            .getNews(inputSearch.value)
            .then((res) => {
              if (res.totalResults) {
                root.querySelector('.result')
                  .setAttribute('style', 'display: flex');
                root.querySelector('.result__title')
                  .setAttribute('style', 'display: flex');
                root.querySelector('.preloader-block')
                  .setAttribute('style', 'display: flex');
                const allCards = () => {
                  this.articles = res.articles;
                  const articlesCount = 3;
                  let articlesArray = [];
                  if (res.articles.length > articlesCount) {
                    articlesArray = res.articles.splice(0, articlesCount);
                    root.querySelector('.popup__button.popup__button_result')
                      .setAttribute('style', 'display: inline-block');
                  } else {
                    articlesArray = res.articles;
                    root.querySelector('.popup__button_result')
                      .setAttribute('style', 'display: none');
                  }
                  articlesArray.forEach((item) => {
                    new NewsArticle(
                      item.urlToImage,
                      item.publishedAt,
                      item.title,
                      item.url,
                      item.description,
                      item.source.name,
                      inputSearch.value,
                    ).createNews();
                  });
                };
                allCards();
                root.querySelector('.preloader-block')
                  .setAttribute('style', 'display: none');
              } else {
                root.querySelector('.preloader-block')
                  .setAttribute('style', 'display: none');
                root.querySelector('.preloader-block_no-result')
                  .setAttribute('style', 'display: flex', 'margin-top: 1vh');
              }
            });
        }
      },
    };
    const moreSerch = {
      element: root.querySelector('.popup__button_result'),
      eventType: 'click',
      callback: (e) => {
        e.preventDefault();
        const formSearch = document.forms.search;
        const inputSearch = formSearch.elements.search;
        let articlesCount = 3;
        const articlesView = articlesCount;
        const moreCards = () => {
          let articlesArray = [];
          if (this.articles.length > articlesCount) {
            articlesArray = this.articles.splice(articlesCount, articlesView);
          } else {
            root.querySelector('.popup__button_result')
              .setAttribute('disabled', true);
          }
          articlesArray.forEach((item) => {
            new NewsArticle(
              item.urlToImage,
              item.publishedAt,
              item.title,
              item.url,
              item.description,
              item.source.name,
              inputSearch.value,
            ).createNews();
            articlesCount = +3;
          });
        };
        moreCards();
      },
    };
    this._listeners.push(formSignInInput,
      formSignUpInput,
      formSignUpButton,
      formSignInButton,
      formSerch,
      moreSerch);
    this._setListener(this._listeners);
  }
}

new Form()._setEventListeners();

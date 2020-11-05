import BaseComponent from './BaseComponent';
import validButton from '../utils/validButton';
import MainApi from '../api/MainApi';

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
    this._setEventListeners();
  }

  setServerError() {
    const errorEmailSignIn = root.querySelector('.popup__error_signin-email');
    errorEmailSignIn.textContent = '11';
    errorEmailSignIn.setAttribute('style', 'display: flex');
    const errorPassSignIn = root.querySelector('.popup__error_signin-pass');
    errorPassSignIn.textContent = '22';
    errorPassSignIn.setAttribute('style', 'display: flex');
    const errorFormSignIn = root.querySelector('.popup__error_signin-form');
    errorFormSignIn.textContent = '33';
    errorFormSignIn.setAttribute('style', 'display: flex');
    const errorEmailReg = root.querySelector('.popup__error_email-reg');
    errorEmailReg.textContent = '11';
    errorEmailReg.setAttribute('style', 'display: flex');
    const errorPassReg = root.querySelector('.popup__error_pass-reg');
    errorPassReg.textContent = '22';
    errorPassReg.setAttribute('style', 'display: flex');
    const errorNameReg = root.querySelector('.popup__error_name-reg');
    errorNameReg.textContent = '33';
    errorNameReg.setAttribute('style', 'display: flex');
    const errorFormReg = root.querySelector('.popup__error_user-is');
    errorFormReg.textContent = '44';
    errorFormReg.setAttribute('style', 'display: flex');
  }

  _validateInputElement(input) {
    let error = '';
    if (!input.checkValidity()) {
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
    return emailSignIn.value,
      passSignIn.value,
      emailSignUp.value,
      passSignUp.value,
      nameSignUp.value;
  }

  _setEventListeners() {
    const formSignIn = document.forms.signin;
    const emailSignIn = formSignIn.elements.email;
    const passSignIn = formSignIn.elements.pass;
    const formSignUp = document.forms.reg;
    const emailSignUp = formSignUp.elements.email;
    const passSignUp = formSignUp.elements.pass;
    const nameSignUp = formSignUp.elements.name;
    const formSigninInput = {
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
        const serverUrl = process.env.NODE_ENV === 'development'
          ? 'http://api.web.students.nomoreparties.co/' : 'https://api.web.students.nomoreparties.co/';
        root.querySelector('.popup__button_reg').textContent = 'Загрузка...';
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
              root.querySelector('.popup__button_reg').textContent = 'Зарегистрироваться';
              this.popupReg.setAttribute('style', 'display: none');
              this.popupWelcome.setAttribute('style', 'display: flex');
              return console.log(res);
            }
            root.querySelector('.popup__button_reg').textContent = 'Зарегистрироваться';
            return Promise.reject(res.message);
          });
      },
    };
    const formSignIpButton = {
      element: root.querySelector('.popup__button_signin'),
      eventType: 'click',
      callback: (e) => {
        e.preventDefault();
        const serverUrl = process.env.NODE_ENV === 'development'
          ? 'https://api.web.students.nomoreparties.co/' : 'https://api.web.students.nomoreparties.co/';
        root.querySelector('.popup__button_signin').textContent = 'Загрузка...';
        const dataUser = {
          email: emailSignIn.value,
          password: passSignIn.value,
        };
        const dataUserJson = JSON.stringify(dataUser);
        new MainApi(`${serverUrl}signin`)
          .signIn(dataUserJson)
          .then((res) => {
            if (!res) {
              root.querySelector('.popup__button_signin').textContent = 'Войти';
              this.popupSignIn.setAttribute('style', 'display: none');
              this.token = res;
              new MainApi(`${serverUrl}users/me`).getUserInfo();
              return this.token;
            }
            root.querySelector('.popup__button_signin').textContent = 'Войти';
            return Promise.reject(res);
          });
      },
    };
    this._listeners.push(formSigninInput, formSignUpInput, formSignUpButton, formSignIpButton);
    this._setListener(this._listeners);
  }
}

const F = new Form();

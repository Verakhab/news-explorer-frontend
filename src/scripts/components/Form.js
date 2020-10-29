import BaseComponent from './BaseComponent';
import validButton from '../utils/validButton';

const root = document.querySelector('.root');

export default class Form extends BaseComponent {
  constructor() {
    super();
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
    const emailSignIn = formSignIn.elements.email.value;
    const passSignIn = formSignIn.elements.pass.value;
    const formSignUp = document.forms.reg;
    const emailSignUp = formSignUp.elements.email.value;
    const passSignUp = formSignUp.elements.pass.value;
    const nameSignUp = formSignUp.elements.name.value;
    return emailSignIn, passSignIn, emailSignUp, passSignUp, nameSignUp;
  }

  _setEventListeners() {
    const formSigninInput = {
      element: document.querySelector('.popup__form-signin'),
      eventType: 'input',
      callback: (e) => {
        if (e.target.classList.contains('popup__input_email')
            || e.target.classList.contains('popup__input_pass')) {
          this._validatorForm(e);
        }
      },
    };
    const formSignUpInput = {
      element: document.querySelector('.popup__form-reg'),
      eventType: 'input',
      callback: (e) => {
        if (e.target.classList.contains('popup__input_email-reg')
            || e.target.classList.contains('popup__input_pass-reg')
            || e.target.classList.contains('popup__input_name')) {
          this._validatorForm(e);
        }
      },
    };
    this._listeners.push(formSigninInput, formSignUpInput);
    this._setListener(this._listeners);
  }
}

const F = new Form();

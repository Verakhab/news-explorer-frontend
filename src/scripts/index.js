import '../styles/css/main.css';
import Header from './components/Header';
import Popup from './components/Popup';
import Form from './components/Form';
import MainApi from './api/MainApi';

const infoUser = {
  email: 'sds@ds.ru',
  password: '11111',
  name: 'den',
};

const infoJson = JSON.stringify(infoUser);

const signUp = new MainApi('http://api.diploma.students.nomoreparties.co/signup').signUp(infoJson);

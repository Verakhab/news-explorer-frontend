import '../styles/css/main.css';
import Header from './components/Header';
import Popup from './components/Popup';
import Form from './components/Form';
import MainApi from './api/MainApi';

new MainApi('http://api.web.students.nomoreparties.co/me');
//     return Promise.reject(res.message);
// });

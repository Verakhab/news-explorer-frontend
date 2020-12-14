import '../styles/css/main.css';
import Header from './components/Header';
import Popup from './components/Popup';
import Form from './components/Form';
import MainApi from './api/MainApi';
import BaseComponent from './components/BaseComponent';
import checkToken from './utils/checkToken';
import NewsApi from './api/NewsApi';
import NewsArticle from './components/NewsArticle';

checkToken();

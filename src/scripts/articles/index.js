import '../../styles/css/articles.css';
import NewsArticle from '../components/NewsArticle';
import Header from '../components/Header';
// import Popup from './components/Popup';
// import Form from './components/Form';
import MainApi from '../api/MainApi';
// import BaseComponent from '../components/BaseComponent';
import checkToken from '../utils/checkToken';
// import NewsApi from './api/NewsApi';

checkToken();

new MainApi('https://api.web.students.nomoreparties.space/articles')
  .getArticles()
  .then((res) => {
    res.forEach((item) => {
      new NewsArticle(
        item.image,
        item.date,
        item.title,
        item.link,
        item.text,
        item.source,
        item.keyword,
        item._id,
      ).createNews();
      const rrr = (resArr) => {
        const subTitle = document.querySelector('.header__subtitle');
        subTitle.textContent = `По ключевым словам: ${resArr[0].keyword}
        , ${resArr[resArr.length - 1].keyword} и ${resArr.length - 2} другим`;
      };
      rrr(res);
    });
  });

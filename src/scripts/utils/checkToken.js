import Header from '../components/Header';
import MainApi from '../api/MainApi';

const checkToken = () => {
  if (localStorage.getItem('token')) {
    new MainApi('https://api.web.students.nomoreparties.space/users/me')
      .getUserInfo()
      .then((res) => {
        new Header().render(res);
      });
  }
};

export default checkToken;

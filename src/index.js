import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './redux/store';
import { axiosInstance } from './config';
import QrcodeView from './QrcodeView';
import './style.css'
import QrcodeViewChiquvchi from './QrcodeViewChiquvchi';

// headerga tokenni qo'shib berish (faqat oddiy foydalanuvchilar uchun)
axiosInstance.interceptors.request.use(
  config => {
    let token = JSON.parse(localStorage.getItem('user'));

    if (token) {
      config.headers['Authorization'] = "Bearer " + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// tokenni vaqti
axiosInstance.interceptors.response.use(
  config => {
    return config;
  },
  error => {
    // console.log(error);
    if (JSON.parse(localStorage.getItem("user"))) {
      let decoded = jwtDecode(JSON.parse(localStorage.getItem("user")));
      if (decoded.exp * 1000 < Date.now()) {
        let role = JSON.parse(decoded.supperAdmin)?.userRoles[0]?.systemName;
        console.log(role)
        if (role !== "base_admin") {
          localStorage.removeItem("user"); //storage dan o'chirish
          window.location.replace("/");
          axiosInstance.post("auth/logOut", {
            id: JSON.parse(localStorage.getItem("ids")),
          })
        } else {
          localStorage.removeItem("user"); //storage dan o'chirish
          window.location.replace("/login");
        }
      }
    }

    if (error.response.status === 500) {
      window.location.replace("/page-not-found-500");
    }
    return Promise.reject(error);
  }
);

console.log(`/view/scanner/qrcode/${window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]}`);

ReactDOM.render(
  window.location.pathname === `/view/scanner/qrcode/${window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]}` ?
    <QrcodeView /> :
    window.location.pathname === `/outgoing/api/v1/missive/qrcode/${window.location.pathname.split('/')[window.location.pathname.split('/').length - 2]}/${window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]}` ?
      <QrcodeViewChiquvchi /> :
      <Provider store={store}>
        <App />
      </Provider >,
  document.getElementById('root')
)



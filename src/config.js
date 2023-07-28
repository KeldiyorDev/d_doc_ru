import axios from "axios";
// import store from './context/AuthContext';
import store from './redux/store';

export const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_KIRUVCHI_URL_LOCAL,
  baseURL: process.env.REACT_APP_KIRUVCHI_URL_GLOBAL,
  headers: { Authorization: "Bearer " + store.getState()?.user.insta.user }
});

export const axiosInstanceFq = axios.create({
  // baseURL: process.env.REACT_APP_FQ_URL_LOCAL,
  baseURL: process.env.REACT_APP_FQ_URL_GLOBAL,
  headers: { Authorization: "Bearer " + store.getState()?.user.insta.user }
});

export const axiosInstanceOut = axios.create({
  // baseURL: process.env.REACT_APP_OUT_URL_LOCAL,
  baseURL: process.env.REACT_APP_OUT_URL_GLOBAL,
  headers: { Authorization: "Bearer " + store.getState()?.user.insta.user }
});

export const axiosInstanceKadr = axios.create({
  // baseURL: process.env.REACT_APP_KADRLAR_URL_LOCAL,
  baseURL: process.env.REACT_APP_KADRLAR_URL_GLOBAL,
  headers: { Authorization: "Bearer " + store.getState()?.user.insta.user }
});

// export const url = process.env.REACT_APP_FILES_URL_LOCAL;
// export const urlFq = process.env.REACT_APP_FILES_URL_FQ_LOCAL;
// export const urlOut = process.env.REACT_APP_FILES_URL_OUT_LOCAL;
// export const urlKadr = process.env.REACT_APP_FILES_URL_KADRLAR_LOCAL;
export const url = process.env.REACT_APP_FILES_URL_GLOBAL;
export const urlFq = process.env.REACT_APP_FILES_URL_FQ_GLOBAL;
export const urlOut = process.env.REACT_APP_FILES_URL_OUT_GLOBAL;
export const urlKadr = process.env.REACT_APP_FILES_URL_KADRLAR_GLOBAL;

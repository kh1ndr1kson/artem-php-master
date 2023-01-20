import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;
const actualAuth = () => btoa(`${localStorage.getItem('login')}:${localStorage.getItem('password')}`);

const API = axios.create({
  baseURL,
  headers: {
    'Authorization': `Basic ${btoa(actualAuth())}`
  }
})

API.interceptors.request.use(
  config => {
    config.headers.authorization = `Basic ${btoa(localStorage.getItem('login') + ':' + localStorage.getItem('password'))}`;
    return config;
  },
  error => Promise.reject(error)
);

API.interceptors.response.use((resp) => {
  return resp;
}, async (error) => {
  if (error.response.status === 401) {
    error.config.headers.Authorization = `Basic ${btoa(localStorage.getItem('login') + ':' + localStorage.getItem('password'))}`;
  }
  return Promise.reject(error)
});

export default API;

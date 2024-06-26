// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://191.101.234.241:3000', // A base URL da sua API
 //  baseURL: 'http://localhost:3000'
});

api.interceptors.request.use(
  config => {
    const sessionToken = sessionStorage.getItem('@Authfirebase:token');
    console.log(sessionToken)
    if (sessionToken) {
      config.headers.Authorization = `Bearer ${sessionToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;

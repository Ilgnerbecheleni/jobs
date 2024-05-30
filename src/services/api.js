// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // A base URL da sua API
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

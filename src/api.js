import axios from 'axios';

const api = axios.create({
  baseURL: 'https://student-be-eta.vercel.app/api',
});

export default api;

import axios from 'axios';
require('dotenv').config();

const api = axios.create({
  baseURL: process.env.BACKEND_API_BASE_URL,
});

export default api;

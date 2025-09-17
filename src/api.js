import axios from 'axios';

// Use Vite env variable
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
});

export default api;
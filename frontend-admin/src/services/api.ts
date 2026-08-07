import axios from 'axios';

// Determine the API base URL cleanly
// In dev: proxy to local backend
// In prod: point to the Render-hosted backend
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:5000/api'
    : 'https://portfolio-backend-5y1o.onrender.com/api');

// Strip any trailing slashes so axios path joining works correctly
const baseURL = BASE_URL.replace(/\/+$/, '');

console.info('[admin] API baseURL:', baseURL);

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

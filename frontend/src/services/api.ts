import axios from 'axios';

const PROD_BACKEND = 'https://portfolio-backend-5y1o.onrender.com/api';
const DEV_BACKEND  = 'http://localhost:5000/api';

function resolveBaseURL(): string {
  if (import.meta.env.DEV) return DEV_BACKEND;

  let envVal = (import.meta.env.VITE_API_URL ?? '').trim();
  
  // Clean up potential markdown link or bracket formatting
  const match = envVal.match(/\[?(https?:\/\/[^\]\)]+)\]?/);
  if (match) {
    envVal = match[1];
  }

  try {
    const parsed = new URL(envVal);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return envVal.replace(/\/+$/, '');
    }
  } catch {
    // fall through
  }

  return PROD_BACKEND;
}

const baseURL = resolveBaseURL();

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

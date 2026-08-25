import axios from 'axios';

const PROD_BACKEND = 'https://portfolio-backend-5y1o.onrender.com/api';
const DEV_BACKEND  = 'http://localhost:5000/api';

/**
 * Resolve the API base URL safely.
 * - In development: use the local backend.
 * - In production: prefer VITE_API_URL only if it is a valid absolute HTTP(S) URL,
 *   otherwise fall back to the known Render backend URL.
 *   This guards against Vercel passing an empty string, a placeholder, or a
 *   wrongly-formatted value that would cause axios to build nonsense URLs.
 */
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
    // not a valid absolute URL – fall through
  }

  return PROD_BACKEND;
}

const baseURL = resolveBaseURL();

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

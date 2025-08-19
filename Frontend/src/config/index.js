// config/index.js
const isProd = import.meta.env.PROD;
//redeploy
// Use environment variables - never hardcode production URLs
export const API_URL = isProd 
  ? import.meta.env.VITE_PROD_API_URL
  : import.meta.env.VITE_DEV_API_URL || 'http://localhost:5000';

export const config = {
  apiUrl: API_URL,
  endpoints: {
    login: `${API_URL}/login`,
    register: `${API_URL}/register`,
    me: `${API_URL}/me`,
    update: `${API_URL}/update`,
    leaderboard: `${API_URL}/leaderboard`
  }
};
// config/index.js
const isProd = import.meta.env.PROD;
//redeploy
//redeploy v.2
//redeploy v.3
// Use environment variables - never hardcode production URLs

// console.log('🔍 Environment Variables:');
// console.log('- isProd:', isProd);
// console.log('- MODE:', import.meta.env.MODE);
// console.log('- VITE_DEV_API_URL:', import.meta.env.VITE_DEV_API_URL);
// console.log('- VITE_PROD_API_URL:', import.meta.env.VITE_PROD_API_URL);
// console.log('- All env vars:', import.meta.env);

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

// console.log('📋 Config:', config);
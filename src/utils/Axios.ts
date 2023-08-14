"use client"
import axios from 'axios';
import { getCookie } from 'cookies-next';

const Axios = axios.create({
  baseURL: 'YOUR_API_BASE_URL',
  // You can add other default configuration options here
});

Axios.interceptors.request.use((config) => {
  const token = getCookie('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default Axios;
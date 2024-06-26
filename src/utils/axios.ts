import axios from "axios";



const instance = axios.create({
  // baseURL: 'http://localhost:8879/api',
  // baseURL: `${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_PORT}/api/`,
  baseURL: `http://localhost:3001/api/`,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`;
  return config;
},
  error => {
    console.log("ERRor", error)
    return Promise.reject(error);
  }
);

export {instance as axios}
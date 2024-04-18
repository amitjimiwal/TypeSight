/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
// import Cookies from 'js-cookie';
export const axiosClient=axios.create({
     baseURL: String(import.meta.env.VITE_APP_BACKEND_BASE_URL),
     withCredentials: true,
     headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': String(import.meta.env.VITE_APP_FRONTEND_BASE_URL),
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
     },
});
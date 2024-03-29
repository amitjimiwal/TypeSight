/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginData, ResultData, SingupData } from '@/types';
import axios from 'axios';
import Cookies from 'js-cookie';
class AxiosClient {
     private client;
     constructor() {
          this.client = axios.create({
               baseURL: String(import.meta.env.VITE_APP_BACKEND_BASE_URL),
               withCredentials: true,
               headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': String(import.meta.env.VITE_APP_FRONTEND_BASE_URL),
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    'cache-control': 'private',
                    'E-Tag': Cookies.get('auth_token'),
               },
          });
     }
     async post(url: string, content: LoginData | SingupData | ResultData) {
          try {
               const { data } = await this.client.post(url, content);
               return data;
          } catch (e: any) {
               if (import.meta.env.VITE_APP_ENV === "development") console.log(e.response.data);
               return e;
          }
     }
     async get(url: string) {
          try {
               const { data } = await this.client.get(url);
               return data;
          } catch (e: any) {
               if (import.meta.env.VITE_APP_ENV === "development") console.log(e.response.data);
               return e;
          }
     }
     async patch(url: string) {
          try {
               const { data } = await this.client.patch(url);
               return data;
          } catch (e: any) {
               if (import.meta.env.VITE_APP_ENV === "development") console.log(e.response.data);
               return e;
          }
     }
}
export const axiosClient = new AxiosClient();
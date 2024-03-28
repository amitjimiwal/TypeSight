import { LoginData, ResultData, SingupData } from '@/types';
import axios from 'axios';
class AxiosClient {
     client;
     constructor() {
          this.client = axios.create({
               baseURL: String(process.env.VITE_APP_BACKEND_BASE_URL),
               withCredentials: true,
               headers: {
                    'Content-Type': ['application/json', 'application/x-www-form-urlencoded'],
               },
          });
     }
     async post(url: string, content: SingupData | LoginData | ResultData) {
         try{
          const {data}=await this.client.post(url, content);
          return data;
         }catch(e){
              return e;
         }
     }
     async get(url: string) {
          try{
               const {data}=await this.client.get(url);
               return data;
          }catch(e){
               return e;
          }
     }
     async patch(url:string){
          try{
               const {data}=await this.client.patch(url);
               return data;
          }catch(e){
               return e;
          }
     }
}
export const axiosClient = new AxiosClient();
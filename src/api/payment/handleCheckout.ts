import { axiosClient } from "../axiosclient";

export default async function handleCheckout() {
     const response = await axiosClient.post('/pro/create-stripe-session');
     const { data } = response;
     return data.data.redirect_url;
}
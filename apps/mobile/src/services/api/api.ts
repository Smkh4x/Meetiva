import axios from "axios";

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.178:3000"  
})



export default api;


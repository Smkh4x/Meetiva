import axios from "axios";
import asyncStorage from '@/src/utils/storage'


const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL 
})

api.interceptors.request.use( async (config) => {

    const token = await asyncStorage.get_token();

    if(token){
        config.headers.authorization = `Bearer ${token}`;
    }
    
    return config
})


export default api;


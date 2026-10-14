import { io } from "socket.io-client";
import asyncStorage from '@/src/utils/storage'


const url = process.env.EXPO_PUBLIC_API_URL

export const socket = io(url, {
    autoConnect: false,
})

export const connect_Socket = async () => {
    const TOKEN = await asyncStorage.get_token();
    // console.log("token in socket ",TOKEN)

    socket.auth = {
        token: TOKEN ?? ""
    }

    socket.connect()
}


import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class asyncStorage {
    store_token = async (token:string) => {
        await AsyncStorage.setItem("token", token)
    }

    get_token = async () => {
        try {
            const result = await AsyncStorage.getItem("token")
            // console.log("result storage =>",result)
            return result;            
        } catch (error) {
            console.log(error)
        }

    }
}

export default new asyncStorage()
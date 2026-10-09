import AsyncStorage from '@react-native-async-storage/async-storage';

class asyncStorage {
    store_token = async (token:string) => {
        await AsyncStorage.setItem("token", token)
    }

    get_token = async () => {
        const result = await AsyncStorage.getItem("token")
        console.log("result storage =>",result)
        return result;
    }
}

export default new asyncStorage()
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    remove_token = async () => {
        const result = AsyncStorage.removeItem('token')
        console.log("remove token successfulyy , logout user",result)
    }
}

export default new asyncStorage()
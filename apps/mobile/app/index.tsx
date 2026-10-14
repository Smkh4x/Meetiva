import { View, StyleSheet, Image } from 'react-native'
import { useEffect } from 'react'
import { darkColors } from '@/src/theme/colors'
import asyncStorage from '@/src/utils/storage'
import endpoints from '@/src/services/api/services'
import { router } from 'expo-router'
import axios from 'axios'


export default function index() {

  useEffect(() => {

    const waiting = async () => {

    const token = await asyncStorage.get_token()
    // console.log("im here in index screen")
      try {
        if(!token){
          router.push('/(auth)/onboarding');
          return;
        }
        // console.log("index: step 1")
        if(token) {

          await new Promise(resolve => setTimeout(resolve, 2000));

          // console.log("index: step 2")

            const result = await endpoints.me(token);

            // console.log("index: step 3")

              if(result.success){
                router.replace('/(tabs)/discover')
              }
            }
                 
        }catch  (err:any) {

            if(axios.isAxiosError(err)){

              const message = err.response?.data;

              if(message === "Invalid or expired token")  {
                router.push('/(auth)/login')
              }
                console.log("[-] 001",message)
            }
        }
  }
  waiting();
}, [])

  return (
    <View style={style.container}>

      <Image
      source={require('../assets/images/Meetiva-logo.png')}
      style={{width: 200, height: 200}} 
      
      />

    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkColors.background

  }
})
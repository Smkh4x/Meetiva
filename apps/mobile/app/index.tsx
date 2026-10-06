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
      try {
        if(!token){
          router.push('/(auth)/onboarding');
          return;
        }
        if(token) {

          await new Promise(resolve => setTimeout(resolve, 2000));

            const result = await endpoints.me(token);

              if(result.success){
                router.replace('/(tabs)/discover')
              }
            }
                 
        }catch  (err:any) {

            if(axios.isAxiosError(err)){

              const message = err.response?.data?.message;

              if(message === "Invalid or expired token")  {
                router.push('/(auth)/login')
              }
                console.log(message)
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
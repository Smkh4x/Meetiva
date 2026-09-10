import { View, Text, StyleSheet, Image } from 'react-native'
import {router} from 'expo-router'
import { useEffect } from 'react'
import { darkColors } from '@/src/theme/colors'


export default function index() {
  useEffect(() => {
    const waiting = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.replace('/(auth)/onboarding')
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
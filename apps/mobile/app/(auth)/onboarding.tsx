import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Button from '@/src/components/ui/Button'
import { darkColors } from '@/src/theme/colors'
import { router, Router } from 'expo-router'



export default function onboarding() {
  return (
<View style={style.conatiner}>

    <View style={{gap: 20}}>
        <Button 
        text_button="Create Account"
        containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: darkColors.accent, 
            width: '100%',
            height: 50, 
            borderRadius: 10
        }}
        onpress={() => {
            router.navigate('/(auth)/register')
        }}
        TextStyle={
            {
            color: darkColors.text.primary,
            fontSize: 18,
            fontWeight: 'bold'
        }
        }
        
        />
        <Button 
        text_button="I have an account"
        containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: darkColors.primary,
            width: '100%',
            height: 50,
            borderRadius: 10
            }}
        onpress={() => {
            router.replace("/(auth)/login")
        }}
        TextStyle={{
            color: darkColors.text.primary,
            fontSize: 18,
            fontWeight: 'bold'
        }}
        />        
    </View>

    <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: darkColors.text.secondary, fontSize: 14, textAlign: 'center'}}>
            By signing up, you agree to our Terms of Service and
        </Text>
        <Text style={{color: darkColors.text.secondary, fontSize: 14, textAlign: 'center'}}>
            Privacy Policy
        </Text>
    </View>
  

</View>
  )
}

const style = StyleSheet.create({
    conatiner: {
        flex: 1,
        gap: 30,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: darkColors.background

    }
})
import { View, Text, StyleSheet, Image, BackHandler } from 'react-native'
import React from 'react'
import Button from '@/src/components/ui/Button'
import { darkColors } from '@/src/theme/colors'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';



export default function onboarding() {
  return (
<SafeAreaView style={style.conatiner}>

    <View style={style.header}>
        <Image style={style.Image} source={require('../../assets/images/Meetiva-logo.png')}/>
        <Text style={{color: "white", fontSize: 12}}>Meet people. Inspire minds. Create value. Advance together</Text>
    </View>

    <View style={style.cards}>
        <View></View>

    </View>


    <View style={{gap: 20, marginBottom: 40}}>
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
  

</SafeAreaView>
  )
}

const style = StyleSheet.create({
    conatiner: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: darkColors.background

    },
    header: {
        flex: 1,
        alignItems: "center",
    },
    Image: {
        width: 100,
        height: 100,
    },
    cards: {
        flex: 1,
        justifyContent: "center",
    }
})
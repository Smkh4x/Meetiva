import { View, Text, StyleSheet, Image } from 'react-native'
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

    <View style={style.cardsContainer}>
        <View style={[style.card, style.centerCard]}>
            <Image
            source={require('../../assets/images/peo1.jpg')}
            resizeMode="cover"
            style={style.cardImage}
            />
        </View>
        <View style={[style.card, style.leftCard]}>
            <Image
            source={require('../../assets/images/peo2.jpg')}
            resizeMode="cover"
            style={style.cardImage}
            />
        </View>
        <View style={[style.card, style.rigthCard]}>
            <Image
            source={require('../../assets/images/peo3.jpg')}
            resizeMode="cover"
            style={style.cardImage}
            />
        </View>

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
            router.navigate('/(auth)/EmailScreen')
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
            router.push("/(auth)/login")
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
    cardsContainer: {
    height: 480,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    },
    card: {
    width: 140,
    height: 210,
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333', 
    position: 'absolute',
    overflow: 'hidden'
    },
    leftCard: {
        transform: [
            {translateX: -60},
            {rotate: '-15deg'}
        ],
        zIndex: 1

    },
    rigthCard: {
        transform: [
            {translateX: 60},
            {rotate: '15deg'}
        ],
        zIndex: 1
        
    },
    centerCard: {
        zIndex: 2,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,

    },
    cardImage: {
    width: '100%',
    height: '100%',
    }
})
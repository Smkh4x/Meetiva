import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { darkColors } from '@/src/theme/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '@/src/components/ui/Input'
import { useState } from 'react'
import Button from '@/src/components/ui/Button'
import { router } from 'expo-router'

export default function EmailScreen() {
    const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.container1}>

        <View style={styles.container2}>
            <Text style={styles.text}>Welcome to Meetiva</Text>
            <Text style={styles.text1}>Enter your email to continue</Text>
        </View>

        <View>
            <Text style={styles.text2}>Email</Text>
            <Input
            placeholder='your_email@example.com'
            value={email}
            setValue={setEmail}
            keyboard='email-address'
            />         
        </View>

        <View>
            <Button
            text_button='Contunue'
            containerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: darkColors.primary,
                width: '100%',
                height: 50,
                borderRadius: 10
            }}
            TextStyle={{
                color: darkColors.text.primary,
                fontSize: 14,
                fontWeight: 'bold'
            }}
            onpress={
                () => router.push("/(auth)/VerificationScreen")
            }
            />
        </View>

        <View style={{alignItems: "center"}}>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.text1}>Already have an account ? </Text>
                <Text onPress={() => router.push('/(auth)/login')} style={{color: "white", fontWeight: "bold"}}>Sign in </Text>                
            </View>

        </View>

        <View style={styles.button}>
            <TouchableOpacity
            style={styles.button_style}
            onPress={() => console.log("Continue with Google")} // button continue with google 
            >
            <Image
                source={require("@/assets/google.png")}
                style={{ width: 20, height: 20 }}
            />
            <Text style={styles.text_button}>Continue with Google</Text>
            </TouchableOpacity>
            
            <Text style={{color: "white", fontWeight: "300", fontSize: 12}}>
                By continue your agree to our Terms of Service and Privacy Policy
            </Text>
        </View>


        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: darkColors.secondary,
    paddingHorizontal: 20,
    padding: 40,
    gap: 20
    
  },
  container2: {
    gap: 4,
  },
  text: {
    fontWeight: "bold",
    fontSize: 26,
    color: "white"
  },
  text1: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "300",
    marginBottom: 12
  },
  text2: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "300",
    marginBottom: 12
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 30,
    gap: 20,
    alignItems: "center"
  },
  button_style: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    height: 50,
    borderRadius: 10,
    gap: 10,
  },
  text_button: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    }

})
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import { darkColors } from '@/src/theme/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '@/src/components/ui/Input'
import { useState } from 'react'
import Button from '@/src/components/ui/Button'
import { router } from 'expo-router'
import endpoints from '@/src/services/api/services'
import useRegistrationStore from '@/src/store/auth.store'
import { ActivityIndicator } from 'react-native'
import { z } from 'zod'
import axios from 'axios'


const codeShema = z
  .string("please enter 6 digit")
  .min(6).max(6)

export default function VerificationScreen() {
  const [code, setCode] = useState("") // state inpute numbers
  const email = useRegistrationStore((state) => state.email) // get email in the store
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

      const handle_button = async () => {
        setError("")
        const validation = codeShema.safeParse(code)

        if(!validation.success){
          setError(validation.error.issues[0].message)
          return;        
        }

        setLoading(true)
        try {
            const result = await endpoints.verifiaction_code(email, code);

            console.log("result =>", result)

            router.push('/(auth)/UsernameScreen')
            
          } catch (err: any) {
            if(axios.isAxiosError(err)){
              const message = err.response?.data?.message

              setError(message ?? "Something went wrong")

            } else {
              setError("[+] Something went wrong");
            }
          }finally {
            setLoading(false)
              
            }
      }
  return (
    <SafeAreaView style={styles.container1}>

        <View style={styles.container2}>
            <Text style={styles.text}>verification code</Text>
            <Text style={styles.text1}>We send a 6 - digit verification code to your email adress.</Text>
        </View>

        <View>
            <Text style={styles.text2}>Enter the code to continue</Text>
            <Input
            container={[styles.input_Container, error && styles.input_Error]}
            placeholder='000000'
            value={code}
            maxLength={6}
            setValue={(text) => {
              setCode(text);
              setError("")
            }}
            keyboard='numeric'
            />
            {error && (
              <Text style={{color: 'red'}}>{error}</Text>
            )}      
        </View>

        <View>
            <Button
            text_button={
              loading? <ActivityIndicator/> : "Continue"
            }
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
            onpress={handle_button}
            />
        </View>

        <View style={{alignItems: "center"}}>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.text1}>Didn't receive the code ? </Text>
                <Text onPress={
                  async () => {
                    try {
                      await endpoints.send_verfication_code(email);
                    } catch (error) {
                      
                    }
                    
                  }
                } style={{color: "white", fontWeight: "bold"}}>resend code </Text>                
            </View>

        </View>

        <View style={styles.button}>
            
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
    },
    input_Container: {
    backgroundColor: darkColors.surface,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 12
  },
  input_Error: {
    backgroundColor: darkColors.surface,
    height: 50,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 14,
}

})
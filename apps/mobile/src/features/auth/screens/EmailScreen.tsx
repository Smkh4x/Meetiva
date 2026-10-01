import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { darkColors } from '@/src/theme/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '@/src/components/ui/Input'
import Button from '@/src/components/ui/Button'
import { router } from 'expo-router'
import endpoints from '@/src/services/api/services'
import useRegistrationStore from '@/src/store/auth.store'
import { ActivityIndicator } from "react-native";
import { useState } from 'react'
import { z } from "zod";
import axios from "axios";

  const emailShema = z
  .string()
  .email("Invalid email")
  .endsWith("@gmail.com", "Only Gmail addresses are allowed");

function EmailScreen() {

  const email = useRegistrationStore((state) => state.email);
  const setEmail = useRegistrationStore((state) => state.setEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handle_button = async () => {
    setError("")
    const validation = emailShema.safeParse(email)

    if (!validation.success) {
        setError(validation.error.issues[0].message);
        return;
    }
      setLoading(true)

      try {
            const result = await endpoints.send_verfication_code(email);

            console.log("result =>",result);

            router.push('/(auth)/VerificationScreen');
        }

      catch(error: any) {

      if (axios.isAxiosError(error)) {

        const message = error.response?.data?.message;

        setError(message ?? "Something went wrong");
      }else {
        setError("Something went wrong");
      }
      }finally {
        setLoading(false);
      } 
    }
  return (
    <SafeAreaView style={styles.container1}>
        <View style={styles.container2}>
            <Text style={styles.text}>Welcome to Meetiva</Text>
            <Text style={styles.text1}>Enter your email to continue</Text>
        </View>

        <View>
          <Text style={styles.text2}>Email</Text>
            <Input
            container={[styles.input_Container, error && styles.input_Error]}
            placeholder={"your_email@example.com"}
            value={email}
            setValue={(text)=>{
              setEmail(text);
              setError("")
            }}
            keyboard='email-address'
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
            onpress={
              handle_button
              // () => router.push("/(auth)/VerificationScreen")
            }
            // onpress={
            //   () => router.push("/(auth)/VerificationScreen")
            // }
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
export default EmailScreen

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
  error: {
    color: 'red',
    paddingHorizontal: 12,
    fontWeight: 'regular',
    fontSize: 14,
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
},


})
import { View, Text, StyleSheet } from 'react-native'
import { darkColors } from '@/src/theme/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '@/src/components/ui/Input'
import { useState } from 'react'
import Button from '@/src/components/ui/Button'
import { z } from "zod"
import useRegistrationStore from '@/src/store/auth.store'
import { router } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import endpoints from '@/src/services/api/services'
import axios from "axios";

const userNameShema = z
  .string()
  .max(20, "Username must be at most 20 characters")
  .min(3, "Username must be at least 3 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
  .refine((val) => !/^\d+$/.test(val), {
    message: "Username cannot consist of numbers only",
  });

export default function UsernameScreen() {
  
  const userName = useRegistrationStore((state) => state.userName);
  const setUserName = useRegistrationStore((state) => state.setUserName);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handle_button = async () => {
    setError("")

    const validation = userNameShema.safeParse(userName)
      
        if(!validation.success){
          setError(validation.error.issues[0].message);
          return;
        }

          setLoading(true)

    try {
      const result = await endpoints.verification_username(userName);

      if(result.data.success == false){
        console.log(result.data)
      }
      else if(result.data.success == true){
        console.log("here 1")
        router.push('/(auth)/AgeScreen')
      }
      // console.log(result.data.success)
      
    } catch (err: any) {

      if(axios.isAxiosError(err)){
        const message = err.response?.data?.message;
        setError(message ?? "Something went wrong")
      }
 
    } finally {
        setLoading(false)
    }



      // router.push('/(auth)/AgeScreen')

  }

  return (
    <SafeAreaView style={styles.container1}>

        <View style={styles.container2}>
            <Text style={styles.text}>Choose a username</Text>
            <Text style={styles.text1}>This is how other will see you on Meetiva.</Text>
        </View>

        <View>
            <Text style={styles.text2}>Username</Text>
            <Input
            container={[styles.input_Container, error && styles.input_Error]}
            placeholder='Enter a username'
            value={userName}
            setValue={(text) => {
              setUserName(text)
              setError("")
            }}
            keyboard='default'
            />
            {error && (
              <Text style={{color: "red"}}>{error}</Text>
          )}     
        </View>

        <View>
            <Button
            text_button={loading ? <ActivityIndicator/> : "Next"}
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
            }
            />
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
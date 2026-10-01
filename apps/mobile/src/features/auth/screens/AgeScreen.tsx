import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { darkColors } from '@/src/theme/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '@/src/components/ui/Input'
import Button from '@/src/components/ui/Button'
import { router } from 'expo-router'
import { useState } from 'react'
import { number, z } from 'zod'
import useRegistrationStore from '@/src/store/auth.store'

const shemaAge = z
  .coerce
  .number()
  .min(18, "Meetiva is for people aged 18 and over.")
  .max(100)
  
export default function AgeScreen() {

  const age = useRegistrationStore((state) => state.age);
  const setAge = useRegistrationStore((state) => state.setAge);
  const [error, setError] = useState("")

  const handle_button = () => {
    setError("")

    const validation = shemaAge.safeParse(age)

    if(!validation.success){
      setError(validation.error.issues[0].message);
      return;
    }
    router.push('/(auth)/PasswordScreen')

  }

  return (
   <SafeAreaView style={styles.container1}>

        <View style={styles.container2}>
            <Text style={styles.text}>How old are you ?</Text>
            <Text style={styles.text1}>Meetiva is for people 18 old.</Text>
        </View>

        <View>
            <Text style={styles.text2}>age</Text>
            <Input
            container={[styles.input_Container, error && styles.input_Error]}
            placeholder='0'
            value={age}
            setValue={(text) => {
              setAge(text);
              setError("")
            }}
            keyboard='numeric'
            maxLength={2}
            />
            {error && (
              <Text style={{color: 'red'}}>{error}</Text>
            )}
        </View>

        <View>
            <Button
            text_button='Next'
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
            onpress={ //router.push('/(auth)/PasswordScreen')
  handle_button}
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
},

})
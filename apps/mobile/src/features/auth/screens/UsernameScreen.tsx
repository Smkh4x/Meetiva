import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { darkColors } from '@/src/theme/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '@/src/components/ui/Input'
import { useState } from 'react'
import Button from '@/src/components/ui/Button'
import { router } from 'expo-router'

export default function UsernameScreen() {
  const [username, setUsername] = useState("")
  return (
    <SafeAreaView style={styles.container1}>

        <View style={styles.container2}>
            <Text style={styles.text}>Choose a username</Text>
            <Text style={styles.text1}>This is how other will see you on Meetiva.</Text>
        </View>

        <View>
            <Text style={styles.text2}>Username</Text>
            <Input
            placeholder='Enter a username'
            value={username}
            setValue={setUsername}
            keyboard='default'
            />         
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
            onpress={
                () => router.push('/(auth)/AgeScreen')
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
    }

})
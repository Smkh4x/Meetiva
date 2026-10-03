import { ActivityIndicator, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '@/src/components/ui/Input'
import Button from '@/src/components/ui/Button'
import { darkColors } from '@/src/theme/colors'
import { router } from 'expo-router'
import endpoints from '@/src/services/api/services'
import axios from 'axios'


export default function Login() {

  const [loading, setLoading] = useState(false)
  const [identifier, setIdentifier] = useState("")
  const [password, setPassowrd] = useState("")
  const [error, setError] = useState("")

  const payload = {identifier, password}

  const handle_button = async () => {
    // console.log(payload)
    setError("")
    setLoading(true)
    try {

      const result = await endpoints.login(payload) // login identifier
      if(!result.data){
        setLoading(false)
        return;
      }
      router.replace('/(tabs)/discover')

      // console.log("[+] token : ",result.data) return token
      
    } catch (err) {
      if(axios.isAxiosError(err)){
        const message = err.response?.data?.data.message;
        setError(message ?? "m3rfnax had error fin hhhhhhhhhh")
      }
      
    }finally{
      setLoading(false)
    }
   
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in with your email or username</Text>
      </View>

      <View>
        <Text style={styles.label}>Email or username</Text>
        <Input
          container={styles.input}
          placeholder="Enter your email or username"
          value={identifier}
          setValue={(text) => {
            setIdentifier(text);
            setError("")
          }}
        />
        {error && (
          <Text style={{color: "red"}}>{error}</Text>
        )}
      </View>

      <View>
        <Text style={styles.label}>Password</Text>
        <Input
          container={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          setValue={(text) => {
            setPassowrd(text)
            setError("")
          }}

        />
                {error && (
          <Text style={{color: "red"}}>{error}</Text>
        )}
        <Text style={styles.forgotPassword}>Forgot password?</Text>
        
      </View>

      <Button
        text_button={loading ? <ActivityIndicator color={darkColors.text.primary} size="small" /> : 'Sign in'}
        containerStyle={styles.button}
        TextStyle={styles.buttonText}
        onpress={handle_button}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity
          style={styles.footerAction}
          onPress={
            () => {
              router.push('/(auth)/EmailScreen')
            }
          }
        >
          <Text style={styles.footerActionText}>Create account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkColors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 20,
  },
  header: {
    gap: 4,
  },
  title: {
    color: darkColors.text.primary,
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitle: {
    color: darkColors.text.primary,
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 12,
  },
  label: {
    color: darkColors.text.primary,
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 12,
  },
  input: {
    backgroundColor: darkColors.surface,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  forgotPassword: {
    color: darkColors.text.primary,
    fontSize: 13,
    textAlign: 'right',
    marginTop: 12,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkColors.primary,
    width: '100%',
    height: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: darkColors.text.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  footerText: {
    color: darkColors.text.primary,
    fontSize: 14,
  },
  footerAction: {
    justifyContent: 'center',
  },
  footerActionText: {
    color: darkColors.text.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
})
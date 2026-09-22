import { View, KeyboardTypeOptions, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { darkColors } from '@/src/theme/colors'

interface userInput {
    placeholder?: string,
    value?: string,
    setValue?: (value: string) => void,
    keyboard?: KeyboardTypeOptions
    
}
export default function Input({ placeholder, value, setValue, keyboard }:userInput) {
  return (
    <View style={styles.container}>
      <TextInput
      style={styles.text}
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
      keyboardType={keyboard}
      
      />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: darkColors.surface,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        paddingHorizontal: 12
    },
    text: {
        fontWeight: "200",
        color: 'white'
    }
})
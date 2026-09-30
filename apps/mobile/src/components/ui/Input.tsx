import { View, KeyboardTypeOptions, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { darkColors } from '@/src/theme/colors'

interface userInput {
    placeholder?: string,
    value?: string,
    setValue?: (value: string) => void,
    keyboard?: KeyboardTypeOptions,
    container?: any,
    maxLength?: number
    
}
export default function Input({ placeholder, value, setValue, keyboard, container, maxLength }:userInput) {
  return (
    <View >
      <TextInput
      style={container}
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      onChangeText={setValue}
      keyboardType={keyboard}
      
      />
    </View>
  )
}
const styles = StyleSheet.create({

    text: {
        fontWeight: "200",
        color: 'white'
    }
})
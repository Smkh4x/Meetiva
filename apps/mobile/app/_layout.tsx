import { Stack } from 'expo-router'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function _layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)/onboarding" options={{ headerShown: false }} /> 
      </Stack>      
    </GestureHandlerRootView>

  )
}
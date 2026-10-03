import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function discover() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>discover</Text>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24

  }
})
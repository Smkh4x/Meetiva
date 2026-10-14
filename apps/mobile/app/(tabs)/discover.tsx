import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Flag } from 'lucide-react-native'
import Button from '@/src/components/ui/Button'
// import { CameraControlButton, MicrophoneControlButton } from '../../src/components/ui/MediaControlButtons'
import { darkColors } from '@/src/theme/colors'
import { mediaDevices } from 'react-native-webrtc';
import { router } from 'expo-router'


export default function Discover() {

  const button_handle = async () => {
    try {
      console.log("[+] => here in frontend discover")
      const stream = await mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      // console.log(stream)
      if(stream){
        router.push('/(tabs)/matches')
      }
      // return permetion
      // console.log("cemera and microphone is done")
    } catch (err) {
      console.log("Error accessing media devices:", err);
      
    }

  }
  return (
    <LinearGradient
      colors={['#39B7F3', '#168FEA', '#0878E4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(52, 199, 255, 0.18)', 'rgba(37, 169, 246, 0.02)', 'rgba(4, 94, 216, 0.12)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.controls}>
          <Button
            text_button="Start video chatting"
            containerStyle={styles.startButton}
            TextStyle={styles.startButtonText}
            onpress={
              button_handle
            }
          />

          {/* <View style={styles.mediaControls}>
            <MicrophoneControlButton />
            <CameraControlButton />
          </View> */}

          <TouchableOpacity
            accessibilityLabel="Report"
            accessibilityRole="button"
            activeOpacity={0.9}
            style={styles.reportButton}
          >
            <Text style={styles.reportText}>Report</Text>
            <Flag color="#FF5F69" size={19} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  controls: {
    marginTop: 'auto',
    paddingHorizontal: 22,
    paddingBottom: 136,
    gap: 22,
  },
  startButton: {
    height: 62,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#65C9F5',
  },
  startButtonText: {
    color: darkColors.text.primary,
    fontSize: 18,
    fontWeight: '400',
  },
  mediaControls: {
    flexDirection: 'row',
    gap: 16,
  },
  reportButton: {
    height: 62,
    borderRadius: 12,
    backgroundColor: '#65C9F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  reportText: {
    color: '#FF5F69',
    fontSize: 17,
    fontWeight: '800',
  },
})
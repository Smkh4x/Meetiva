import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Code2, Lightbulb, LogOut, Palette, Sparkles, Users, Video } from 'lucide-react-native'
import Button from '@/src/components/ui/Button'
import { mediaDevices } from 'react-native-webrtc';
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import Reanimated, {
cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { connect_Socket, socket } from '@/src/services/socket/socket'
import asyncStorage from '@/src/utils/storage'
import { push } from 'expo-router/build/global-state/routing'


function AuroraBand({
  top,
  height,
  duration,
  phaseOffset,
  rotation,
  opacity,
}: {
  top: `${number}%`
  height: `${number}%`
  duration: number
  phaseOffset: number
  rotation: `${number}deg`
  opacity: number
}) {
  const phase = useSharedValue(phaseOffset)

  useEffect(() => {
    phase.value = withRepeat(
      withTiming(phaseOffset + Math.PI * 2, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      false,
    )

    return () => cancelAnimation(phase)
  }, [duration, phase, phaseOffset])

  const animatedStyle = useAnimatedStyle(() => {
    const angle = phase.value

    return {
      opacity: opacity * (0.86 + Math.sin(angle) * 0.14),
      transform: [
        { translateX: Math.sin(angle) * 66 },
        { translateY: Math.cos(angle * 2) * 17 },
        { rotate: rotation },
      ],
    }
  })

  return (
    <Reanimated.View
      pointerEvents="none"
      style={[styles.auroraBand, { top, height }, animatedStyle]}
    >
      <LinearGradient
        colors={[
          'rgba(42,84,236,0)',
          'rgba(42,84,236,0.78)',
          'rgba(22, 160, 214, 0.9)',
          'rgba(164, 195, 218, 0.78)',
          'rgba(39, 158, 255, 0)',
        ]}
        locations={[0, 0.27, 0.52, 0.76, 1]}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 1, y: 0.7 }}
        style={StyleSheet.absoluteFill}
      />
    </Reanimated.View>
  )
}

function AuroraBackground() {
  return (
    <View pointerEvents="none" style={styles.auroraBackground}>
      <AuroraBand top="-24%" height="72%" duration={18000} phaseOffset={0} rotation="-9deg" opacity={0.72} />
      <AuroraBand top="14%" height="72%" duration={22000} phaseOffset={2.1} rotation="12deg" opacity={0.58} />
      <AuroraBand top="52%" height="72%" duration={26000} phaseOffset={4.2} rotation="-4deg" opacity={0.48} />
    </View>
  )
}

export default function Discover() {
  const [onlineCount, setOnlineCount] = useState('')
  const image = '../../assets//images/Meetiva-logo.png'

    useEffect( () => {
      const connection_socket = async () => {
        await connect_Socket()

  socket.on('users:count', (data) => {
    console.log('[1 =>]',data)
    setOnlineCount(data)

  })

  socket.on("users:online", (data)=> {
        console.log('[2 =>]',data.length)
        setOnlineCount(data.length)
  });

  return () => {
    socket.off("users:count");
    socket.off("users:online");
  };

  }
  connection_socket()
  }, [])

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
      <AuroraBackground />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screen}>
          <View style={styles.topBar}>
            <View style={styles.onlineBadge}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineCount}>{onlineCount}</Text>
              <Text style={styles.onlineLabel}>online now</Text>
            </View>
              <TouchableOpacity style={styles.onlineBadge}
              onPress={() => {
                const remove = asyncStorage.remove_token()
                console.log(remove)
                router.push('/(auth)/login')
              }}
              >
                <LogOut color={'white'}/>
              </TouchableOpacity>
          </View>

          <View style={styles.hero}>
            <View style={styles.illustration} accessibilityElementsHidden>
              <View style={styles.outerOrbit} />
              <View style={styles.innerOrbit} />

              <LinearGradient
                colors={['#A2ECFF', '#51C7F5', '#20A8EA']}
                style={styles.centerOrb}
              >
                <View style={styles.orbSparkle}>
                  {/* <Sparkles color="#FFFFFF" size={27} strokeWidth={1.8} /> */}
                  <ImageBackground
                    source={require(image)}
                    style={{width: 55, height: 55}}
                  />
                </View>
                {/* <Text style={styles.orbLabel}>MEET</Text> */}
              </LinearGradient>
              

              <View style={[styles.interestNode, styles.codeNode]}>
                <Code2 color="#1478BD" size={21} strokeWidth={2.2} />
              </View>
              <View style={[styles.interestNode, styles.paletteNode]}>
                <Palette color="#1478BD" size={20} strokeWidth={2.2} />
              </View>
              <View style={[styles.interestNode, styles.ideaNode]}>
                <Lightbulb color="#1478BD" size={20} strokeWidth={2.2} />
              </View>
              <View style={styles.orbitDot} />
              <View style={styles.orbitDotSmall} />
            </View>

            <View style={styles.interestTags}>
              <View style={styles.interestTag}>
                <Code2 color="#D6F4FF" size={14} />
                <Text style={styles.interestText}>Tech</Text>
              </View>
              <View style={styles.interestTag}>
                <Palette color="#D6F4FF" size={14} />
                <Text style={styles.interestText}>Art</Text>
              </View>
              <View style={styles.interestTag}>
                <Lightbulb color="#D6F4FF" size={14} />
                <Text style={styles.interestText}>Ideas</Text>
              </View>
            </View>
          </View>

          <View style={styles.actions}>
            <Button
              text_button="Start video chatting"
              containerStyle={styles.startButton}
              TextStyle={styles.startButtonText}
              onpress={button_handle}
            />
            <View style={styles.permissionNote}>
              <Video color="rgba(255,255,255,0.72)" size={15} strokeWidth={2} />
              <Text style={styles.permissionText}>Camera and mic ready when you are</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  auroraBackground: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  auroraBand: {
    position: 'absolute',
    left: '-25%',
    width: '150%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 18,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  brandMark: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minHeight: 34,
    paddingHorizontal: 11,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    backgroundColor: 'rgba(4, 71, 138, 0.2)',
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#7EF4B2',
  },
  onlineCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  onlineLabel: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 11,
    fontWeight: '500',
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  illustration: {
    width: 230,
    height: 218,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  outerOrbit: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 1,
    borderColor: 'rgba(218, 246, 255, 0.32)',
    backgroundColor: 'rgba(255,255,255,0.035)',
  },
  innerOrbit: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: 'rgba(218, 246, 255, 0.24)',
  },
  centerOrb: {
    width: 116,
    height: 116,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-8deg' }],
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.65)',
    shadowColor: '#07559A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.26,
    shadowRadius: 20,
    elevation: 9,
  },
  orbSparkle: {
    width: 48,
    height: 48,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    transform: [{ rotate: '8deg' }],
  },
  orbLabel: {
    color: '#FFFFFF',
    marginTop: 5,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2.5,
  },
  interestNode: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -23,
    marginLeft: -23,
    width: 46,
    height: 46,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    shadowColor: '#064D88',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 5,
  },
  codeNode: {
    top: 47 * 3,
    left: 28,
    transform: [{ rotate: '-10deg' }],
    zIndex: 3,
  },
  paletteNode: {
    top: 15,
    right: 10,
    transform: [{ rotate: '9deg' }],
    zIndex: 2,
  },
  ideaNode: {
    bottom: 15,
    left: 68 * 3,
    transform: [{ rotate: '8deg' }],
    zIndex: 1,
  },
  orbitDot: {
    position: 'absolute',
    top: 25,
    right: 48,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#B7F1FF',
  },
  orbitDotSmall: {
    position: 'absolute',
    bottom: 25,
    right: 27,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  eyebrow: {
    color: '#BDEEFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.7,
    textAlign: 'center',
    marginBottom: 9,
  },
  headline: {
    maxWidth: 330,
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 39,
    fontWeight: '800',
    letterSpacing: -0.8,
    textAlign: 'center',
  },
  description: {
    maxWidth: 320,
    color: 'rgba(255,255,255,0.82)',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 10,
  },
  interestTags: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  interestTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  interestText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  actions: {
    gap: 10,
  },
  startButton: {
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#034E91',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 13,
    elevation: 5,
    top: -10 * 2
  },
  startButtonText: {
    color: '#0878C8',
    fontSize: 17,
    fontWeight: '800',
  },
  permissionNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  permissionText: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 11,
    fontWeight: '500',
  },
})
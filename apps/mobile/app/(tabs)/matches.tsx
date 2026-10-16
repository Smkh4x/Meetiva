import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LogOut } from 'lucide-react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { CameraControlButton, MicrophoneControlButton } from '../../src/components/ui/MediaControlButtons'
import { darkColors } from '../../src/theme/colors'
import { mediaDevices,
  MediaStream,
  RTCView,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription
} from 'react-native-webrtc'
import { useEffect, useState, useRef } from 'react'
import { router } from 'expo-router'
import { connect_Socket, socket } from '@/src/services/socket/socket'
import MatchingSwipe, {type MatchData} from '../video-call/MatchingSwipe'
import endpoints from '@/src/services/api/services'


export default function Matches() {

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const [name, setName] = useState("")
  // const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const [matchdata, setMatchData] = useState<MatchData | null>(null)
  // const [loadcamera, setLoadCamera] = useState(true)

  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const get_profile = async () => {

      const profile = await endpoints.me();
      setName(profile.data?.userName)

    }
    const start_Camera = async () => {
      try {

        const camera_data = await mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        
        setStream(camera_data)

      } catch (error) {

        console.warn('Camera or microphone access is unavailable', error)

      }
    }
    get_profile() // get userName
    start_Camera()

  }, [])
  
// console.log("[+]test if match data jat f prop mn card => ",matchdata)
useEffect(() => {
  if (!matchdata || !stream) return;

  const pc_user = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });
  peerConnection.current = pc_user;

  const pendingCandidates: RTCIceCandidateInit[] = [];
  let remoteDescSet = false;

  stream.getTracks().forEach((track) => {
    pc_user.addTrack(track, stream);
  });

  pc_user.onicecandidate = (event: any) => {
    if (!event.candidate) return;
    socket.emit("webrtc:ice-candidate", {
      roomId: matchdata.roomId,
      candidate: event.candidate.toJSON(),
    });
  };

  pc_user.ontrack = (event: any) => {
    const [stream0] = event.streams;
    if (stream0) setRemoteStream(stream0);
  };

  const flushPending = async () => {
    while (pendingCandidates.length) {
      const c = pendingCandidates.shift()!;
      try {
        await pc_user.addIceCandidate(new RTCIceCandidate(c));
      } catch (err) {
        console.warn("addIceCandidate (pending) failed", err);
      }
    }
  };

  // ghadi nsifto offer
  const handlePeerReady = async (data: { roomId: string; fromSocketId: string }) => {
    if (data.roomId !== matchdata.roomId || data.fromSocketId !== matchdata.socketId) return;
    try {
      const offer = await pc_user.createOffer({});
      await pc_user.setLocalDescription(offer);
      socket.emit("webrtc:offer", { roomId: matchdata.roomId, offer });
    } catch (err) {
      console.warn("createOffer failed", err);
    }
  };

  // jatna offer -> n-jawbo b answer
  const handleOffer = async (data: { roomId: string; offer: any; fromSocketId: string }) => {
    try {
      await pc_user.setRemoteDescription(new RTCSessionDescription(data.offer));
      remoteDescSet = true;
      await flushPending();

      const answer = await pc_user.createAnswer();
      await pc_user.setLocalDescription(answer);
      socket.emit("webrtc:answer", { roomId: matchdata.roomId, answer });
    } catch (err) {
      console.warn("handleOffer failed", err);
    }
  };

  // jatna answer
  const handleAnswer = async (data: { roomId: string; answer: any; fromSocketId: string }) => {
    try {
      await pc_user.setRemoteDescription(new RTCSessionDescription(data.answer));
      remoteDescSet = true;
      await flushPending();
    } catch (err) {
      console.warn("handleAnswer failed", err);
    }
  };

  // jatna ICE candidate
  const handleIceCandidate = async (data: { roomId: string; candidate: any; fromSocketId: string }) => {
    if (!remoteDescSet) {
      pendingCandidates.push(data.candidate);
      return;
    }
    try {
      await pc_user.addIceCandidate(new RTCIceCandidate(data.candidate));
    } catch (err) {
      console.warn("addIceCandidate failed", err);
    }
  };

  socket.on("webrtc:peer-ready", handlePeerReady);
  socket.on("webrtc:offer", handleOffer);
  socket.on("webrtc:answer", handleAnswer);
  socket.on("webrtc:ice-candidate", handleIceCandidate);

  socket.emit("webrtc:ready", { roomId: matchdata.roomId });

  return () => {
    socket.off("webrtc:peer-ready", handlePeerReady);
    socket.off("webrtc:offer", handleOffer);
    socket.off("webrtc:answer", handleAnswer);
    socket.off("webrtc:ice-candidate", handleIceCandidate);

    pc_user.close();
    setRemoteStream(null);

    if (peerConnection.current === pc_user) {
      peerConnection.current = null;
    }
  };
}, [stream, matchdata]);


  return (
    <View style={styles.screen}>

      <View style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 0,
            backgroundColor: 'rgba(22, 160, 214, 0.9)',
      }}>
        <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
        {remoteStream && (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}
            objectFit="cover"
            mirror={true}
          />
        )}   
        </View>
      </View>



        <LinearGradient
          colors={['rgba(7, 28, 42, 0.84)', 'rgba(7, 28, 42, 0.18)', 'transparent']}
          locations={[0, 0.55, 1]}
          style={styles.topShade}
          pointerEvents="none"
        />
        <LinearGradient
          colors={['transparent', 'rgba(7, 28, 42, 0.35)', 'rgba(7, 28, 42, 0.92)']}
          locations={[0, 0.38, 1]}
          style={styles.bottomShade}
          pointerEvents="none"
        />

        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <View style={styles.headerName}>
              <View style={styles.avatarInitial}>
                <Text style={styles.avatarInitialText}>K</Text>
              </View>
              <View>
                <Text style={styles.headerUsername}>{name}</Text>
                {/* <View style={styles.userIdBadge}>
                  <Text style={styles.userId}>ID 8F42-19B</Text>
                </View> */}
              </View>
            </View>
            <TouchableOpacity
              accessibilityLabel="Log out"
              accessibilityRole="button"
              style={styles.exitButton}
              onPress={() => {
                router.back()
              }}
            >
              <LogOut color={darkColors.primary} size={22} strokeWidth={2.6} />
            </TouchableOpacity>
          </View>
          <View style={styles.matchPrompt}>
            {/* <TouchableOpacity onPress={() => {
                       console.log("your socket id :",socket.id)
                       socket.emit("matching:start")
                       console.log("event send")
            }}><Text style={styles.promptText}>Swipe right to start matching</Text></TouchableOpacity> */}

            <MatchingSwipe inMatching={setMatchData}/>

          {/* <View style={styles.cameraplace}>
            <View style={{backgroundColor: "black"}}/>
          </View> */}
          </View>

          <View
            style={styles.selfVideo}
          >
              {stream && (
              <RTCView
                streamURL={stream.toURL()}
                style={{
                  width: "100%",
                  height: "100%",
                  
                }}
                  objectFit="cover"
                  mirror={true} // fix face user
              />
              )}

          </View>

          <View style={styles.mediaControls}>
            <MicrophoneControlButton
              enabled={mic}
              onPress={
                () => {
                  // mic == true ? setMic(false) : setMic(true)
                  if(mic == true){
                    setMic(false)
                    stream?.getAudioTracks().forEach(track => {
                      track.enabled = false;
                    });
                  } else {
                    setMic(true)
                    stream?.getAudioTracks().forEach(track => {
                      track.enabled = true;
                    });
                  }
                }
              }
              // mic ? true ( setMic(false)) : setMic(true)
              />
            <CameraControlButton
              enabled={camera}
              onPress={
                () => {
                  // camera == true ? setCamera(false): setCamera(true)
                  if(camera == true){
                    setCamera(false)
                    stream?.getVideoTracks().forEach(track => {
                      track.enabled = false;
                    });
                  } else {
                    setCamera(true)
                    stream?.getVideoTracks().forEach(track => {
                      track.enabled = true;
                    });
                  }
                }
              }
              
              />
          </View>
        </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#168FEA',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    alignSelf: 'stretch',
  },
  header: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 10,
  },
  headerName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  avatarInitial: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: darkColors.primary,
  },
  avatarInitialText: {
    color: darkColors.text.inverse,
    fontSize: 17,
    fontWeight: '800',
  },
  headerUsername: {
    color: darkColors.text.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  userId: {
    color: darkColors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  userIdBadge: {
    alignSelf: 'flex-start',
    marginTop: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(66, 185, 238, 0.5)',
    backgroundColor: 'rgba(7, 28, 42, 0.76)',
    shadowColor: darkColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.45,
    shadowRadius: 5,
    elevation: 4,
  },
  userBVideo: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: darkColors.card,
  },
  topShade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  bottomShade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 260,
  },
  matchPrompt: {
    flex: 1,
    // position: 'absolute',
    top: '-20%',
    // left: 0,
    // right: 0,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal: 20,
    // paddingVertical: 12,
    // transform: [{ translateY: -22 }],
  },

  promptText: {
    color: darkColors.text.secondary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  selfVideo: {
    position: 'absolute',
    right: 20,
    bottom: 104,
    width: 188,
    aspectRatio: 0.76,
    overflow: 'hidden',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: darkColors.accent,
    backgroundColor: darkColors.card,
  },
  selfVideoImage: {
    borderRadius: 18,
  },
  selfBadge: {
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 8,
    minHeight: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 9,
    borderRadius: 16,
    backgroundColor: 'rgba(44, 128, 184, 0.88)',
  },
  selfName: {
    flexShrink: 1,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  exitButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: darkColors.card,
    borderWidth: 1,
    borderColor: darkColors.primary,
  },
  mediaControls: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    height: 56,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    zIndex: 3,
  },
})
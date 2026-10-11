import { LinearGradient } from 'expo-linear-gradient';
import { Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from "react-native";

import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  withSpring
  } from 'react-native-reanimated';

import { Gesture, GestureDetector, } from 'react-native-gesture-handler';
import { useWindowDimensions } from "react-native";
import { useState, useCallback, useEffect } from 'react';
import { scheduleOnRN } from 'react-native-worklets';
import { socket, connect_Socket } from '@/src/services/socket/socket';


export default function MatchingSwipe() {

  const translateX = useSharedValue(0);
  
  const { width } = useWindowDimensions();
  const swap_left = width / 2; // width / 2 keeep swaping animation
  const swap_rigth = swap_left * -1; // swap left take width / 2 * -1 result negative number keep swaping animation

  const cards = ['User A', 'User B', 'User C', 'User D', 'User E', 'User F']; // mockap data example
  const [trackCards, setTrackCards] = useState(0) // track index start matchin users
  const [hasStarted, setHasStarted] = useState(false); // track if user start matching
  // const [loading, setLoading] = useState(false)

  const [isSearching, setIsSearching] = useState(false)
  const [matchedUser, setMatchedUser] = useState(null)

useEffect(() => {
  const handleMatched = (data:any) => {
    console.log("gggg")
    console.log("Matched user:", data);

    setMatchedUser(data.userId);
    console.log(data)
    setIsSearching(false);
  };

  socket.on("matching:matched", handleMatched);

  return () => {
    socket.off("matching:matched", handleMatched);
  };
}, []);

  const startMatching = useCallback(() => {
      console.log("step 0")
    setIsSearching(true)
    setMatchedUser(null);
      console.log("step 1")
    socket.emit("matching:start");
      console.log("step 2")
  },[])
  
  const nextCard = useCallback(() => {
    translateX.value = 0;
      setHasStarted(true)

      socket.on("matching:matched", (data) => {
        console.log("[+] data :",data.userId);
      });

    console.log("lavbobo")
    setTrackCards((index) => (index + 1) % cards.length)
  }, [translateX])

  const startCards = useCallback(() => {
    translateX.value = 0;
      setHasStarted(false)      
  },[translateX])

  const fingerTracker = Gesture.Pan().onUpdate((event) => {

    translateX.value = event.translationX

  }).onEnd(() => {
    if(translateX.value <= swap_rigth){
      translateX.value = withSpring(
        swap_rigth * 2,
        {},
        (finished) => {
          if(finished) {
            scheduleOnRN(nextCard);
            scheduleOnRN(startMatching) // start matching
          }
        }        
      )     
    }
else if(translateX.value >= swap_left){
      translateX.value = withSpring(
        swap_left * 2,
        {},
        (leftSwap) => {
          if(leftSwap){
            scheduleOnRN(startCards) 
          }        
        }
      )
    } else {
       translateX.value = withSpring(0)
    }
    
  })
  const cardStyle = useAnimatedStyle(() => ({
  transform: [
    { translateX: translateX.value },
  ],
}));

  return (
    <GestureDetector gesture={fingerTracker}>
      <Animated.View style={[styles.card, cardStyle]}>
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
          {!hasStarted ? (
    <Text>Swipe right to start chatting</Text>
  ) : (
    <Text>{matchedUser}</Text>
  )}
      </Animated.View>      
    </GestureDetector>

  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '140%',
    overflow: "hidden",
    backgroundColor: '#168FEA',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    top: -30
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
})
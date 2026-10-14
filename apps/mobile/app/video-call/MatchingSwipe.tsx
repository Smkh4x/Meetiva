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
import { socket } from '@/src/services/socket/socket';

/*

data :  {
"role": "send-offer", 
"roomId": "7d058631-efa5-44a0-9481-0171a5960902", 
"socketId": "xEUNX1hp1_pMUD7PAAAA", 
"userId": 1, 
"username": "youssef123"}

*/

export type MatchData = {
  userId: number,
  socketId: string,
  roomId: string,
  username: string,
  role: "send-offer" | "answer-offer"
}

type Props = {
  inMatching: (data: MatchData) => void;
  // onSwipeNext: () => void;
}

export default function MatchingSwipe({inMatching}: Props) {

  const translateX = useSharedValue(0);
  
  const { width } = useWindowDimensions();
  const swap_left = width / 2; // width / 2 keeep swaping animation
  const swap_rigth = swap_left * -1; // swap left take width / 2 * -1 result negative number keep swaping animationn
  const [hasStarted, setHasStarted] = useState(false); // track if user start matching


  const [isSearching, setIsSearching] = useState(false)
  const [matchedUser, setMatchedUser] = useState<any>(null)
 /*
  useEffect listen any answer from backend ,
  from example new data or new matched get and 
  set data in 'matchedUser' for example setMatchedUser(data.username)
  set username
  */
useEffect(() => {
  const handleMatched = (data: MatchData) => {

    inMatching(data)
    setIsSearching(true)
    setMatchedUser(data.username); // set some thing
    setIsSearching(false);

    //     console.log('[MATCH EVENT RECEIVED]', {
    //   roomId: data.roomId,
    //   role: data.role,
    //   username: data.username,
    // });

  };

  socket.on("matching:matched", handleMatched);
  
  return () => {
    socket.off("matching:matched", handleMatched);
  };
}, [inMatching]);

  const startMatching = useCallback(() => {
    setIsSearching(true) // loading 
    setMatchedUser(null); // remove any matched user kola next matched
    socket.emit("matching:start");
  },[])
  
  const nextCard = useCallback(() => {
    translateX.value = 0;
      setHasStarted(true)
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
        {/* <LinearGradient
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
          />  */}
    {!hasStarted 
        ? (<Text>Swipe right to start chatting</Text> )
        : isSearching 
        ? <ActivityIndicator color={'white'} size={50}/>
        : (<Text>{matchedUser}</Text> )
    }
      </Animated.View>      
    </GestureDetector>

  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '92%',
    overflow: "hidden",
    // backgroundColor: '#168FEA',
    // backgroundColor: '#219c58',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    top: 160
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
import { darkColors } from '@/src/theme/colors'
import { Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'

type ButtonProp = {
    text_button: string;
    containerStyle?: ViewStyle;
    TextStyle?: TextStyle;
    onpress?: () => void;
}

export default function Button({text_button, containerStyle, TextStyle, onpress}: ButtonProp) {
  return (
    <TouchableOpacity 
    style={containerStyle} 
    onPress={onpress}
    
    >
      <Text style={TextStyle}>
        {text_button}
        </Text>
    </TouchableOpacity>
  )
}

// const style = StyleSheet.create({
//     conatiner: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: darkColors.accent,
//         width: '100%',
//         height: 50,
//         borderRadius: 10
//     },
//     // text: {
//     //     color: darkColors.text.primary,
//     //     fontSize: 18,
//     //     fontWeight: 'bold'
//     // }
// })
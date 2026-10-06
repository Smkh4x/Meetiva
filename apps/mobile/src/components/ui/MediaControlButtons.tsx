import { Mic, MicOff, Video, VideoOff } from 'lucide-react-native'
import { StyleSheet, Text, TouchableOpacity, type GestureResponderEvent } from 'react-native'
import { darkColors } from '@/src/theme/colors'

type MediaControlButtonProps = {
    enabled: boolean
    onPress?: (event: GestureResponderEvent) => void
    disabled?: boolean
}

export function MicrophoneControlButton({ enabled, onPress, disabled = false }: MediaControlButtonProps) {
    return (
        <TouchableOpacity
            accessibilityLabel={enabled ? 'Turn microphone off' : 'Turn microphone on'}
            accessibilityRole="button"
            accessibilityState={{ checked: enabled, disabled }}
            activeOpacity={0.9}
            disabled={disabled}
            onPress={onPress}
            style={[styles.button, enabled && styles.enabledButton, disabled && styles.disabledButton]}
        >
            {enabled ? <Mic color={darkColors.accent} size={22} /> : <MicOff color={darkColors.text.muted} size={22} />}
            <Text style={styles.label}>{enabled ? 'Mic on' : 'Mic off'}</Text>
        </TouchableOpacity>
    )
}

export function CameraControlButton({ enabled, onPress, disabled = false }: MediaControlButtonProps) {
    return (
        <TouchableOpacity
            accessibilityLabel={enabled ? 'Turn camera off' : 'Turn camera on'}
            accessibilityRole="button"
            accessibilityState={{ checked: enabled, disabled }}
            activeOpacity={0.9}
            disabled={disabled}
            onPress={onPress}
            style={[styles.button, enabled && styles.enabledButton, disabled && styles.disabledButton]}
        >
            {enabled ? <Video color={darkColors.accent} size={22} /> : <VideoOff color={darkColors.text.muted} size={22} />}
            <Text style={styles.label}>{enabled ? 'Camera on' : 'Camera off'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        minHeight: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: darkColors.border,
        backgroundColor: darkColors.card,
    },
    enabledButton: {
        borderColor: darkColors.accent,
        backgroundColor: '#17494A',
    },
    disabledButton: {
        opacity: 0.55,
    },
    label: {
        color: darkColors.text.primary,
        fontSize: 14,
        fontWeight: '600',
    },
})
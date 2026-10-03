import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { darkColors } from '@/src/theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useEffect, useState } from 'react';
import Button from '@/src/components/ui/Button';
import { ChevronDown,ChevronUp } from 'lucide-react-native';
import useRegistrationStore from '@/src/store/auth.store';
import endpoints from '@/src/services/api/services'
import { router } from 'expo-router';
import { ActivityIndicator } from 'react-native'
import axios from 'axios';

interface Interests {
  id: number;
  interest: string;
}
export default function InterestsScreen() {

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableInterests, setAvailableInterests] = useState<Interests[]>([]) // from interest db 

  const setUser_interests = useRegistrationStore((state) => state.setUser_interests)

  const user_interests = useRegistrationStore((state) => state.user_interests) // select user

  const {email, userName, age, password} = useRegistrationStore();
  const payload = { email, userName, age: Number(age), password, user_interests}

  const get_interests = async () => {
    try {
      const result = await endpoints.get_interests()
      setAvailableInterests(result.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    get_interests();
    console.log(payload)
    console.log("db interests fiha => ",availableInterests) 
  },[])

    const handle_button = async () => {
    setLoading(true)
    try {

// console.log("EMAIL:", email, typeof email);
// console.log("USERNAME:", userName, typeof userName);
// console.log("AGE:", age, typeof age);
// console.log("PASSWORD:", password, typeof password);
// console.log("INTERESTS:", user_interests, user_interests.map(id => typeof id));

      const result = await endpoints.register(payload)
      console.log(result.data)
      router.replace('/(tabs)/discover')
    }catch (err) {
  if (axios.isAxiosError(err)) {
    console.log("STATUS:", err.response?.status);
    console.log("BACKEND RESPONSE:", err.response?.data);
  } else {
    console.log("ERROR:", err);
  }
}finally{
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container1}>
      <View style={styles.container2}>
        <Text style={styles.text}>What are your interests?</Text>
        <Text style={styles.text1}>
          Choose the things you love and we’ll help match you with people who share them.
        </Text>
      </View>

      <View style={styles.fieldWrap}>
        <Text style={styles.label}>Interests</Text>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.dropdownHeader}
          onPress={() => setIsOpen((change_boolean) => !change_boolean)}
        >
          <Text style={[styles.dropdownText, !user_interests.length && styles.placeholderText]}>
            {user_interests.length >= 0 ? `${user_interests.length} selected` : 'Select your interests'}
          </Text>

        {!isOpen && (
          <View style={[styles.chevronBox, isOpen && styles.chevronBoxOpen]}>
            <ChevronDown color={"white"} size={20}/>
          </View>           
        )}
        {isOpen && (
          <View style={[styles.chevronBox, isOpen && styles.chevronBoxOpen]}>
            <ChevronUp color={"white"} size={20}/>
          </View>
        )}
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.dropdownList}>
            {availableInterests.map((interest) => {
              const selected = user_interests.includes(interest.id)
              return (
                <TouchableOpacity
                  key={interest.id}
                  activeOpacity={0.10}
                  onPress={()=> {
                    if(!selected){
                      setUser_interests([...user_interests, interest.id])
                      // console.log("first select => ",interests)
                    } else if (selected){
                      setUser_interests(
                        user_interests.filter((id) => id !== interest.id)
                      )}
                  }}
                  style={[styles.optionRow]}
                >
                <Text style={[styles.optionText]}>
                  {interest.interest}
                </Text>
                {selected ? <Text style={styles.checkmark}>✓</Text> : <View style={styles.unselectedDot} />}

                </TouchableOpacity>
              )
          })}
          </View>
        )}
{/* <Text>{user_interests}</Text> */}
      </View>


      <View style={styles.buttonWrapper}>
        <Button
          text_button={
            loading? <ActivityIndicator/> : "Create account"
          }
          containerStyle={styles.primaryButton}
          TextStyle={styles.primaryButtonText}
          onpress={handle_button}
        />
      </View>

      <View style={styles.footerTextWrap}>
        <Text style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: darkColors.secondary,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 24,
  },
  container2: {
    gap: 8,
    marginBottom: 18,
  },
  text: {
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 34,
    color: darkColors.text.primary,
  },
  text1: {
    color: darkColors.text.secondary,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  fieldWrap: {
    marginBottom: 18,
  },
  label: {
    color: darkColors.text.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: darkColors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  dropdownText: {
    color: darkColors.text.primary,
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  placeholderText: {
    color: darkColors.text.secondary,
  },
  chevronBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  chevronBoxOpen: {
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  chevron: {
    color: darkColors.text.primary,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 18,
  },
  dropdownList: {
    marginTop: 10,
    backgroundColor: darkColors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  optionRowSelected: {
    backgroundColor: 'rgba(66, 185, 238, 0.15)',
  },
  optionText: {
    color: darkColors.text.primary,
    fontSize: 15,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: darkColors.text.primary,
  },
  checkmark: {
    color: darkColors.accent,
    fontSize: 18,
    fontWeight: '700',
  },
  unselectedDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 8,
  },
  chipText: {
    color: darkColors.text.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  removeButton: {
    marginLeft: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: darkColors.text.primary,
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '700',
  },
  buttonWrapper: {
    marginTop: 'auto',
    marginBottom: 14,
  },
  primaryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkColors.primary,
    width: '100%',
    height: 54,
    borderRadius: 14,
  },
  primaryButtonText: {
    color: darkColors.text.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  footerTextWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  footerText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 18,
  },
});
import { ForgotPasswordCard } from '@/components/forgot-password/ForgotPasswordCard';
import '@/global.css';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (phoneNumber: string) => {
    setIsLoading(true);

    // Simulate API request to send verification code
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Code Sent',
        `We texted you a verification code to (+84) ${phoneNumber}. Please verify your phone number.`,
        [
          {
            text: 'OK',
            onPress: () => router.replace('/sign-in'),
          },
        ]
      );
    }, 1500);
  };

  return (
    <SafeAreaView
      className='flex-1 bg-neutral-6'
      edges={['left', 'right', 'bottom']}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <ScrollView
          className='flex-1 bg-neutral-6'
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
        >
          {/* Container with exact gap of 24px from navigation header (top padding pt-[24px]) */}
          <View className='flex-1 px-6 pt-[24px] pb-[40px] items-center justify-start'>
            <ForgotPasswordCard onSend={handleSend} isLoading={isLoading} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

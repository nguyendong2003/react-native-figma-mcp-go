import { Button } from '@/components/Button';
import { InputField } from '@/components/InputField';
import { BiometricAuth } from '@/components/sign-in/BiometricAuth';
import { SignInIllustration } from '@/components/sign-in/SignInIllustration';
import '@/global.css';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email Validation regex
  const validateEmail = (val: string) => {
    if (!val) {
      setEmailError('Email is required');
      return false;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Password Validation
  const validatePassword = (val: string) => {
    if (!val) {
      setPasswordError('Password is required');
      return false;
    }
    if (val.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSignIn = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      setIsLoading(true);
      // Simulate API Sign-in call
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert('Success', `Signed in successfully as ${email}`);
      }, 1500);
    }
  };

  const handleBiometricAuth = () => {
    Alert.alert(
      'Biometric Sign In',
      'Mock: Triggering FaceID / TouchID scan...',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Success',
          onPress: () =>
            Alert.alert('Success', 'Biometric Authentication Succeeded!'),
        },
      ],
    );
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Mock: Redirecting to password reset flow...',
    );
  };

  const handleSignUp = () => {
    Alert.alert('Sign Up', 'Mock: Redirecting to sign up registration...');
  };

  // Enable button only if both fields are filled and have no current errors
  const canSubmit =
    email.length > 0 && password.length > 0 && !emailError && !passwordError;

  return (
    <SafeAreaView
      className='flex-1 bg-primary-1'
      edges={['left', 'right', 'bottom']}
    >
      {/* 15px Blue space under navigation bar (y=93 to y=108) */}
      <View className='h-[15px] bg-primary-1 w-full' />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <ScrollView
          className='flex-1 bg-primary-1'
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
        >
          {/* Main White Content Sheet */}
          <View className='flex-1 bg-neutral-6 rounded-t-[30px] px-6 pt-6 pb-8 shadow-card-1'>
            {/* Header Titles (Top padding is 24px, gap to subtitle is 4px) */}
            <View>
              <Text className='text-[24px] leading-[28px] font-poppins-semibold text-primary-1'>Welcome Back</Text>
              <Text className='text-[12px] leading-[16px] font-poppins-medium text-neutral-1 mt-[4px]'>
                Hello there, sign in to continue
              </Text>
            </View>

            {/* Central Padlock Illustration */}
            <SignInIllustration />

            {/* Form Fields */}
            <View className='w-full max-w-[420px] mx-auto'>
              <InputField
                placeholder='Text input'
                containerClassName='mb-[20px]'
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) validateEmail(text);
                }}
                onBlur={() => validateEmail(email)}
                error={emailError}
                keyboardType='email-address'
                autoComplete='email'
              />

              <InputField
                placeholder='Password'
                containerClassName='mb-0'
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) validatePassword(text);
                }}
                onBlur={() => validatePassword(password)}
                error={passwordError}
                secureTextEntry
                autoComplete='password'
              />

              {/* Forgot Password Link (12px top gap, 40px bottom gap) */}
              <Pressable
                onPress={handleForgotPassword}
                className='self-end mt-[12px] mb-[40px]'
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text className='text-[12px] leading-[16px] font-poppins-medium text-neutral-4 active:text-primary-1'>
                  Forgot your password ?
                </Text>
              </Pressable>

              {/* Sign In Button (24px bottom gap) */}
              <Button
                title='Sign in'
                onPress={handleSignIn}
                disabled={!canSubmit}
                isLoading={isLoading}
                className='w-full mb-[24px]'
              />

              {/* Biometric Scan Trigger */}
              <BiometricAuth
                onPress={handleBiometricAuth}
                className='mb-[24px]'
              />

              {/* Sign Up Footer Link */}
              <View className='flex-row justify-center items-center gap-[12px]'>
                <Text className='text-[12px] leading-[16px] font-poppins-regular text-neutral-1'>
                  {"Don't have an account? "}
                </Text>
                <Pressable
                  onPress={handleSignUp}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text className='text-[12px] leading-[16px] font-poppins-semibold text-primary-1 active:text-primary-2'>
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

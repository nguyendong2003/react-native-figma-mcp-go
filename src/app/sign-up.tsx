import { Button } from '@/components/Button';
import { InputField } from '@/components/InputField';
import { SignUpIllustration } from '@/components/signup/SignUpIllustration';
import '@/global.css';
import { router } from 'expo-router';
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

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Name Validation
  const validateName = (val: string) => {
    if (!val.trim()) {
      setNameError('Name is required');
      return false;
    }
    setNameError('');
    return true;
  };

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

  const handleSignUp = () => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isNameValid && isEmailValid && isPasswordValid && agreeTerms) {
      setIsLoading(true);
      // Simulate API Sign-up call
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert(
          'Success',
          `Account created successfully for ${name}! Please sign in.`,
          [
            {
              text: 'OK',
              onPress: () => router.replace('/sign-in'),
            },
          ],
        );
      }, 1500);
    }
  };

  const handleGoToSignIn = () => {
    router.replace('/sign-in');
  };

  // Enable button only if all fields are filled, terms accepted, and no current errors
  const canSubmit =
    name.trim().length > 0 &&
    email.length > 0 &&
    password.length > 0 &&
    agreeTerms &&
    !nameError &&
    !emailError &&
    !passwordError;

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
          <View className='flex-1 bg-neutral-6 rounded-t-[30px] px-6 pt-[23px] pb-[47px] shadow-card-1'>
            {/* Header Titles (Top padding is 24px, gap to subtitle is 4px) */}
            <View>
              <Text className='text-title-1 text-primary-1 tracking'>
                Welcome to us,
              </Text>
              <Text className='text-caption-2 text-neutral-1 mt-[5px] ml-[3px]'>
                Hello there, create New account
              </Text>
            </View>

            {/* Central Phone/Fingerprint Illustration */}
            <SignUpIllustration />

            {/* Form Fields */}
            <View className='w-full max-w-[420px] mx-auto'>
              {/* Name field (32px top gap, 20px bottom gap) */}
              <InputField
                placeholder='Name'
                containerClassName='mb-[20px]'
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (nameError) validateName(text);
                }}
                onBlur={() => validateName(name)}
                error={nameError}
                autoComplete='name'
              />

              {/* Email field (20px bottom gap) */}
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

              {/* Password field (20px bottom gap) */}
              <InputField
                placeholder='Password'
                containerClassName='mb-[20px]'
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) validatePassword(text);
                }}
                onBlur={() => validatePassword(password)}
                error={passwordError}
                secureTextEntry
                autoComplete='password-new'
              />

              {/* Terms and Conditions Checkbox (20px top gap, 32px bottom gap) */}
              <Pressable
                onPress={() => setAgreeTerms(!agreeTerms)}
                className='flex-row items-start gap-[12px] mb-[32px] w-full'
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <View
                  className={`w-6 h-6 rounded-[4px] border items-center justify-center ${
                    agreeTerms
                      ? 'bg-primary-1 border-primary-1'
                      : 'border-[#bfbfbf]'
                  }`}
                >
                  {agreeTerms && (
                    <View className='w-[10px] h-[6px] border-l-2 border-b-2 border-neutral-6 -rotate-45 -mt-0.5' />
                  )}
                </View>
                <View>
                  <Text className='text-[14px] leading-[16px] font-poppins-regular text-neutral-1 flex-1'>
                    {'By creating an account your aggree  '}
                    {/* <Text className='font-poppins-semibold text-primary-1'>
                    Terms and Conditions
                  </Text> */}
                  </Text>
                  <Text className='text-[14px] leading-[16px] font-poppins-regular text-neutral-1 flex-1 mt-[5px]'>
                    {'to our '}
                    <Text className='font-poppins-semibold text-primary-1 ml-[2px]'>
                      Term and Conditions
                    </Text>
                  </Text>
                </View>
              </Pressable>

              {/* Sign Up Button (32px bottom gap) */}
              <Button
                title='Sign up'
                onPress={handleSignUp}
                disabled={!canSubmit}
                isLoading={isLoading}
                className='w-full mb-[32px] mt-[3px]'
              />

              {/* Sign In Footer Link */}
              <View className='flex-row justify-center items-center gap-[12px]'>
                <Text className='text-[12px] leading-[16px] font-poppins-regular text-neutral-1'>
                  Have an account?
                </Text>
                <Pressable
                  onPress={handleGoToSignIn}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text className='text-[12px] leading-[16px] font-poppins-semibold text-primary-1 active:text-primary-2'>
                    Sign In
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

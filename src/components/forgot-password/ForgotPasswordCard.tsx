import { Button } from '@/components/Button';
import { InputField } from '@/components/InputField';
import { IconAssets } from '@/constants/assets';
import React, { useState } from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';

export interface ForgotPasswordCardProps {
  onSend: (phoneNumber: string) => Promise<void>;
  isLoading?: boolean;
}

export function ForgotPasswordCard({ onSend, isLoading = false }: ForgotPasswordCardProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  // Validate phone number: must be numbers only and at least 9 digits long
  const validatePhone = (val: string) => {
    const cleanVal = val.replace(/\D/g, '');
    if (!cleanVal) {
      setError('Phone number is required');
      return false;
    }
    if (cleanVal.length < 9) {
      setError('Please enter at least 9 digits');
      return false;
    }
    setError('');
    return true;
  };

  const handleTextChange = (text: string) => {
    // Keep only numbers
    const numericText = text.replace(/\D/g, '');
    setPhoneNumber(numericText);
    if (error) {
      validatePhone(numericText);
    }
  };

  const handleSend = () => {
    if (validatePhone(phoneNumber)) {
      onSend(phoneNumber);
    }
  };

  const handleSelectCountry = () => {
    Alert.alert(
      'Select Country',
      'Choose your country code',
      [
        { text: 'Vietnam (+84)', onPress: () => {} },
        { text: 'United States (+1)', onPress: () => {} },
        { text: 'Singapore (+65)', onPress: () => {} },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const isFormValid = phoneNumber.length >= 9 && !error;

  const CountryCodePrefix = () => (
    <Pressable
      onPress={handleSelectCountry}
      className='flex-row items-center h-full mr-1 active:opacity-60'
    >
      <Text className='text-[14px] leading-[21px] font-poppins-medium text-neutral-1'>
        (+84)
      </Text>
    </Pressable>
  );

  return (
    <View className='w-full max-w-[327px] mx-auto bg-neutral-6 rounded-[15px] p-4 shadow-card-2'>
      {/* 1. Label: Type your phone number (16px bottom gap to text field) */}
      <Text className='text-[12px] leading-[16px] font-poppins-semibold text-neutral-3 mb-[16px]'>
        Type your phone number
      </Text>

      {/* 2. Text field / default or active (24px bottom gap to subtitle description) */}
      <InputField
        placeholder='0398829xxx'
        value={phoneNumber}
        onChangeText={handleTextChange}
        onBlur={() => validatePhone(phoneNumber)}
        error={error}
        keyboardType='phone-pad'
        maxLength={15}
        leftIcon={<CountryCodePrefix />}
        containerClassName='mb-[24px]'
      />

      {/* 3. Subtitle description (24px bottom gap to Button) */}
      <Text className='text-[14px] leading-[21px] font-poppins-medium text-neutral-1 mb-[24px]'>
        We texted you a code to verify your phone number
      </Text>

      {/* 4. Button / Primary (16px bottom margin is handled by card padding p-4) */}
      <Button
        title='Send'
        onPress={handleSend}
        disabled={!isFormValid}
        isLoading={isLoading}
        className='w-full'
      />
    </View>
  );
}

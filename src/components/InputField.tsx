import React, { useState } from 'react';
import {
  Image,
  NativeSyntheticEvent,
  Pressable,
  TargetedEvent,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { IconAssets } from '@/constants/assets';

export interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export function InputField({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  secureTextEntry,
  containerClassName = '',
  className = '',
  onFocus,
  onBlur,
  ...props
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = (e: NativeSyntheticEvent<TargetedEvent>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TargetedEvent>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Determine secure entry state
  const isSecure = secureTextEntry && !isPasswordVisible;

  // Outer container border styling
  let borderStyle = 'border border-neutral-4';
  if (error) {
    borderStyle = 'border border-semantic-1'; // Error color Red (#FF4267)
  } else if (isFocused) {
    borderStyle = 'border border-primary-1'; // Focused color Blue-purple (#3629B7)
  }

  const marginClass = containerClassName.includes('mb-') ? '' : 'mb-4';

  return (
    <View className={`w-full ${marginClass} ${containerClassName}`}>
      {label && (
        <Text className='text-[12px] leading-[16px] font-poppins-semibold text-primary-1 mb-[6px]'>
          {label}
        </Text>
      )}

      <View
        className={`w-full h-[44px] bg-neutral-6 rounded-[15px] flex-row items-center px-3 ${borderStyle}`}
      >
        {leftIcon && (
          <View className='mr-2 justify-center items-center'>{leftIcon}</View>
        )}

        <TextInput
          className={`flex-1 text-[14px] leading-[21px] font-poppins-medium text-neutral-1 h-full p-0 ${className}`}
          placeholderTextColor='#CACACA' // Neutral 4
          secureTextEntry={isSecure}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize='none'
          {...props}
        />

        {secureTextEntry ? (
          <Pressable
            onPress={togglePasswordVisibility}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            className='ml-2 w-6 h-6 justify-center items-center'
          >
            <Image
              source={isPasswordVisible ? IconAssets.eyeOff : IconAssets.eye}
              className='w-5 h-5'
              resizeMode='contain'
              style={{ tintColor: '#3629b7' }}
            />
          </Pressable>
        ) : (
          rightIcon && (
            <View className='ml-2 justify-center items-center'>
              {rightIcon}
            </View>
          )
        )}
      </View>

      {error ? (
        <Text className='text-[12px] leading-[16px] font-poppins-medium text-semantic-1 mt-[4px]'>
          {error}
        </Text>
      ) : (
        helperText && (
          <Text className='text-[12px] leading-[16px] font-poppins-medium text-neutral-3 mt-[4px]'>
            {helperText}
          </Text>
        )
      )}
    </View>
  );
}

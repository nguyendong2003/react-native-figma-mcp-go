import React, { useState } from 'react';
import { TextInput, View, Text, TextInputProps, Pressable } from 'react-native';

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

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
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

  return (
    <View className={`w-full mb-4 ${containerClassName}`}>
      {label && (
        <Text className="text-caption-1 text-primary-1 mb-1.5 font-semibold">
          {label}
        </Text>
      )}

      <View
        className={`w-full h-[44px] bg-neutral-6 rounded-[15px] flex-row items-center px-4 ${borderStyle}`}
      >
        {leftIcon && <View className="mr-2 justify-center items-center">{leftIcon}</View>}

        <TextInput
          className={`flex-1 text-body-3 text-neutral-1 font-medium h-full p-0 ${className}`}
          placeholderTextColor="#CACACA" // Neutral 4
          secureTextEntry={isSecure}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize="none"
          {...props}
        />

        {secureTextEntry ? (
          <Pressable
            onPress={togglePasswordVisibility}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            className="ml-2"
          >
            <Text className="text-caption-2 text-primary-1 font-medium">
              {isPasswordVisible ? 'Hide' : 'Show'}
            </Text>
          </Pressable>
        ) : (
          rightIcon && <View className="ml-2 justify-center items-center">{rightIcon}</View>
        )}
      </View>

      {error ? (
        <Text className="text-caption-2 text-semantic-1 mt-1 font-medium">
          {error}
        </Text>
      ) : (
        helperText && (
          <Text className="text-caption-2 text-neutral-3 mt-1 font-medium">
            {helperText}
          </Text>
        )
      )}
    </View>
  );
}

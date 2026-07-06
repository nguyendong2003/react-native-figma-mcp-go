import React, { useState } from 'react';
import { TextInput, View, Text, Pressable, Image } from 'react-native';
import { IconAssets } from '@/constants/assets';

export interface ExchangeInputFieldProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  currency?: string;
  onCurrencyPress?: () => void;
  placeholder?: string;
  className?: string;
}

export function ExchangeInputField({
  label = 'From',
  value,
  onChangeText,
  currency = 'USD',
  onCurrencyPress,
  placeholder = 'Text input',
  className = '',
}: ExchangeInputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`w-full max-w-[295px] mb-4 ${className}`}>
      {/* Label */}
      {label && (
        <Text className="text-caption-1 text-primary-1 mb-1.5 font-semibold">
          {label}
        </Text>
      )}

      {/* Input container */}
      <View
        className={`w-full h-[44px] bg-neutral-6 rounded-[15px] flex-row items-center px-3 border ${
          isFocused ? 'border-primary-1' : 'border-neutral-5'
        }`}
      >
        {/* TextInput */}
        <TextInput
          className="flex-1 text-body-3 text-neutral-1 font-medium h-full p-0"
          placeholder={placeholder}
          placeholderTextColor="#CACACA"
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Separator line */}
        <View className="h-6 w-[1px] bg-neutral-4 mx-2" />

        {/* Currency Selector */}
        <Pressable
          onPress={onCurrencyPress}
          className="flex-row items-center h-full px-1"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text className="text-body-1 text-neutral-1 font-medium mr-1.5">
            {currency}
          </Text>
          {/* Custom up/down arrows or simple chevron */}
          <View className="justify-center items-center">
            <Image
              source={IconAssets.chevronDown}
              className="w-3 h-3"
              resizeMode="contain"
              tintColor="#3629B7"
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

import React from 'react';
import { Text, Pressable } from 'react-native';

export interface AmountPresetProps {
  amount: string;
  isActive?: boolean;
  onPress?: () => void;
  className?: string;
}

export function AmountPreset({
  amount,
  isActive = false,
  onPress,
  className = '',
}: AmountPresetProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`w-[100px] h-[60px] rounded-[15px] items-center justify-center border border-neutral-5 shadow-card-2 ${
        isActive 
          ? 'bg-primary-1 active:bg-primary-2' 
          : 'bg-neutral-6 active:bg-neutral-5/10'
      } ${className}`}
    >
      <Text
        className={`text-title-3 font-semibold ${
          isActive ? 'text-neutral-6' : 'text-neutral-3'
        }`}
      >
        {amount}
      </Text>
    </Pressable>
  );
}

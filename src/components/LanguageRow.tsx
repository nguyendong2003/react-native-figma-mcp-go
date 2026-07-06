import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { IconAssets } from '@/constants/assets';

export interface LanguageRowProps {
  language: string;
  flagCode?: 'VN' | string;
  isSelected?: boolean;
  onPress?: () => void;
  className?: string;
}

export function LanguageRow({
  language,
  flagCode = 'VN',
  isSelected = false,
  onPress,
  className = '',
}: LanguageRowProps) {
  // Map flagCode to asset
  const flagSource = flagCode === 'VN' ? IconAssets.flagVn : null;

  return (
    <Pressable
      onPress={onPress}
      className={`w-full h-[42px] flex-row items-center justify-between active:bg-neutral-5/10 ${className}`}
    >
      <View className="flex-row items-center">
        {/* Language flag */}
        {flagSource && (
          <View className="w-10 h-[30px] rounded-[2px] overflow-hidden border border-neutral-5 mr-3">
            <Image
              source={flagSource}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        )}
        <Text
          className={`text-body-1 font-medium ${
            isSelected ? 'text-neutral-1' : 'text-neutral-3'
          }`}
        >
          {language}
        </Text>
      </View>

      {/* Selected checkmark */}
      <View className="relative h-full justify-center">
        {isSelected && (
          <View 
            style={{
              width: 16,
              height: 8,
              borderLeftWidth: 2,
              borderBottomWidth: 2,
              borderColor: '#3629B7', // Primary 1
              transform: [{ rotate: '-45deg' }],
              marginBottom: 6,
              marginRight: 4,
            }}
          />
        )}
        <View className="absolute bottom-0 left-[-327px] right-0 h-[1px] bg-neutral-5" />
      </View>
    </Pressable>
  );
}

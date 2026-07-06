import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { IconAssets } from '@/constants/assets';

export interface InfoRowProps {
  title: string;
  value?: string;
  showChevron?: boolean;
  showDivider?: boolean;
  onPress?: () => void;
  className?: string;
}

export function InfoRow({
  title,
  value,
  showChevron = true,
  showDivider = true,
  onPress,
  className = '',
}: InfoRowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className={`w-full h-11 flex-row items-center justify-between active:bg-neutral-5/10 ${className}`}
    >
      {/* Title */}
      <Text className="text-body-1 text-neutral-1 font-medium">{title}</Text>

      {/* Right-aligned content */}
      <View className="flex-row items-center relative h-full">
        {value && (
          <Text className="text-title-3 text-primary-1 font-semibold mr-2">{value}</Text>
        )}
        {showChevron && (
          <Image
            source={IconAssets.chevronRight}
            className="w-4 h-4"
            resizeMode="contain"
            tintColor="#E0E0E0" // Neutral 5
          />
        )}
        {showDivider && (
          <View className="absolute bottom-0 left-[-327px] right-0 h-[1px] bg-neutral-5" />
        )}
      </View>
    </Pressable>
  );
}

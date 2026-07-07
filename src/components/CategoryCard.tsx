import React from 'react';
import { View, Text, Pressable, Image, ImageSourcePropType } from 'react-native';

export interface CategoryCardProps {
  title: string;
  iconSource?: ImageSourcePropType;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
  className?: string;
  style?: any;
  width?: number;
  height?: number;
}

export function CategoryCard({
  title,
  iconSource,
  variant = 'secondary',
  onPress,
  className = '',
  style,
  width,
  height = 100,
}: CategoryCardProps) {
  const isPrimary = variant === 'primary';
  const cardWidth = width ?? (isPrimary ? 120 : 100);

  return (
    <Pressable
      onPress={onPress}
      style={[{ width: cardWidth, height }, style]}
      className={`rounded-[15px] border border-neutral-5 shadow-card-2 ${
        isPrimary 
          ? 'bg-primary-1 active:bg-primary-2 items-start p-4 justify-between' 
          : 'bg-neutral-6 active:bg-neutral-5/10 items-center pt-4 pb-3 px-4 justify-between'
      } ${className}`}
    >
      <View className="w-7 h-7 justify-center items-center">
        {iconSource && (
          <Image
            source={iconSource}
            className="w-7 h-7"
            resizeMode="contain"
            tintColor={isPrimary ? '#FFFFFF' : '#3629B7'}
          />
        )}
      </View>
      <Text
        className={`font-poppins-medium text-[12px] leading-[16px] ${
          isPrimary ? 'text-neutral-6 text-left' : 'text-neutral-3 text-center w-full'
        }`}
        numberOfLines={2}
      >
        {title}
      </Text>
    </Pressable>
  );
}

import React from 'react';
import { View, Text, Pressable, Image, ImageSourcePropType } from 'react-native';

export interface CategoryCardProps {
  title: string;
  iconSource?: ImageSourcePropType;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
  className?: string;
  width?: number;
  height?: number;
}

export function CategoryCard({
  title,
  iconSource,
  variant = 'secondary',
  onPress,
  className = '',
  width,
  height = 100,
}: CategoryCardProps) {
  const isPrimary = variant === 'primary';
  const widthClass = width ? `w-[${width}px]` : 'flex-1 min-w-[100px] max-w-[120px]';

  return (
    <Pressable
      onPress={onPress}
      style={[{ height }]}
      className={`${widthClass} rounded-[15px] p-4 justify-between border border-neutral-5 shadow-card-2 ${
        isPrimary 
          ? 'bg-primary-1 active:bg-primary-2' 
          : 'bg-neutral-6 active:bg-neutral-5/10'
      } ${className}`}
    >
      <View className="h-7 w-7 justify-center items-center">
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
        style={{ fontSize: 12, lineHeight: 16 }}
        className={`font-medium text-left ${
          isPrimary ? 'text-neutral-6' : 'text-neutral-3'
        }`}
        numberOfLines={2}
      >
        {title}
      </Text>
    </Pressable>
  );
}

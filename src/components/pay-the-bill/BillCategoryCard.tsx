import React from 'react';
import { View, Text, Pressable, Image, ImageSourcePropType } from 'react-native';

export interface BillCategoryCardProps {
  title: string;
  description: string;
  iconSource?: ImageSourcePropType;
  onPress?: () => void;
  className?: string;
}

export function BillCategoryCard({
  title,
  description,
  iconSource,
  onPress,
  className = '',
}: BillCategoryCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`w-full max-w-[327px] h-[110px] bg-neutral-6 rounded-[15px] shadow-card-1 px-4 pt-4 pb-0 flex-row items-start justify-between active:bg-neutral-5/10 ${className}`}
    >
      <View className="flex-1 pt-2 mr-4 justify-start">
        <Text className="text-[16px] leading-[24px] font-poppins-semibold text-neutral-1">
          {title}
        </Text>
        <Text className="text-[12px] leading-[16px] font-poppins-medium text-neutral-3 mt-0">
          {description}
        </Text>
      </View>
      {iconSource && (
        <View style={{ width: 90, height: 84 }} className="w-[90px] h-[84px] justify-center items-center">
          <Image
            source={iconSource}
            style={{ width: 90, height: 84 }}
            className="w-[90px] h-[84px]"
            resizeMode="contain"
          />
        </View>
      )}
    </Pressable>
  );
}

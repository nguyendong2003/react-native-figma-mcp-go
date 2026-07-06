import React from 'react';
import { View, Text, Pressable, Image, ImageSourcePropType } from 'react-native';
import { IconAssets } from '@/constants/assets';

export interface CardBeneficiaryProps {
  name?: string;
  avatarSource?: ImageSourcePropType;
  type?: 'user' | 'add-new';
  onPress?: () => void;
  className?: string;
}

export function CardBeneficiary({
  name = 'Name',
  avatarSource,
  type = 'user',
  onPress,
  className = '',
}: CardBeneficiaryProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`w-[100px] h-[120px] bg-neutral-6 rounded-[15px] items-center justify-center border border-neutral-5 shadow-card-2 active:bg-neutral-5/20 ${className}`}
    >
      {type === 'add-new' ? (
        <View className="items-center justify-center">
          <View className="w-[60px] h-[60px] rounded-full bg-primary-4 items-center justify-center mb-1.5">
            <Image
              source={IconAssets.plus}
              className="w-6 h-6"
              resizeMode="contain"
              tintColor="#3629B7"
            />
          </View>
          <Text className="text-caption-2 text-primary-1 font-semibold">Add new</Text>
        </View>
      ) : (
        <View className="items-center justify-center w-full px-2">
          <View className="w-[60px] h-[60px] rounded-full bg-primary-4 overflow-hidden mb-1.5 justify-center items-center">
            {avatarSource ? (
              <Image source={avatarSource} className="w-full h-full" resizeMode="cover" />
            ) : (
              <View className="w-8 h-8 rounded-full bg-neutral-3" />
            )}
          </View>
          <Text 
            className="text-body-3 text-neutral-1 font-medium text-center w-full"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {name}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

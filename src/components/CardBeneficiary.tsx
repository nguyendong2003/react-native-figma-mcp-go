import React from 'react';
import { View, Text, Pressable, Image, ImageSourcePropType } from 'react-native';
import { IconAssets } from '@/constants/assets';

export interface CardBeneficiaryProps {
  name?: string;
  avatarSource?: ImageSourcePropType;
  type?: 'user' | 'add-new';
  onPress?: () => void;
  className?: string;
  style?: any;
}

export function CardBeneficiary({
  name = 'Name',
  avatarSource,
  type = 'user',
  onPress,
  className = '',
  style,
}: CardBeneficiaryProps) {
  const isAddNew = type === 'add-new';

  return (
    <Pressable
      onPress={onPress}
      style={style}
      className={`w-[100px] h-[120px] bg-neutral-6 rounded-[15px] border border-neutral-5 shadow-card-2 active:bg-neutral-5/20 ${
        isAddNew 
          ? 'items-center justify-center' 
          : 'items-center justify-between pt-[16px] pb-[11px] px-4'
      } ${className}`}
    >
      {isAddNew ? (
        <View className="w-[60px] h-[60px] rounded-full bg-primary-4 items-center justify-center">
          <Image
            source={IconAssets.plus}
            className="w-6 h-6"
            resizeMode="contain"
            tintColor="#3629B7"
          />
        </View>
      ) : (
        <>
          <View className="w-[60px] h-[60px] rounded-full bg-primary-4 overflow-hidden justify-center items-center">
            {avatarSource ? (
              <Image source={avatarSource} className="w-full h-full" resizeMode="cover" />
            ) : (
              <View className="w-8 h-8 rounded-full bg-neutral-3" />
            )}
          </View>
          <Text 
            className="font-poppins-medium text-[14px] leading-[21px] text-neutral-1 text-center w-full"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {name}
          </Text>
        </>
      )}
    </Pressable>
  );
}

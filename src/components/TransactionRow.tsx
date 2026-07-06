import React from 'react';
import { View, Text, Image, Pressable, ImageSourcePropType } from 'react-native';
import { IconAssets } from '@/constants/assets';

export interface TransactionRowProps {
  title: string;
  subtitle?: string;
  amount: string;
  type?: 'reduction' | 'increase';
  iconSource?: ImageSourcePropType;
  showDivider?: boolean;
  onPress?: () => void;
  className?: string;
}

export function TransactionRow({
  title,
  subtitle,
  amount,
  type = 'reduction',
  iconSource,
  showDivider = true,
  onPress,
  className = '',
}: TransactionRowProps) {
  const isIncrease = type === 'increase';
  const amountColor = isIncrease ? 'text-primary-1' : 'text-neutral-1';
  const displayAmount = isIncrease 
    ? (amount.startsWith('+') ? amount : `+ ${amount}`)
    : (amount.startsWith('-') ? amount : `- ${amount}`);

  return (
    <Pressable
      onPress={onPress}
      className={`w-full h-[52px] flex-row items-center justify-between px-1 active:bg-neutral-5/10 ${className}`}
    >
      <View className="flex-row items-center flex-1 mr-3">
        {/* Circular Icon Container */}
        <View className="w-10 h-10 rounded-[10px] bg-primary-1 justify-center items-center mr-3">
          {iconSource ? (
            <Image
              source={iconSource}
              className="w-[16px] h-[16px]"
              resizeMode="contain"
              tintColor="#FFFFFF"
            />
          ) : (
            <Image
              source={IconAssets.transferCard}
              className="w-[16px] h-[16px]"
              resizeMode="contain"
              tintColor="#FFFFFF"
            />
          )}
        </View>

        {/* Text Details */}
        <View className="flex-1 justify-center">
          <Text className="text-body-1 text-neutral-1 font-medium" numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text className="text-caption-1 text-neutral-3 font-semibold mt-0.5" numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {/* Amount and Divider */}
      <View className="items-end justify-center relative h-full">
        <Text className={`text-title-3 font-semibold ${amountColor}`}>
          {displayAmount}
        </Text>
        {showDivider && (
          <View className="absolute bottom-0 left-[-327px] right-0 h-[1px] bg-neutral-5" />
        )}
      </View>
    </Pressable>
  );
}

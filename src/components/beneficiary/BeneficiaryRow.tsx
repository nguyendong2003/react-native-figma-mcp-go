import React from 'react';
import { View, Text, Pressable, ImageSourcePropType } from 'react-native';
import { Avatar } from '@/components/Avatar';

export interface BeneficiaryRowProps {
  name: string;
  accountNumber: string;
  avatarSource?: ImageSourcePropType;
  showDivider?: boolean;
  onPress?: () => void;
}

export function BeneficiaryRow({
  name,
  accountNumber,
  avatarSource,
  showDivider = true,
  onPress,
}: BeneficiaryRowProps) {
  return (
    <Pressable
      onPress={onPress}
      className="active:opacity-60"
    >
      <View className="w-full flex-row items-center">
        {/* Avatar */}
        <Avatar source={avatarSource} size={40} className="border-0" />

        {/* Text Details */}
        <View className="ml-3 flex-1 justify-center">
          <Text 
            className="text-[16px] leading-[24px] font-poppins-medium text-neutral-1"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {name}
          </Text>
          <Text 
            className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-3 mt-[2px]"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {accountNumber}
          </Text>
        </View>
      </View>

      {/* Bottom Divider Line */}
      {showDivider && (
        <View className="h-[1px] bg-neutral-5 mt-[12px]" style={{ backgroundColor: '#ECECEC' }} />
      )}
    </Pressable>
  );
}

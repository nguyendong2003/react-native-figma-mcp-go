import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { IconAssets } from '@/constants/assets';

export interface CardBankProps {
  type?: 'visa' | 'mastercard' | 'multi' | 'add-new';
  cardholderName?: string;
  cardNumber?: string;
  cardType?: string;
  balance?: string;
  onPress?: () => void;
  className?: string;
}

export function CardBank({
  type = 'visa',
  cardholderName = 'John Smith',
  cardNumber = '•••• •••• •••• 9018',
  cardType = 'Amazon Platinum',
  balance = '$3,469.52',
  onPress,
  className = '',
}: CardBankProps) {
  if (type === 'add-new') {
    return (
      <Pressable
        onPress={onPress}
        className={`w-full max-w-[327px] h-[49px] rounded-[10px] border border-dashed border-primary-3 bg-transparent items-center justify-center flex-row active:bg-primary-4/20 ${className}`}
      >
        <Image
          source={IconAssets.plus}
          className="w-4 h-4 mr-2"
          resizeMode="contain"
          tintColor="#3629B7"
        />
        <Text className="text-body-3 text-primary-1 font-semibold">Add new card</Text>
      </Pressable>
    );
  }

  if (type === 'multi') {
    // Multi card renders a visual stack of card-2, card-1
    return (
      <View className={`w-full max-w-[327px] h-[221px] justify-end items-center relative ${className}`}>
        {/* Deep background card (Rectangle 34: 261x164) */}
        <View className="w-[261px] h-[164px] rounded-[10px] bg-primary-2 absolute top-0 opacity-40 shadow-card-2" />
        {/* Mid card (Rectangle 2: 287x178) */}
        <View className="w-[287px] h-[178px] rounded-[10px] bg-semantic-1 absolute top-[15px] opacity-70 shadow-card-2" />
        {/* Foreground card (CardBank visa) */}
        <CardBank
          type="visa"
          cardholderName={cardholderName}
          cardNumber={cardNumber}
          cardType={cardType}
          balance={balance}
          onPress={onPress}
          className="w-full absolute bottom-0"
        />
      </View>
    );
  }

  // Base styled Credit Card (Visa or Mastercard)
  const isVisa = type === 'visa';
  const bgColor = isVisa ? 'bg-[#1573FF]' : 'bg-[#FFC256]';

  return (
    <Pressable
      onPress={onPress}
      className={`w-full max-w-[327px] h-[204px] rounded-[30px] p-6 justify-between overflow-hidden shadow-card-1 relative ${bgColor} ${className}`}
    >
      {/* Background Graphic Decorator */}
      <View 
        className={`absolute -right-16 -top-16 w-[200px] h-[200px] rounded-full opacity-20 ${
          isVisa ? 'bg-[#1E1671]' : 'bg-[#FFAF2A]'
        }`} 
      />
      <View 
        className={`absolute -left-16 -bottom-16 w-[150px] h-[150px] rounded-full opacity-25 ${
          isVisa ? 'bg-[#4EB4FF]' : 'bg-[#FFCA73]'
        }`} 
      />

      {/* Top row: Card Type & Brand Logo */}
      <View className="flex-row justify-between items-start z-10">
        <View>
          <Text className="text-caption-2 text-neutral-6/80 font-medium">{cardType}</Text>
          <Text className="text-title-1 text-neutral-6 font-semibold mt-1">{balance}</Text>
        </View>
        <Image
          source={isVisa ? IconAssets.visaLogo : IconAssets.mastercardLogo}
          style={isVisa ? { width: 47, height: 16 } : { width: 47, height: 29 }}
          resizeMode="contain"
        />
      </View>

      {/* Bottom row: Card Number & Cardholder Name */}
      <View className="z-10">
        <Text className="text-body-2 text-neutral-6/90 tracking-widest font-mono mb-2">
          {cardNumber}
        </Text>
        <Text className="text-body-3 text-neutral-6 font-medium uppercase tracking-wider">
          {cardholderName}
        </Text>
      </View>
    </Pressable>
  );
}

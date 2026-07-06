import React from 'react';
import { View, Image } from 'react-native';
import { IconAssets } from '@/constants/assets';

export function SignUpIllustration() {
  return (
    <View className="w-[213px] h-[165px] self-center relative mt-[32px] mb-[32px]">
      {/* Background Large Lavender Circle (Ellipse 1) */}
      <View 
        className="w-[150px] h-[150px] rounded-full bg-primary-4 absolute"
        style={{ left: 35, top: 15 }}
      />

      {/* Decorative Dots */}
      {/* Ellipse 2 (Top small primary dot) */}
      <View 
        className="w-[10px] h-[10px] rounded-full bg-primary-1 absolute"
        style={{ left: 72, top: 0 }}
      />

      {/* Ellipse 3 (Top right medium error/red dot) */}
      <View 
        className="w-[25px] h-[25px] rounded-full bg-semantic-1 absolute"
        style={{ left: 188, top: 22 }}
      />

      {/* Ellipse 4 (Bottom right small info/blue dot) */}
      <View 
        className="w-[10px] h-[10px] rounded-full bg-semantic-2 absolute"
        style={{ left: 178, top: 131 }}
      />

      {/* Ellipse 5 (Bottom left medium warning/yellow dot) */}
      <View 
        className="w-[20px] h-[20px] rounded-full bg-semantic-3 absolute"
        style={{ left: 42, top: 126 }}
      />

      {/* Ellipse 6 (Left small success/green dot) */}
      <View 
        className="w-[10px] h-[10px] rounded-full bg-semantic-4 absolute"
        style={{ left: 0, top: 65 }}
      />

      {/* Phone Casing & Screen (Group 458) */}
      <View 
        className="w-[50px] h-[92.31px] bg-primary-2 border-[1.5px] border-neutral-6 rounded-[8px] absolute"
        style={{ left: 85, top: 44 }}
      >
        {/* Speaker Grill (Vector 2) */}
        <View 
          className="w-[29.23px] h-[3.08px] bg-neutral-6 rounded-[1.5px] absolute"
          style={{ left: 10, top: 1.54 }}
        />

        {/* Fingerprint Icon (XMLID 6 / Group 116:10638) */}
        <Image 
          source={IconAssets.fingerprint}
          className="w-[30px] h-[27px] absolute"
          style={{ left: 10, top: 33 }}
          resizeMode="contain"
          tintColor="#FFFFFF"
        />
      </View>
    </View>
  );
}

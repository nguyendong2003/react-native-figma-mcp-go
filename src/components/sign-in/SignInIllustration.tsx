import React from 'react';
import { View } from 'react-native';

export function SignInIllustration() {
  return (
    <View className="w-[213px] h-[165px] self-center relative justify-center items-center mt-8 mb-8">
      {/* Background Large Lavender Circle (Ellipse 1) */}
      <View 
        className="w-[150px] h-[150px] rounded-full bg-[#E5E2FF] absolute"
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

      {/* Padlock Illustration (Group 291) */}
      <View 
        className="w-[50px] h-[73px] absolute items-center justify-end"
        style={{ left: 85, top: 53 }}
      >
        {/* Shackle */}
        <View 
          className="w-[38px] h-[38px] rounded-t-full border-[5px] border-primary-2 absolute top-0"
          style={{ borderBottomWidth: 0 }}
        />

        {/* Shackle inner white line detail */}
        <View 
          className="w-[28px] h-[28px] rounded-t-full border-[1.5px] border-neutral-6 absolute top-[5px]"
          style={{ borderBottomWidth: 0 }}
        />

        {/* Padlock Body */}
        <View className="w-[50px] h-[46px] bg-primary-2 rounded-[12px] border-[2px] border-neutral-6 items-center justify-center relative">
          {/* Keyhole (Vector 61:231 detail) */}
          <View className="w-[10px] h-[10px] bg-neutral-6 rounded-full" />
          <View className="w-[4px] h-[10px] bg-neutral-6 rounded-sm -mt-0.5" />
        </View>
      </View>
    </View>
  );
}

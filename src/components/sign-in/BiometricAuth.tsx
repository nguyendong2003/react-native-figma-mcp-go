import React from 'react';
import { Pressable, View } from 'react-native';

interface BiometricAuthProps {
  onPress: () => void;
  className?: string;
}

export function BiometricAuth({ onPress, className = '' }: BiometricAuthProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`w-16 h-16 rounded-full bg-neutral-6 border border-neutral-5 items-center justify-center shadow-card-2 active:bg-primary-4 self-center mt-6 mb-6 ${className}`}
      accessibilityRole="button"
      accessibilityLabel="Sign in with Biometrics"
    >
      {/* Abstract Fingerprint Icon using concentric arcs */}
      <View className="w-10 h-10 items-center justify-center relative">
        {/* Outer Arc (pointing down) */}
        <View 
          className="w-9 h-9 rounded-full border-2 border-primary-1 absolute"
          style={{ borderBottomColor: 'transparent', borderLeftColor: 'transparent', transform: [{ rotate: '45deg' }] }}
        />
        
        {/* Middle Arc (pointing up) */}
        <View 
          className="w-7 h-7 rounded-full border-2 border-primary-1 absolute"
          style={{ borderTopColor: 'transparent', borderRightColor: 'transparent', transform: [{ rotate: '45deg' }] }}
        />

        {/* Inner Arc (pointing down) */}
        <View 
          className="w-5 h-5 rounded-full border-2 border-primary-1 absolute"
          style={{ borderBottomColor: 'transparent', borderLeftColor: 'transparent', transform: [{ rotate: '-135deg' }] }}
        />

        {/* Center core */}
        <View className="w-2.5 h-4 rounded-full bg-primary-1 absolute" />
      </View>
    </Pressable>
  );
}

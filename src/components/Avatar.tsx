import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';

export interface AvatarProps {
  source?: ImageSourcePropType;
  size?: number;
  className?: string;
}

export function Avatar({ source, size = 40, className = '' }: AvatarProps) {
  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <View
      style={containerStyle}
      className={`bg-primary-4 overflow-hidden items-center justify-center border border-neutral-5 ${className}`}
    >
      {source ? (
        <Image
          source={source}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      ) : (
        // Standard user silhouette placeholder
        <View className="w-1/2 h-1/2 rounded-full bg-neutral-3 mt-1" />
      )}
    </View>
  );
}

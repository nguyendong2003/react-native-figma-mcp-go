import { IconAssets } from '@/constants/assets';
import React from 'react';
import { Image, Pressable, Text, View, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface NavigationBarProps {
  title: string;
  theme?: 'black' | 'white'; // white theme has white bg, black theme has primary bg
  onBackPress?: () => void;
  rightIcon?: React.ReactNode;
  className?: string;
}

export function NavigationBar({
  title,
  theme = 'white',
  onBackPress,
  rightIcon,
  className = '',
}: NavigationBarProps) {
  const insets = useSafeAreaInsets();
  const isWhiteBg = theme === 'white';

  return (
    <View
      style={{ paddingTop: insets.top, height: 53 + insets.top }}
      className={`w-full justify-end px-6 ${
        isWhiteBg ? 'bg-neutral-6' : 'bg-primary-1'
      } ${className}`}
    >
      <StatusBar barStyle={isWhiteBg ? 'dark-content' : 'light-content'} backgroundColor="transparent" translucent />
      
      {/* 28px height inner row centered vertically along y=39 (which is 14px from bottom of 53px parent) */}
      <View className="w-full h-[28px] flex-row items-center justify-between mb-0">
        {/* Left button (Back) */}
        {onBackPress && (
          <Pressable
            onPress={onBackPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            className='active:opacity-60'
          >
            {/* Custom rotated arrow-down back icon or chevron */}
            <Image
              source={IconAssets.arrowDownSignToNavigate}
              className='w-4 h-4'
              resizeMode='contain'
              tintColor={isWhiteBg ? '#343434' : '#FFFFFF'}
            />
          </Pressable>
        )}

        {/* Left-aligned Title */}
        <Text
          className={`text-[20px] leading-[28px] font-poppins-semibold text-left flex-1 ${
            onBackPress ? 'ml-4' : ''
          } ${isWhiteBg ? 'text-neutral-1' : 'text-neutral-6'}`}
          numberOfLines={1}
        >
          {title}
        </Text>

        {/* Right button/icon */}
        {rightIcon ? rightIcon : null}
      </View>
    </View>
  );
}

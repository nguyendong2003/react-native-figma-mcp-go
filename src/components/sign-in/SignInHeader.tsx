import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function SignInHeader() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View 
      className="bg-primary-1 w-full" 
      style={{ paddingTop: Math.max(insets.top, 20) }}
    >
      <View className="h-[53px] w-full flex-row items-center px-6 relative">
        <Pressable
          onPress={handleBack}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          className="absolute left-6 z-10 w-8 h-8 justify-center items-center"
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          {/* Chevron Left */}
          <View className="w-3 h-3 border-l-[2px] border-t-[2px] border-white -rotate-45" />
        </Pressable>

        <Text className="flex-1 text-center text-title-2 text-neutral-6 font-semibold">
          Sign in
        </Text>
      </View>
    </View>
  );
}

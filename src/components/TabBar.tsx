import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { IconAssets } from '@/constants/assets';

export type TabName = 'home' | 'search' | 'message' | 'setting';

export interface TabBarProps {
  activeTab: TabName;
  onTabPress?: (tab: TabName) => void;
  className?: string;
}

export function TabBar({ activeTab, onTabPress, className = '' }: TabBarProps) {
  const tabs = [
    {
      name: 'home' as TabName,
      label: 'Home',
      activeIcon: IconAssets.tabHomeActive,
      inactiveIcon: IconAssets.tabHomeInactive,
    },
    {
      name: 'search' as TabName,
      label: 'Search',
      activeIcon: IconAssets.tabSearchActive,
      inactiveIcon: IconAssets.tabSearchInactive,
    },
    {
      name: 'message' as TabName,
      label: 'Message',
      activeIcon: IconAssets.tabMessageActive,
      inactiveIcon: IconAssets.tabMessageInactive,
    },
    {
      name: 'setting' as TabName,
      label: 'Setting',
      activeIcon: IconAssets.tabSettingActive,
      inactiveIcon: IconAssets.tabSettingInactive,
    },
  ];

  return (
    <View
      className={`w-full h-[92px] bg-neutral-6 border-t border-neutral-5 flex-row items-center justify-around px-4 shadow-tab-bar ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;

        return (
          <Pressable
            key={tab.name}
            onPress={() => onTabPress && onTabPress(tab.name)}
            className="items-center justify-center"
          >
            {isActive ? (
              // Active Tab: Pill Shape
              <View className="flex-row items-center bg-primary-1 rounded-full px-4 py-2 h-9">
                <Image
                  source={tab.activeIcon}
                  className="w-5 h-5 mr-1.5"
                  resizeMode="contain"
                />
                <Text className="text-neutral-6 text-[12px] font-semibold">
                  {tab.label}
                </Text>
              </View>
            ) : (
              // Inactive Tab: Just Icon
              <View className="w-10 h-10 items-center justify-center">
                <Image
                  source={tab.inactiveIcon}
                  className="w-6 h-6"
                  resizeMode="contain"
                  tintColor="#898989" // Neutral 2
                />
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

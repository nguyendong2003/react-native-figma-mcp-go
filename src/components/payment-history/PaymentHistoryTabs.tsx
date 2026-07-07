import React from 'react';
import { ScrollView, Pressable, Text, View } from 'react-native';

export type PaymentTabId = 'electric' | 'water' | 'mobile' | 'internet';

export interface TabItem {
  id: PaymentTabId;
  label: string;
}

export interface PaymentHistoryTabsProps {
  activeTab: PaymentTabId;
  onTabPress: (tabId: PaymentTabId) => void;
}

export const TAB_ITEMS: TabItem[] = [
  { id: 'electric', label: 'Electric' },
  { id: 'water', label: 'Water' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'internet', label: 'Internet' },
];

export function PaymentHistoryTabs({
  activeTab,
  onTabPress,
}: PaymentHistoryTabsProps) {
  return (
    <View className="w-full h-[44px] mt-6 mb-8">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        className="w-full"
      >
        <View className="flex-row gap-[12px]">
          {TAB_ITEMS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Pressable
                key={tab.id}
                onPress={() => onTabPress(tab.id)}
                className={`w-[100px] h-[44px] rounded-[15px] justify-center items-center active:opacity-80 ${
                  isActive ? 'bg-primary-1' : 'bg-primary-4'
                }`}
              >
                <Text
                  className={`text-[16px] leading-[24px] font-poppins-medium text-center ${
                    isActive ? 'text-neutral-6' : 'text-neutral-1'
                  }`}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

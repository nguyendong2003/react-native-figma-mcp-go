import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface ChartBarData {
  label: string;
  totalHeight: number; // e.g. 0 to 100 representing percentage/pixels
  redProgress: number; // height of red segment
  blueProgress: number; // height of blue segment
}

export interface ChartCardProps {
  title?: string;
  balance?: string;
  currency?: string;
  data?: ChartBarData[];
  activeLabel?: string;
  className?: string;
}

export function ChartCard({
  title = 'Balance',
  balance = '1,000',
  currency = 'USD',
  data = [
    { label: 'Jan', totalHeight: 50, redProgress: 20, blueProgress: 20 },
    { label: 'Feb', totalHeight: 86, redProgress: 34, blueProgress: 34 },
    { label: 'Mar', totalHeight: 127, redProgress: 51, blueProgress: 51 },
    { label: 'Apr', totalHeight: 69, redProgress: 28, blueProgress: 28 },
    { label: 'May', totalHeight: 40, redProgress: 16, blueProgress: 16 },
    { label: 'Jun', totalHeight: 92, redProgress: 37, blueProgress: 37 },
  ],
  activeLabel = 'Apr',
  className = '',
}: ChartCardProps) {
  return (
    <View className={`w-full max-w-[327px] h-[291px] bg-neutral-6 rounded-[30px] p-6 justify-between border border-neutral-5 shadow-card-1 ${className}`}>
      
      {/* Header Info */}
      <View>
        <Text className="text-caption-1 text-neutral-1 font-semibold mb-1">
          {title}
        </Text>
        <View className="flex-row items-baseline">
          <Text className="text-[32px] text-primary-1 font-medium mr-1.5 leading-[38px]">
            {balance}
          </Text>
          <Text className="text-caption-1 text-neutral-3 font-semibold">
            {currency}
          </Text>
        </View>
      </View>

      {/* Bar Chart Area */}
      <View className="flex-1 justify-end mt-4">
        {/* Horizontal grid lines */}
        <View className="absolute left-0 right-0 top-0 bottom-6 justify-between opacity-20">
          <View className="h-[1px] bg-neutral-4 w-full" />
          <View className="h-[1px] bg-neutral-4 w-full" />
          <View className="h-[1px] bg-neutral-4 w-full" />
          <View className="h-[1px] bg-neutral-4 w-full" />
          <View className="h-[1px] bg-neutral-4 w-full" />
        </View>

        {/* Columns */}
        <View className="flex-row justify-between items-end h-[130px] px-2 z-10">
          {data.map((item, index) => {
            const isActive = item.label === activeLabel;
            const barHeight = item.totalHeight;

            return (
              <View key={index} className="items-center justify-end h-full">
                {/* Bar Stack */}
                <View 
                  style={{ height: barHeight }}
                  className="w-1.5 bg-[#FBB8FF] rounded-full justify-end overflow-hidden"
                >
                  {/* Blue overlay */}
                  <View 
                    style={{ height: item.blueProgress }}
                    className="w-full bg-primary-1"
                  />
                  {/* Red overlay */}
                  <View 
                    style={{ height: item.redProgress }}
                    className="w-full bg-semantic-1"
                  />
                </View>

                {/* X Axis Label */}
                <Text 
                  className={`text-caption-1 font-semibold mt-2 ${
                    isActive ? 'text-primary-1' : 'text-neutral-3'
                  }`}
                >
                  {item.label}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

    </View>
  );
}

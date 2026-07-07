import React from 'react';
import { View, Text, Pressable } from 'react-native';

export interface PaymentHistoryRecord {
  id: string;
  month: string;
  date: string;
  status: 'Successfully' | 'Unsuccessfully';
  amount: string;
}

export interface PaymentHistoryCardProps {
  record: PaymentHistoryRecord;
  onPress?: () => void;
  className?: string;
}

export function PaymentHistoryCard({
  record,
  onPress,
  className = '',
}: PaymentHistoryCardProps) {
  const isSuccess = record.status === 'Successfully';

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className={`w-full max-w-[420px] h-[88px] bg-neutral-6 rounded-[15px] shadow-card-1 pl-4 pr-5 py-4 justify-between active:opacity-90 ${className}`}
    >
      {/* Row 1: Month Name and Date */}
      <View className="flex-row items-center justify-between h-[24px]">
        <Text className="text-[16px] leading-[24px] font-poppins-semibold text-neutral-1">
          {record.month}
        </Text>
        <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-3">
          {record.date}
        </Text>
      </View>

      {/* Row 2: Status and Amount */}
      <View className="flex-row items-center justify-between h-[16px]">
        {/* Left side: Status label & value */}
        <View className="flex-row items-center gap-[8px]">
          <Text className="text-[12px] leading-[16px] font-poppins-medium text-neutral-3">
            Status
          </Text>
          <Text
            className={`text-[12px] leading-[16px] font-poppins-semibold ${
              isSuccess ? 'text-primary-1' : 'text-semantic-1'
            }`}
          >
            {record.status}
          </Text>
        </View>

        {/* Right side: Amount label & value */}
        <View className="flex-row items-center gap-[8px]">
          <Text className="text-[12px] leading-[16px] font-poppins-medium text-neutral-3">
            Amount
          </Text>
          <Text className="text-[12px] leading-[16px] font-poppins-semibold text-primary-1">
            {record.amount}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

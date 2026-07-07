import React from 'react';
import { View, Text } from 'react-native';

export interface AccountDetail {
  accountNumber: string;
  fromDate: string;
  toDate: string;
  depositTerm: string;
  interestRate: string;
}

export interface AccountCardProps {
  details: AccountDetail;
  className?: string;
}

export function AccountCard({ details, className = '' }: AccountCardProps) {
  return (
    <View
      className={`w-full max-w-[420px] bg-neutral-6 rounded-[15px] shadow-card-1 px-4 py-4 gap-3 ${className}`}
    >
      {/* Header Row: Title and Account Number */}
      <View className="flex-row items-center justify-between min-h-[24px]">
        <Text className="text-[16px] leading-[24px] font-poppins-semibold text-neutral-1">
          Account
        </Text>
        <Text className="text-[16px] leading-[24px] font-poppins-semibold text-neutral-1 text-right">
          {details.accountNumber}
        </Text>
      </View>

      {/* From Date Row */}
      <View className="flex-row items-center justify-between min-h-[16px]">
        <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-3">
          From
        </Text>
        <Text className="text-[12px] leading-[16px] font-poppins-semibold text-primary-1 text-right">
          {details.fromDate}
        </Text>
      </View>

      {/* To Date Row */}
      <View className="flex-row items-center justify-between min-h-[16px]">
        <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-3">
          To
        </Text>
        <Text className="text-[12px] leading-[16px] font-poppins-semibold text-primary-1 text-right">
          {details.toDate}
        </Text>
      </View>

      {/* Time Deposit (Deposit Term) Row */}
      <View className="flex-row items-center justify-between min-h-[16px]">
        <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-3">
          Time deposit
        </Text>
        <Text className="text-[12px] leading-[16px] font-poppins-semibold text-primary-1 text-right">
          {details.depositTerm}
        </Text>
      </View>

      {/* Interest Rate Row */}
      <View className="flex-row items-center justify-between min-h-[16px]">
        <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-3">
          Interest rate
        </Text>
        <Text className="text-[12px] leading-[16px] font-poppins-semibold text-primary-1 text-right">
          {details.interestRate}
        </Text>
      </View>
    </View>
  );
}

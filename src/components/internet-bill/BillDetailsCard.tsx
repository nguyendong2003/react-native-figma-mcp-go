import React from 'react';
import { View, Text } from 'react-native';

export interface BillDetails {
  name: string;
  address: string;
  phoneNumber: string;
  code: string;
  from: string;
  to: string;
  fee: string;
  tax: string;
  total: string;
}

export interface BillDetailsCardProps {
  details: BillDetails;
  cutoutBgColor?: string;
  className?: string;
}

export function BillDetailsCard({
  details,
  cutoutBgColor = 'bg-primary-4',
  className = '',
}: BillDetailsCardProps) {
  return (
    <View
      className={`w-full max-w-[420px] bg-neutral-6 rounded-[15px] shadow-card-1 relative ${className}`}
    >
      {/* Title */}
      <View className="px-4 pt-4">
        <Text className="text-[16px] leading-[24px] font-poppins-semibold text-neutral-1">
          All the Bills
        </Text>
      </View>

      {/* Row details */}
      <View className="px-4 pt-6 gap-4">
        {/* Name Row */}
        <View className="flex-row items-center justify-between min-h-[16px]">
          <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-3">
            Name
          </Text>
          <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-1 text-right">
            {details.name}
          </Text>
        </View>

        {/* Address Row */}
        <View className="flex-row items-start justify-between min-h-[32px]">
          <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-3 mt-0.5">
            Address
          </Text>
          <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-1 text-right flex-1 ml-8">
            {details.address}
          </Text>
        </View>

        {/* Phone Row */}
        <View className="flex-row items-center justify-between min-h-[16px]">
          <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-3">
            Phone number
          </Text>
          <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-1 text-right">
            {details.phoneNumber}
          </Text>
        </View>

        {/* Code Row */}
        <View className="flex-row items-center justify-between min-h-[16px]">
          <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-3">
            Code
          </Text>
          <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-1 text-right">
            {details.code}
          </Text>
        </View>

        {/* From Row */}
        <View className="flex-row items-center justify-between min-h-[16px]">
          <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-3">
            From
          </Text>
          <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-1 text-right">
            {details.from}
          </Text>
        </View>

        {/* To Row */}
        <View className="flex-row items-center justify-between min-h-[16px] mb-2">
          <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-3">
            To
          </Text>
          <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-1 text-right">
            {details.to}
          </Text>
        </View>
      </View>

      {/* Internet Fee Row */}
      <View className="px-4 pt-4 flex-row items-center justify-between min-h-[24px]">
        <Text className="text-[16px] leading-[24px] font-poppins-medium text-neutral-3">
          Internet fee
        </Text>
        <Text className="text-[16px] leading-[24px] font-poppins-semibold text-primary-1 text-right">
          {details.fee}
        </Text>
      </View>

      {/* Divider 1 */}
      <View className="mx-4 mt-3 mb-4 border-b border-neutral-4" />

      {/* Tax Row */}
      <View className="px-4 flex-row items-center justify-between min-h-[24px]">
        <Text className="text-[16px] leading-[24px] font-poppins-medium text-neutral-3">
          Tax
        </Text>
        <Text className="text-[16px] leading-[24px] font-poppins-semibold text-primary-1 text-right">
          {details.tax}
        </Text>
      </View>

      {/* Divider 2 with Coupon Bite Cutouts */}
      <View className="relative w-full h-[16px] justify-center mt-1 mb-3" style={{ overflow: 'visible' }}>
        {/* Left cutout: positioned relative to content container bounds */}
        <View
          className={`absolute left-[-8px] w-4 h-4 rounded-full ${cutoutBgColor}`}
          style={{ zIndex: 10 }}
        />
        {/* Right cutout: positioned relative to content container bounds */}
        <View
          className={`absolute right-[-8px] w-4 h-4 rounded-full ${cutoutBgColor}`}
          style={{ zIndex: 10 }}
        />
        {/* Dashed line */}
        <View className="mx-4 border-t border-dashed border-neutral-4" />
      </View>

      {/* TOTAL Row */}
      <View className="px-4 pb-4 flex-row items-center justify-between min-h-[28px]">
        <Text className="text-[16px] leading-[24px] font-poppins-semibold text-neutral-1">
          TOTAL
        </Text>
        <Text className="text-[24px] leading-[28px] font-poppins-semibold text-semantic-1 text-right">
          {details.total}
        </Text>
      </View>
    </View>
  );
}

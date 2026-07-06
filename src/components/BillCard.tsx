import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface BillItem {
  label: string;
  value: string;
  isBold?: boolean;
  isPrimary?: boolean;
}

export interface BillCardProps {
  title?: string;
  details?: BillItem[];
  fees?: BillItem[];
  totalLabel?: string;
  totalValue?: string;
  cutoutBgColor?: string;
  className?: string;
}

export function BillCard({
  title = 'All the Bills',
  details = [
    { label: 'Name', value: 'Jackson Maine' },
    { label: 'Address', value: '403 East 4th Street, Santa Ana' },
    { label: 'Phone number', value: '+8424599721' },
    { label: 'Code', value: '#2343543' },
    { label: 'From', value: '01/10/2019' },
    { label: 'To', value: '01/11/2019' },
  ],
  fees = [
    { label: 'Electric fee', value: '$470', isPrimary: true },
    { label: 'Tax', value: '$10', isPrimary: true },
  ],
  totalLabel = 'TOTAL',
  totalValue = '$480',
  cutoutBgColor = 'bg-primary-4',
  className = '',
}: BillCardProps) {

  return (
    <View className={`w-full max-w-[327px] bg-neutral-6 rounded-[15px] p-5 shadow-card-1 relative border border-neutral-5 ${className}`}>
      
      {/* Title */}
      <Text className="text-title-3 text-neutral-1 font-semibold mb-4">
        {title}
      </Text>

      {/* Details list */}
      <View className="mb-4">
        {details.map((item, index) => (
          <View key={index} className="flex-row justify-between mb-2 items-start">
            <Text className="text-caption-1 text-neutral-3 font-semibold mr-4">
              {item.label}
            </Text>
            <Text 
              className="text-caption-1 text-neutral-1 font-semibold text-right flex-1"
              numberOfLines={2}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </View>

      {/* Divider */}
      <View className="h-[1px] bg-neutral-4 w-full my-3" />

      {/* Fees list */}
      <View className="mb-4">
        {fees.map((item, index) => (
          <View key={index} className="flex-row justify-between mb-2">
            <Text className="text-body-1 text-neutral-3 font-medium">
              {item.label}
            </Text>
            <Text className="text-title-3 text-primary-1 font-semibold">
              {item.value}
            </Text>
          </View>
        ))}
      </View>

      {/* Ticket Cutout Dots Overlay */}
      {/* Left Cutout */}
      <View className={`absolute left-[-8px] bottom-[60px] w-4 h-4 rounded-full border-r border-neutral-5 ${cutoutBgColor}`} />
      {/* Right Cutout */}
      <View className={`absolute right-[-8px] bottom-[60px] w-4 h-4 rounded-full border-l border-neutral-5 ${cutoutBgColor}`} />

      {/* Divider above Total */}
      <View className="h-[1px] bg-neutral-4 w-full mt-3 mb-4" />

      {/* Total Row */}
      <View className="flex-row justify-between items-center">
        <Text className="text-title-3 text-neutral-3 font-semibold">
          {totalLabel}
        </Text>
        <Text className="text-title-1 text-semantic-1 font-semibold">
          {totalValue}
        </Text>
      </View>
    </View>
  );
}

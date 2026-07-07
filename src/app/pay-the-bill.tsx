import React from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import '@/global.css';
import { IconAssets } from '@/constants/assets';
import { BillCategoryCard } from '@/components/pay-the-bill/BillCategoryCard';

export default function PayTheBillScreen() {
  const bills = [
    {
      id: 'electric',
      title: 'Electric bill',
      description: 'Pay electric bill this month',
      icon: IconAssets.electricBill,
    },
    {
      id: 'water',
      title: 'Water bill',
      description: 'Pay water bill this month',
      icon: IconAssets.waterBill,
    },
    {
      id: 'mobile',
      title: 'Mobile bill',
      description: 'Pay mobile bill this month',
      icon: IconAssets.mobileBill,
    },
    {
      id: 'internet',
      title: 'Internet bill',
      description: 'Pay internet bill this month',
      icon: IconAssets.internetBill,
    },
  ];

  const handlePayBill = (id: string, title: string) => {
    if (id === 'internet') {
      router.push('/internet-bill');
    } else {
      Alert.alert('Payment initiated', `Redirecting to payment gateway for your ${title}.`);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-neutral-6"
      edges={['left', 'right', 'bottom']}
    >
      <ScrollView
        className="flex-1 bg-neutral-6"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Horizontal margins: x=24 (px-6). Top margin from navigation header: 24px (pt-[24px]). */}
        <View className="flex-1 px-6 pt-[24px] pb-[40px] items-center justify-start">
          {bills.map((bill, index) => (
            <BillCategoryCard
              key={bill.id}
              title={bill.title}
              description={bill.description}
              iconSource={bill.icon}
              onPress={() => handlePayBill(bill.id, bill.title)}
              className={index < bills.length - 1 ? 'mb-[20px]' : ''}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

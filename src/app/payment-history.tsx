import React, { useState } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import '@/global.css';
import { PaymentHistoryTabs, PaymentTabId } from '@/components/payment-history/PaymentHistoryTabs';
import { PaymentHistoryCard, PaymentHistoryRecord } from '@/components/payment-history/PaymentHistoryCard';

const MOCK_HISTORY: Record<PaymentTabId, PaymentHistoryRecord[]> = {
  electric: [
    { id: 'el-1', month: 'October', date: '30/10/2019', status: 'Unsuccessfully', amount: '$480' },
    { id: 'el-2', month: 'September', date: '30/09/2019', status: 'Successfully', amount: '$480' },
    { id: 'el-3', month: 'August', date: '30/08/2019', status: 'Successfully', amount: '$480' },
    { id: 'el-4', month: 'July', date: '30/07/2019', status: 'Successfully', amount: '$480' },
    { id: 'el-5', month: 'June', date: '30/06/2019', status: 'Successfully', amount: '$480' },
    { id: 'el-6', month: 'May', date: '30/05/2019', status: 'Successfully', amount: '$480' },
  ],
  water: [
    { id: 'wa-1', month: 'October', date: '25/10/2019', status: 'Successfully', amount: '$45' },
    { id: 'wa-2', month: 'September', date: '25/09/2019', status: 'Successfully', amount: '$48' },
    { id: 'wa-3', month: 'August', date: '25/08/2019', status: 'Successfully', amount: '$42' },
    { id: 'wa-4', month: 'July', date: '25/07/2019', status: 'Successfully', amount: '$45' },
  ],
  mobile: [
    { id: 'mo-1', month: 'October', date: '18/10/2019', status: 'Successfully', amount: '$20' },
    { id: 'mo-2', month: 'September', date: '18/09/2019', status: 'Successfully', amount: '$25' },
    { id: 'mo-3', month: 'August', date: '18/08/2019', status: 'Unsuccessfully', amount: '$20' },
    { id: 'mo-4', month: 'July', date: '18/07/2019', status: 'Successfully', amount: '$20' },
  ],
  internet: [
    { id: 'in-1', month: 'October', date: '05/10/2019', status: 'Successfully', amount: '$60' },
    { id: 'in-2', month: 'September', date: '05/09/2019', status: 'Successfully', amount: '$60' },
    { id: 'in-3', month: 'August', date: '05/08/2019', status: 'Successfully', amount: '$60' },
    { id: 'in-4', month: 'July', date: '05/07/2019', status: 'Successfully', amount: '$60' },
  ],
};

export default function PaymentHistoryScreen() {
  const [activeTab, setActiveTab] = useState<PaymentTabId>('electric');

  const handleCardPress = (record: PaymentHistoryRecord) => {
    Alert.alert(
      'Transaction Details',
      `Month: ${record.month}\nDate: ${record.date}\nStatus: ${record.status}\nAmount: ${record.amount}`
    );
  };

  const records = MOCK_HISTORY[activeTab] || [];

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
        {/* Horizontal tabs list filter */}
        <PaymentHistoryTabs activeTab={activeTab} onTabPress={setActiveTab} />

        {/* History Cards container. Horizontal margins: x=24 (px-6). Gap between cards: 20px. Bottom padding: 40px */}
        <View className="flex-1 px-6 gap-[20px] items-center justify-start pb-[40px]">
          {records.map((record) => (
            <PaymentHistoryCard
              key={record.id}
              record={record}
              onPress={() => handleCardPress(record)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

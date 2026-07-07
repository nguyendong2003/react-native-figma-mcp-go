import React, { useState } from 'react';
import { ScrollView, View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import '@/global.css';

import { BillDetailsCard, BillDetails } from '@/components/internet-bill/BillDetailsCard';
import { PaymentSourceSelector, CardOption, MOCK_CARDS } from '@/components/internet-bill/PaymentSourceSelector';
import { OtpVerification } from '@/components/internet-bill/OtpVerification';
import { Button } from '@/components/Button';

const MOCK_BILL_DETAILS: BillDetails = {
  name: 'Jackson Maine',
  address: '403 East 4th Street, Santa Ana',
  phoneNumber: '+8424599721',
  code: '#2343543',
  from: '01/10/2019',
  to: '01/11/2019',
  fee: '$50',
  tax: '$10',
  total: '$60',
};

export default function InternetBillScreen() {
  const [selectedCard, setSelectedCard] = useState<CardOption>(MOCK_CARDS[0]);
  const [otp, setOtp] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  const handlePay = () => {
    if (!otp || otp.trim().length < 5) {
      Alert.alert('Verification Required', 'Please request and enter a valid OTP code before paying.');
      return;
    }

    setIsPaying(true);

    // Simulate payment transaction request
    setTimeout(() => {
      setIsPaying(false);
      Alert.alert(
        'Payment Successful',
        `You have successfully paid the Internet bill of $60 using ${selectedCard.label} (${selectedCard.cardNumber.replace(/\d{4}(?=\s\d)/g, '****')}).`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset OTP
              setOtp('');
              // Go back to the bill catalog screen
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/pay-the-bill');
              }
            },
          },
        ]
      );
    }, 1800);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-primary-4"
      edges={['left', 'right', 'bottom']}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Horizontal margins: x=24 (px-6). Top margin from navigation header: 24px (pt-[24px]). */}
          <View className="flex-1 px-6 pt-[24px] pb-[58px] items-center justify-start">
            {/* Bill Details Card (cutouts match the bg-primary-4 screen background) */}
            <BillDetailsCard
              details={MOCK_BILL_DETAILS}
              cutoutBgColor="bg-primary-4"
              className="mb-[32px]"
            />

            {/* Payment Source Selector (dropdown select card) */}
            <PaymentSourceSelector
              selectedCard={selectedCard}
              onSelectCard={setSelectedCard}
              className="mb-[24px]"
            />

            {/* OTP Verification input and button */}
            <OtpVerification
              value={otp}
              onChangeText={setOtp}
              className="mb-[63px]"
            />

            {/* Action button: Pay the bill */}
            <Button
              title="Pay the bill"
              isLoading={isPaying}
              onPress={handlePay}
              className="w-full max-w-[420px]"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

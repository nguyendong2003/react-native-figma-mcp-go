import React, { useState } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
  Text,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import '@/global.css';

import { BeneficiaryRow } from '@/components/beneficiary/BeneficiaryRow';
import { AddBeneficiaryModal } from '@/components/beneficiary/AddBeneficiaryModal';
import { InputField } from '@/components/InputField';
import { IconAssets } from '@/constants/assets';

interface Beneficiary {
  id: string;
  name: string;
  accountNumber: string;
  type: 'card' | 'same-bank' | 'other-bank';
}

const INITIAL_BENEFICIARIES: Beneficiary[] = [
  // Transfer via card number
  { id: '1', name: 'Push', accountNumber: '12788980890', type: 'card' },
  { id: '2', name: 'Olivia', accountNumber: '0345976231', type: 'card' },
  
  // Transfer to the same bank
  { id: '3', name: 'Alexander', accountNumber: '12788980890', type: 'same-bank' },
  { id: '4', name: 'Harper', accountNumber: '0345976231', type: 'same-bank' },
  
  // Transfer to another bank
  { id: '5', name: 'Thomas', accountNumber: '12788980890', type: 'other-bank' },
  { id: '6', name: 'Sanmatha', accountNumber: '0345976231', type: 'other-bank' },
  { id: '7', name: 'Justin Biber', accountNumber: '12788980890', type: 'other-bank' },
];

export default function BeneficiaryScreen() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(INITIAL_BENEFICIARIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Filter beneficiaries based on search query (matches name or account number)
  const filteredBeneficiaries = beneficiaries.filter((b) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return b.name.toLowerCase().includes(query) || b.accountNumber.includes(query);
  });

  const cardBeneficiaries = filteredBeneficiaries.filter((b) => b.type === 'card');
  const sameBankBeneficiaries = filteredBeneficiaries.filter((b) => b.type === 'same-bank');
  const otherBankBeneficiaries = filteredBeneficiaries.filter((b) => b.type === 'other-bank');

  const handleSelectBeneficiary = (b: Beneficiary) => {
    Alert.alert('Beneficiary Selected', `Name: ${b.name}\nAccount: ${b.accountNumber}`);
  };

  const handleAddBeneficiary = (name: string, accountNumber: string, type: 'card' | 'same-bank' | 'other-bank') => {
    const newBeneficiary: Beneficiary = {
      id: Date.now().toString(),
      name,
      accountNumber,
      type,
    };
    setBeneficiaries((prev) => [...prev, newBeneficiary]);
    Alert.alert('Success', `Successfully added beneficiary "${name}"!`);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-neutral-6"
      edges={['left', 'right', 'bottom']}
    >
      <Stack.Screen
        options={{
          title: 'Beneficiary',
          headerRight: () => (
            <Pressable
              onPress={() => {
                setIsSearchActive((prev) => !prev);
                if (isSearchActive) {
                  setSearchQuery('');
                }
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              className="active:opacity-60"
            >
              <Image
                source={IconAssets.search}
                style={{ width: 20, height: 20 }}
                className="w-5 h-5"
                resizeMode="contain"
                tintColor={isSearchActive ? '#3629b7' : '#343434'}
              />
            </Pressable>
          ),
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 bg-neutral-6"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 pt-[24px] pb-[80px] items-center justify-start">
            {/* Interactive Search Bar */}
            {isSearchActive && (
              <InputField
                placeholder="Search name or account number..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                containerClassName="mb-6 w-full max-w-[420px]"
                leftIcon={
                  <Image
                    source={IconAssets.search}
                    style={{ width: 16, height: 16 }}
                    className="w-4 h-4"
                    resizeMode="contain"
                    tintColor="#CACACA"
                  />
                }
                rightIcon={
                  searchQuery.length > 0 ? (
                    <Pressable
                      onPress={() => setSearchQuery('')}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Image
                        source={IconAssets.clear}
                        className="w-4 h-4"
                        resizeMode="contain"
                        tintColor="#CACACA"
                      />
                    </Pressable>
                  ) : null
                }
              />
            )}

            {/* Section 1: Transfer via card number */}
            {cardBeneficiaries.length > 0 && (
              <View className="w-full max-w-[420px] mb-[24px]">
                <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-3 mb-[16px]">
                  Transfer via card number
                </Text>
                <View className="w-full bg-neutral-6 rounded-[15px] border border-neutral-5 shadow-card-2 px-[16px] pt-[24px] pb-[20px] gap-y-[20px]">
                  {cardBeneficiaries.map((b) => (
                    <BeneficiaryRow
                      key={b.id}
                      name={b.name}
                      accountNumber={b.accountNumber}
                      showDivider={true}
                      onPress={() => handleSelectBeneficiary(b)}
                    />
                  ))}
                </View>
              </View>
            )}

            {/* Section 2: Transfer to the same bank */}
            {sameBankBeneficiaries.length > 0 && (
              <View className="w-full max-w-[420px] mb-[24px]">
                <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-3 mb-[16px]">
                  Transfer to the same bank
                </Text>
                <View className="w-full bg-neutral-6 rounded-[15px] border border-neutral-5 shadow-card-2 px-[16px] pt-[24px] pb-[20px] gap-y-[20px]">
                  {sameBankBeneficiaries.map((b) => (
                    <BeneficiaryRow
                      key={b.id}
                      name={b.name}
                      accountNumber={b.accountNumber}
                      showDivider={true}
                      onPress={() => handleSelectBeneficiary(b)}
                    />
                  ))}
                </View>
              </View>
            )}

            {/* Section 3: Transfer to another bank */}
            {otherBankBeneficiaries.length > 0 && (
              <View className="w-full max-w-[420px] mb-[24px]">
                <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-3 mb-[16px]">
                  Transfer to another bank
                </Text>
                <View className="w-full bg-neutral-6 rounded-[15px] border border-neutral-5 shadow-card-2 px-[16px] pt-[24px] pb-[20px] gap-y-[20px]">
                  {otherBankBeneficiaries.map((b) => (
                    <BeneficiaryRow
                      key={b.id}
                      name={b.name}
                      accountNumber={b.accountNumber}
                      showDivider={true}
                      onPress={() => handleSelectBeneficiary(b)}
                    />
                  ))}
                </View>
              </View>
            )}

            {/* No search results fallback */}
            {filteredBeneficiaries.length === 0 && (
              <View className="flex-1 justify-center items-center py-20">
                <Text className="text-[16px] leading-[24px] font-poppins-medium text-neutral-3">
                  No beneficiaries found.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Floating Action Button (FAB) */}
      <Pressable
        onPress={() => setIsModalVisible(true)}
        className="absolute bottom-[16px] right-[24px] w-[50px] h-[50px] rounded-full bg-primary-1 items-center justify-center shadow-card-1 active:bg-primary-2"
        style={{
          shadowColor: '#3629B7',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.07,
          shadowRadius: 30,
          elevation: 5,
        }}
      >
        <Image
          source={IconAssets.plus}
          className="w-5 h-5 text-white"
          resizeMode="contain"
          tintColor="#FFFFFF"
        />
      </Pressable>

      {/* Add Beneficiary Modal */}
      <AddBeneficiaryModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={handleAddBeneficiary}
      />
    </SafeAreaView>
  );
}

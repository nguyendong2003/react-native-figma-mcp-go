import React, { useState } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import '@/global.css';

import { AccountCard, AccountDetail } from '@/components/account-management/AccountCard';
import { InputField } from '@/components/InputField';
import { IconAssets } from '@/constants/assets';

const MOCK_ACCOUNTS: AccountDetail[] = [
  {
    accountNumber: '1900 8988 5456',
    fromDate: '02/11/2019',
    toDate: '02/11/2020',
    depositTerm: '12 months',
    interestRate: '5%',
  },
  {
    accountNumber: '1900 8112 5222',
    fromDate: '02/11/2019',
    toDate: '02/11/2020',
    depositTerm: '12 months',
    interestRate: '5%',
  },
  {
    accountNumber: '4411 0000 1234',
    fromDate: '02/11/2019',
    toDate: '02/11/2020',
    depositTerm: '12 months',
    interestRate: '5%',
  },
];

export default function AccountManagementScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const filteredAccounts = MOCK_ACCOUNTS.filter((acc) =>
    acc.accountNumber.replace(/\s/g, '').includes(searchQuery.replace(/\s/g, ''))
  );

  return (
    <SafeAreaView
      className="flex-1 bg-neutral-6"
      edges={['left', 'right', 'bottom']}
    >
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => setIsSearchActive((prev) => !prev)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              className="active:opacity-60"
            >
              <Image
                source={IconAssets.tabSearchInactive}
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
          <View className="flex-1 px-6 pt-[24px] pb-[40px] items-center justify-start">
            {/* Interactive Search Bar */}
            {isSearchActive && (
              <InputField
                placeholder="Search account number..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                containerClassName="mb-6 w-full max-w-[420px]"
                leftIcon={
                  <Image
                    source={IconAssets.tabSearchInactive}
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

            {/* List of cards */}
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((account, index) => (
                <AccountCard
                  key={account.accountNumber}
                  details={account}
                  className={index < filteredAccounts.length - 1 ? 'mb-[20px]' : ''}
                />
              ))
            ) : (
              <View className="flex-1 justify-center items-center py-20">
                <Text className="text-[16px] leading-[24px] font-poppins-medium text-neutral-3">
                  No accounts found matching search query.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

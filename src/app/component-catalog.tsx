import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationBar } from '@/components/NavigationBar';
import { TabBar, TabName } from '@/components/TabBar';
import { Button } from '@/components/Button';
import { InputField } from '@/components/InputField';
import { ExchangeInputField } from '@/components/ExchangeInputField';
import { Avatar } from '@/components/Avatar';
import { CardBeneficiary } from '@/components/CardBeneficiary';
import { CategoryCard } from '@/components/CategoryCard';
import { AmountPreset } from '@/components/AmountPreset';
import { ChatBubble } from '@/components/ChatBubble';
import { CardBank } from '@/components/CardBank';
import { TransactionRow } from '@/components/TransactionRow';
import { InfoRow } from '@/components/InfoRow';
import { LanguageRow } from '@/components/LanguageRow';
import { BillCard } from '@/components/BillCard';
import { ChartCard } from '@/components/ChartCard';
import { IconAssets } from '@/constants/assets';

export default function ComponentCatalogScreen() {
  const [activeTab, setActiveTab] = useState<TabName>('home');
  const [inputText, setInputText] = useState('');
  const [exchangeText, setExchangeText] = useState('100');
  const [isVnSelected, setIsVnSelected] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-primary-4" edges={['left', 'right', 'bottom']}>

      <ScrollView 
        className="flex-1 px-4 py-4"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-title-1 text-primary-1 font-semibold mb-6 mt-2 text-center">
          Component Library
        </Text>

        {/* 1. BUTTONS */}
        <View className="mb-8">
          <Text className="text-title-3 text-neutral-1 font-bold mb-3 border-b border-neutral-5 pb-1">
            1. BUTTON VARIATIONS
          </Text>
          <View className="flex-row flex-wrap gap-2 items-center">
            <Button title="Primary Active" variant="primary" className="w-[130px]" />
            <Button title="Primary Disabled" variant="primary" disabled className="w-[130px]" />
            <Button title="Ghost Active" variant="ghost" className="w-[130px]" />
            <Button title="Ghost Disabled" variant="ghost" disabled className="w-[130px]" />
            <Button variant="round">
              <Text className="text-neutral-6 text-body-1 font-bold">+</Text>
            </Button>
            <Button variant="round" disabled>
              <Text className="text-neutral-6 text-body-1 font-bold">+</Text>
            </Button>
            <Button title="Link Button" variant="link" />
          </View>
        </View>

        {/* 2. TEXT FIELDS */}
        <View className="mb-8">
          <Text className="text-title-3 text-neutral-1 font-bold mb-3 border-b border-neutral-5 pb-1">
            2. INPUT FIELDS
          </Text>
          <InputField
            label="Standard Input"
            placeholder="Placeholder text"
            value={inputText}
            onChangeText={setInputText}
          />
          <InputField
            label="Error Input"
            placeholder="Error occurs here"
            error="This input has an error message"
          />
          <ExchangeInputField
            label="Currency Exchange Input"
            value={exchangeText}
            onChangeText={setExchangeText}
            currency="USD"
            onCurrencyPress={() => alert('Change currency')}
          />
        </View>

        {/* 3. AVATARS & BENEFICIARIES */}
        <View className="mb-8">
          <Text className="text-title-3 text-neutral-1 font-bold mb-3 border-b border-neutral-5 pb-1">
            3. AVATARS & BENEFICIARIES
          </Text>
          <View className="flex-row items-center gap-4 mb-4">
            <Avatar size={40} />
            <Avatar size={60} />
            <Avatar size={80} />
          </View>
          <View className="flex-row gap-3">
            <CardBeneficiary name="Amanda" />
            <CardBeneficiary name="AddNew" type="add-new" onPress={() => alert('Add Beneficiary')} />
          </View>
        </View>

        {/* 4. CATEGORY CARDS */}
        <View className="mb-8">
          <Text className="text-title-3 text-neutral-1 font-bold mb-3 border-b border-neutral-5 pb-1">
            4. CATEGORY CARDS
          </Text>
          <View className="flex-row gap-3">
            <CategoryCard
              title="Transfer via card number"
              iconSource={IconAssets.transferCard}
              variant="primary"
            />
            <CategoryCard
              title="Account and Card"
              iconSource={IconAssets.wallet}
              variant="secondary"
            />
          </View>
        </View>

        {/* 5. AMOUNT PRESETS */}
        <View className="mb-8">
          <Text className="text-title-3 text-neutral-1 font-bold mb-3 border-b border-neutral-5 pb-1">
            5. AMOUNT PRESETS
          </Text>
          <View className="flex-row gap-3">
            <AmountPreset amount="$10" />
            <AmountPreset amount="$10" isActive />
            <AmountPreset amount="$50" />
          </View>
        </View>

        {/* 6. CHAT BUBBLES */}
        <View className="mb-8">
          <Text className="text-title-3 text-neutral-1 font-bold mb-3 border-b border-neutral-5 pb-1">
            6. CHAT BUBBLES
          </Text>
          <ChatBubble text="Hello! Have you sent the transfer yet?" type="received" />
          <ChatBubble text="Yes, I just did it. Let me know when you receive it." type="sent" />
        </View>

        {/* 7. BANK CARDS */}
        <View className="mb-8">
          <Text className="text-title-3 text-neutral-1 font-bold mb-3 border-b border-neutral-5 pb-1">
            7. CREDIT/BANK CARDS
          </Text>
          <Text className="text-caption-2 text-neutral-3 mb-2 font-semibold">Visa Style:</Text>
          <CardBank type="visa" className="mb-4" />
          
          <Text className="text-caption-2 text-neutral-3 mb-2 font-semibold">Mastercard Style:</Text>
          <CardBank type="mastercard" className="mb-4" />
          
          <Text className="text-caption-2 text-neutral-3 mb-2 font-semibold">Stack Layout (Multi):</Text>
          <CardBank type="multi" className="mb-4" />
          
          <Text className="text-caption-2 text-neutral-3 mb-2 font-semibold">Add New Card:</Text>
          <CardBank type="add-new" onPress={() => alert('Add New Card clicked')} />
        </View>

        {/* 8. LIST ROWS */}
        <View className="mb-8">
          <Text className="text-title-3 text-neutral-1 font-bold mb-3 border-b border-neutral-5 pb-1">
            8. LIST ROWS
          </Text>
          <Text className="text-caption-2 text-neutral-3 mb-2 font-semibold">Transaction Rows:</Text>
          <TransactionRow
            title="Salary payment"
            subtitle="Successfully"
            amount="$1,200"
            type="increase"
          />
          <TransactionRow
            title="Water Bill"
            subtitle="Unsuccessfully"
            amount="$280"
            type="reduction"
          />

          <Text className="text-caption-2 text-neutral-3 mt-4 mb-2 font-semibold">Settings / Info Rows:</Text>
          <InfoRow title="Password" value="••••••••" />
          <InfoRow title="Profile Info" value="Jackson Maine" />

          <Text className="text-caption-2 text-neutral-3 mt-4 mb-2 font-semibold">Language Selector Rows:</Text>
          <LanguageRow
            language="Vietnamese"
            flagCode="VN"
            isSelected={isVnSelected}
            onPress={() => setIsVnSelected(true)}
          />
          <LanguageRow
            language="English"
            flagCode="EN" // Fallback - renders no flag if not VN, or customize
            isSelected={!isVnSelected}
            onPress={() => setIsVnSelected(false)}
          />
        </View>

        {/* 9. BILL SUMMARY CARD */}
        <View className="mb-8">
          <Text className="text-title-3 text-neutral-1 font-bold mb-3 border-b border-neutral-5 pb-1">
            9. BILL SUMMARY CARD
          </Text>
          <BillCard />
        </View>

        {/* 10. BALANCE CHART CARD */}
        <View className="mb-8">
          <Text className="text-title-3 text-neutral-1 font-bold mb-3 border-b border-neutral-5 pb-1">
            10. BALANCE CHART CARD
          </Text>
          <ChartCard />
        </View>

        {/* 11. NAVIGATION BAR THEMES */}
        <View className="mb-8">
          <Text className="text-title-3 text-neutral-1 font-bold mb-3 border-b border-neutral-5 pb-1">
            11. NAVIGATION BAR THEMES
          </Text>
          <Text className="text-caption-2 text-neutral-3 mb-2 font-semibold">White Theme (White BG):</Text>
          <NavigationBar title="Forgot password" theme="white" onBackPress={() => {}} className="border border-neutral-5 mb-4" />
          
          <Text className="text-caption-2 text-neutral-3 mb-2 font-semibold">Black Theme (Primary BG):</Text>
          <NavigationBar title="Sign in" theme="black" onBackPress={() => {}} />
        </View>

      </ScrollView>

      {/* BOTTOM TAB BAR */}
      <TabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
}

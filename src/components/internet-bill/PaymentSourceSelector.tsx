import React, { useState } from 'react';
import { View, Text, Pressable, Image, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import { IconAssets } from '@/constants/assets';

export interface CardOption {
  id: string;
  label: string;
  icon: any;
  cardNumber: string;
}

export const MOCK_CARDS: CardOption[] = [
  {
    id: 'visa',
    label: 'Visa Card',
    icon: IconAssets.visaLogo,
    cardNumber: '4411 0000 1234',
  },
  {
    id: 'mastercard',
    label: 'Mastercard',
    icon: IconAssets.mastercardLogo,
    cardNumber: '5412 7500 9876',
  },
  {
    id: 'wallet',
    label: 'Main Wallet',
    icon: IconAssets.wallet,
    cardNumber: 'Main Wallet ($520.00)',
  },
];

export interface PaymentSourceSelectorProps {
  selectedCard: CardOption;
  onSelectCard: (card: CardOption) => void;
  className?: string;
}

export function PaymentSourceSelector({
  selectedCard,
  onSelectCard,
  className = '',
}: PaymentSourceSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (card: CardOption) => {
    onSelectCard(card);
    setModalVisible(false);
  };

  return (
    <>
      {/* Select Trigger Box */}
      <Pressable
        onPress={() => setModalVisible(true)}
        className={`w-full max-w-[420px] h-[44px] bg-neutral-6 rounded-[15px] flex-row items-center justify-between pl-3 pr-[15px] border ${
          modalVisible ? 'border-primary-1' : 'border-neutral-4'
        } active:bg-neutral-5/10 ${className}`}
      >
        <Text className="text-[14px] leading-[21px] font-poppins-medium text-neutral-1">
          {selectedCard.cardNumber}
        </Text>
        <Image
          source={IconAssets.chevronDown}
          className="w-4 h-4"
          resizeMode="contain"
          style={{ tintColor: '#343434' }}
        />
      </Pressable>

      {/* Bottom Sheet Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 bg-black/40 justify-end">
            <TouchableWithoutFeedback>
              <View className="bg-neutral-6 rounded-t-[30px] px-6 pt-6 pb-8 shadow-card-1 w-full max-w-[420px] self-center">
                {/* Header Indicator */}
                <View className="w-12 h-1 bg-neutral-4 rounded-full self-center mb-6" />

                {/* Title */}
                <Text className="text-[18px] leading-[24px] font-poppins-semibold text-neutral-1 mb-4">
                  Select Payment Source
                </Text>

                {/* Card List */}
                <FlatList
                  data={MOCK_CARDS}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    const isSelected = item.id === selectedCard.id;
                    return (
                      <Pressable
                        onPress={() => handleSelect(item)}
                        className={`w-full py-4 border-b border-neutral-5 flex-row items-center justify-between active:bg-neutral-5/10`}
                      >
                        <View className="flex-row items-center gap-3">
                          <Image
                            source={item.icon}
                            className="w-8 h-6"
                            resizeMode="contain"
                          />
                          <View>
                            <Text className="text-[14px] leading-[21px] font-poppins-semibold text-neutral-1">
                              {item.label}
                            </Text>
                            <Text className="text-[12px] leading-[16px] font-poppins-medium text-neutral-3">
                              {item.cardNumber}
                            </Text>
                          </View>
                        </View>
                        {isSelected && (
                          <View className="w-4 h-4 rounded-full bg-primary-1 items-center justify-center">
                            <View className="w-1.5 h-1.5 rounded-full bg-neutral-6" />
                          </View>
                        )}
                      </Pressable>
                    );
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

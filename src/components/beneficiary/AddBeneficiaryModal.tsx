import React, { useState } from 'react';
import { Modal, View, Text, Pressable, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { InputField } from '@/components/InputField';
import { Button } from '@/components/Button';

export interface AddBeneficiaryModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, accountNumber: string, type: 'card' | 'same-bank' | 'other-bank') => void;
}

export function AddBeneficiaryModal({ visible, onClose, onAdd }: AddBeneficiaryModalProps) {
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [type, setType] = useState<'card' | 'same-bank' | 'other-bank'>('card');
  const [errors, setErrors] = useState<{ name?: string; accountNumber?: string }>({});

  const handleAdd = () => {
    const newErrors: { name?: string; accountNumber?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!accountNumber.trim()) {
      newErrors.accountNumber = 'Account/Card number is required';
    } else if (!/^\d+$/.test(accountNumber.trim())) {
      newErrors.accountNumber = 'Only digits are allowed';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAdd(name.trim(), accountNumber.trim(), type);
    
    // Reset state
    setName('');
    setAccountNumber('');
    setType('card');
    setErrors({});
    onClose();
  };

  const handleCancel = () => {
    setName('');
    setAccountNumber('');
    setType('card');
    setErrors({});
    onClose();
  };

  const transferTypes = [
    { label: 'Card No.', value: 'card' as const },
    { label: 'Same Bank', value: 'same-bank' as const },
    { label: 'Other Bank', value: 'other-bank' as const },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <Pressable 
        className="flex-1 bg-neutral-1/40 justify-center items-center px-6"
        onPress={handleCancel}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="w-full justify-center items-center"
        >
          <Pressable 
            className="w-full max-w-[343px] bg-neutral-6 rounded-[24px] p-6 shadow-card-1 border border-neutral-5"
            onPress={(e) => e.stopPropagation()} // Prevent closing when tapping inside modal
          >
            {/* Modal Title */}
            <Text className="text-[20px] leading-[28px] font-poppins-semibold text-neutral-1 mb-5 text-center">
              Add Beneficiary
            </Text>

            {/* Beneficiary Name Input */}
            <InputField
              label="Beneficiary Name"
              placeholder="e.g. John Doe"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) {
                  setErrors((prev) => ({ ...prev, name: undefined }));
                }
              }}
              error={errors.name}
              containerClassName="mb-4"
            />

            {/* Account/Card Number Input */}
            <InputField
              label="Account / Card Number"
              placeholder="e.g. 12788980890"
              keyboardType="number-pad"
              value={accountNumber}
              onChangeText={(text) => {
                setAccountNumber(text);
                if (errors.accountNumber) {
                  setErrors((prev) => ({ ...prev, accountNumber: undefined }));
                }
              }}
              error={errors.accountNumber}
              containerClassName="mb-4"
            />

            {/* Beneficiary Type Selector */}
            <Text className="text-[12px] leading-[16px] font-poppins-semibold text-primary-1 mb-2">
              Transfer Type
            </Text>
            <View className="flex-row w-full justify-between gap-2 mb-6">
              {transferTypes.map((item) => {
                const isActive = type === item.value;
                return (
                  <Pressable
                    key={item.value}
                    onPress={() => setType(item.value)}
                    className={`flex-1 py-[8px] rounded-[10px] items-center justify-center border ${
                      isActive 
                        ? 'bg-primary-1 border-primary-1' 
                        : 'bg-neutral-6 border-neutral-4'
                    }`}
                  >
                    <Text className={`text-[12px] leading-[16px] font-poppins-semibold ${
                      isActive ? 'text-neutral-6' : 'text-neutral-3'
                    }`}>
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Action Buttons */}
            <View className="flex-row w-full justify-between gap-3">
              <Button
                title="Cancel"
                variant="secondary"
                onPress={handleCancel}
                className="flex-1"
              />
              <Button
                title="Add"
                variant="primary"
                onPress={handleAdd}
                className="flex-1"
              />
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';

export interface OtpVerificationProps {
  value: string;
  onChangeText: (text: string) => void;
  className?: string;
}

export function OtpVerification({
  value,
  onChangeText,
  className = '',
}: OtpVerificationProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  const handleGetOtp = () => {
    setIsLoading(true);
    // Simulate API request to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setCountdown(60); // Start 60s countdown
      const mockOtp = Math.floor(10000 + Math.random() * 90000).toString(); // Generate random 5-digit OTP
      onChangeText(mockOtp); // Autofill OTP
      Alert.alert(
        'OTP Sent Successfully',
        `A mock verification code [${mockOtp}] has been sent to your registered phone number. We have auto-filled it for your convenience.`
      );
    }, 1200);
  };

  const marginClass = className.includes('mb-') ? '' : 'mb-6';

  return (
    <View className={`w-full max-w-[420px] ${marginClass} ${className}`}>
      {/* Label */}
      <Text className="text-[12px] leading-[16px] font-poppins-semibold text-neutral-3 mb-[9px]">
        Get OTP to verify transaction
      </Text>

      {/* Side-by-Side Row */}
      <View className="flex-row items-center w-full justify-between h-[44px]">
        {/* OTP Text Input */}
        <View
          className={`flex-1 h-full bg-neutral-6 rounded-[15px] flex-row items-center px-3 border mr-3 ${
            isFocused ? 'border-primary-1' : 'border-neutral-4'
          }`}
        >
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder="Enter OTP"
            placeholderTextColor="#CACACA"
            keyboardType="number-pad"
            maxLength={6}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 text-[14px] leading-[21px] font-poppins-medium text-neutral-1 h-full p-0"
          />
        </View>

        {/* Get OTP Button */}
        <Pressable
          onPress={handleGetOtp}
          disabled={countdown > 0 || isLoading}
          className={`w-[100px] h-full rounded-[15px] items-center justify-center ${
            countdown > 0 || isLoading ? 'bg-primary-4' : 'bg-primary-1 active:bg-primary-2'
          }`}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text
              className={`text-[16px] leading-[24px] font-poppins-medium ${
                countdown > 0 ? 'text-neutral-3' : 'text-neutral-6'
              }`}
            >
              {countdown > 0 ? `${countdown}s` : 'Get OTP'}
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

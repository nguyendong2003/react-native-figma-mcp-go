import React from 'react';
import { View, Text } from 'react-native';

export interface ChatBubbleProps {
  text: string;
  type?: 'sent' | 'received';
  className?: string;
}

export function ChatBubble({ text, type = 'received', className = '' }: ChatBubbleProps) {
  const isSent = type === 'sent';

  return (
    <View
      className={`w-full flex-row ${isSent ? 'justify-end' : 'justify-start'} mb-3 ${className}`}
    >
      <View
        style={{ maxWidth: '80%' }}
        className={`px-4 py-3 rounded-[15px] ${
          isSent 
            ? 'bg-primary-1 rounded-tr-none' 
            : 'bg-primary-4 rounded-tl-none'
        }`}
      >
        <Text
          className={`text-body-3 ${
            isSent ? 'text-neutral-6' : 'text-neutral-1'
          }`}
        >
          {text}
        </Text>
      </View>
    </View>
  );
}

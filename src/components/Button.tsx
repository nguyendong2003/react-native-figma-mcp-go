import React from 'react';
import { Pressable, Text, ActivityIndicator, PressableProps } from 'react-native';

export interface ButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'link';
  className?: string;
}

export function Button({
  title,
  isLoading = false,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const isButtonDisabled = disabled || isLoading;

  // Base styles
  let containerStyle = 'py-3 px-6 rounded-[15px] items-center justify-center flex-row h-[44px]';
  let textStyle = 'text-body-1 font-medium';

  // Variant styles
  if (variant === 'primary') {
    if (isButtonDisabled) {
      containerStyle += ' bg-primary-4';
      textStyle += ' text-neutral-6';
    } else {
      containerStyle += ' bg-primary-1 active:bg-primary-2';
      textStyle += ' text-neutral-6';
    }
  } else if (variant === 'secondary') {
    if (isButtonDisabled) {
      containerStyle += ' border border-neutral-5 bg-neutral-6';
      textStyle += ' text-neutral-4';
    } else {
      containerStyle += ' border border-primary-1 bg-neutral-6 active:bg-primary-4';
      textStyle += ' text-primary-1';
    }
  } else if (variant === 'link') {
    containerStyle = 'py-1 px-2 bg-transparent';
    if (isButtonDisabled) {
      textStyle += ' text-neutral-4';
    } else {
      textStyle += ' text-primary-1 active:text-primary-2';
    }
  }

  return (
    <Pressable
      className={`${containerStyle} ${className}`}
      disabled={isButtonDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!isButtonDisabled, busy: isLoading }}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : '#3629B7'} size="small" />
      ) : (
        <Text className={textStyle}>{title}</Text>
      )}
    </Pressable>
  );
}

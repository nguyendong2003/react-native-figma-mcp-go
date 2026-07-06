import { IconAssets } from '@/constants/assets';
import { ThemeColors } from '@/constants/theme';
import { Image, Pressable } from 'react-native';

interface BiometricAuthProps {
  onPress: () => void;
  className?: string;
}

export function BiometricAuth({ onPress, className = '' }: BiometricAuthProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`w-16 h-16 rounded-full bg-neutral-6 border border-neutral-5 items-center justify-center shadow-card-2 active:bg-primary-4 self-center mt-6 mb-6 ${className}`}
      accessibilityRole='button'
      accessibilityLabel='Sign in with Biometrics'
    >
      <Image
        source={IconAssets.fingerprint}
        className='w-16 h-16'
        resizeMode='contain'
        tintColor={ThemeColors.primary[1]}
      />
    </Pressable>
  );
}

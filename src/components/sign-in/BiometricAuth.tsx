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
      className={`w-16 h-16 rounded-full items-center justify-center self-center active:opacity-60 ${className}`}
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

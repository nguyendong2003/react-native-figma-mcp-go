import { Platform } from 'react-native';

// Synced with Figma Design System Common Styles - Text, Effect, Color
export const ThemeColors = {
  primary: {
    1: '#3629B7',
    2: '#5655B9',
    3: '#A8A3D7',
    4: '#F2F1F9',
  },
  neutral: {
    1: '#343434',
    2: '#898989',
    3: '#989898',
    4: '#CACACA',
    5: '#E0E0E0',
    6: '#FFFFFF',
  },
  semantic: {
    1: '#FF4267', // Error / Danger
    2: '#0890FE', // Info / Link
    3: '#FFAF2A', // Warning
    4: '#52D5BA', // Success
    5: '#FB6B18', // Alert / Orange
  },
} as const;

export type ThemeColorsType = typeof ThemeColors;

// Backward compatible Colors object for useTheme hook
export const Colors = {
  light: {
    text: ThemeColors.neutral[1], // Neutral 1 (#343434)
    background: ThemeColors.neutral[6], // Neutral 6 (#FFFFFF)
    backgroundElement: ThemeColors.primary[4], // Primary 4 (#F2F1F9)
    backgroundSelected: ThemeColors.primary[3], // Primary 3 (#A8A3D7)
    textSecondary: ThemeColors.neutral[3], // Neutral 3 (#989898)
  },
  dark: {
    text: ThemeColors.neutral[6], // Neutral 6 (#FFFFFF)
    background: ThemeColors.neutral[1], // Neutral 1 (#343434)
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: ThemeColors.neutral[3], // Neutral 3 (#989898)
  },
} as const;

export const ThemeTypography = {
  title1: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    lineHeight: 28,
  },
  title2: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 28,
  },
  title3: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
  body1: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  body3: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 21,
  },
  caption1: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    lineHeight: 16,
  },
  caption2: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 16,
  },
} as const;

export type ThemeTypographyType = typeof ThemeTypography;

export const ThemeEffects = {
  card1: {
    shadowColor: '#3629B7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 30,
    elevation: 4,
  },
  card2: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 30,
    elevation: 5,
  },
  tabBar: {
    shadowColor: '#3629B7',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.07,
    shadowRadius: 30,
    elevation: 5,
  },
} as const;

export type ThemeEffectsType = typeof ThemeEffects;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

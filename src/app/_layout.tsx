import { NavigationBar } from '@/components/NavigationBar';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export interface CustomScreenOptions {
  title?: string;
  headerShown?: boolean;
  headerTheme?: 'white' | 'black';
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Poppins-Regular': require('@/assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('@/assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-Light': require('@/assets/fonts/Poppins/Poppins-Light.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        header: ({ options, route, navigation }) => {
          const title = options.title ?? route.name;
          const customOptions = options as CustomScreenOptions;
          const theme = customOptions.headerTheme ?? 'white';

          return (
            <NavigationBar
              title={title}
              theme={theme}
              onBackPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  router.replace('/');
                }
              }}
              rightIcon={options.headerRight?.({ tintColor: theme === 'white' ? '#343434' : '#FFFFFF' })}
            />
          );
        },
      }}
    >
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen
        name='sign-in'
        options={
          {
            title: 'Sign in',
            headerTheme: 'black',
            headerShown: true,
          } as CustomScreenOptions as React.ComponentProps<
            typeof Stack.Screen
          >['options']
        }
      />
      <Stack.Screen
        name='sign-up'
        options={
          {
            title: 'Sign up',
            headerTheme: 'black',
            headerShown: true,
          } as CustomScreenOptions as React.ComponentProps<
            typeof Stack.Screen
          >['options']
        }
      />
      <Stack.Screen
        name='forgot-password'
        options={
          {
            title: 'Forgot password',
            headerTheme: 'white',
            headerShown: true,
          } as CustomScreenOptions as React.ComponentProps<
            typeof Stack.Screen
          >['options']
        }
      />
      <Stack.Screen
        name='component-catalog'
        options={
          {
            title: 'Figma Component Catalog',
            headerTheme: 'white',
            headerShown: true,
          } as CustomScreenOptions as React.ComponentProps<
            typeof Stack.Screen
          >['options']
        }
      />
      <Stack.Screen
        name='pay-the-bill'
        options={
          {
            title: 'Pay the bill',
            headerTheme: 'white',
            headerShown: true,
          } as CustomScreenOptions as React.ComponentProps<
            typeof Stack.Screen
          >['options']
        }
      />
      <Stack.Screen
        name='payment-history'
        options={
          {
            title: 'Payment history',
            headerTheme: 'white',
            headerShown: true,
          } as CustomScreenOptions as React.ComponentProps<
            typeof Stack.Screen
          >['options']
        }
      />
      <Stack.Screen
        name='internet-bill'
        options={
          {
            title: 'Internet bill',
            headerTheme: 'white',
            headerShown: true,
          } as CustomScreenOptions as React.ComponentProps<
            typeof Stack.Screen
          >['options']
        }
      />
      <Stack.Screen
        name='account-management'
        options={
          {
            title: 'Management',
            headerTheme: 'white',
            headerShown: true,
          } as CustomScreenOptions as React.ComponentProps<
            typeof Stack.Screen
          >['options']
        }
      />
      <Stack.Screen
        name='beneficiary'
        options={
          {
            title: 'Beneficiary',
            headerTheme: 'white',
            headerShown: true,
          } as CustomScreenOptions as React.ComponentProps<
            typeof Stack.Screen
          >['options']
        }
      />
    </Stack>
  );
}

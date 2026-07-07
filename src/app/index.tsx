import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import '../global.css';

export default function App() {
  return (
    <View className='flex-1 bg-neutral-6 justify-center items-center px-6 gap-4'>
      <Link href='/sign-in' asChild>
        <Pressable className='w-64 bg-primary-1 py-3 px-8 rounded-2xl shadow-card-1 active:bg-primary-2 items-center'>
          <Text className='text-neutral-6 text-title-3 font-semibold'>
            Go to Sign-in Screen
          </Text>
        </Pressable>
      </Link>

      <Link href='/pay-the-bill' asChild>
        <Pressable className='w-64 bg-primary-3 py-3 px-8 rounded-2xl shadow-card-1 active:bg-primary-2 items-center'>
          <Text className='text-primary-1 text-title-3 font-semibold'>
            Go to Pay the Bill Screen
          </Text>
        </Pressable>
      </Link>

      <Link href='/payment-history' asChild>
        <Pressable className='w-64 bg-primary-3 py-3 px-8 rounded-2xl shadow-card-1 active:bg-primary-2 items-center'>
          <Text className='text-primary-1 text-title-3 font-semibold'>
            Go to Payment History Screen
          </Text>
        </Pressable>
      </Link>

      <Link href='/internet-bill' asChild>
        <Pressable className='w-64 bg-primary-3 py-3 px-8 rounded-2xl shadow-card-1 active:bg-primary-2 items-center'>
          <Text className='text-primary-1 text-title-3 font-semibold'>
            Go to Internet Bill Screen
          </Text>
        </Pressable>
      </Link>

      <Link href='/component-catalog' asChild>
        <Pressable className='w-64 bg-primary-3 py-3 px-8 rounded-2xl shadow-card-1 active:bg-primary-2 items-center'>
          <Text className='text-primary-1 text-title-3 font-semibold'>
            Go to Component Catalog
          </Text>
        </Pressable>
      </Link>

      <Link href='/account-management' asChild>
        <Pressable className='w-64 bg-primary-3 py-3 px-8 rounded-2xl shadow-card-1 active:bg-primary-2 items-center'>
          <Text className='text-primary-1 text-title-3 font-semibold'>
            Go to Account Management
          </Text>
        </Pressable>
      </Link>

      <Link href='/beneficiary' asChild>
        <Pressable className='w-64 bg-primary-3 py-3 px-8 rounded-2xl shadow-card-1 active:bg-primary-2 items-center'>
          <Text className='text-primary-1 text-title-3 font-semibold'>
            Go to Beneficiary Screen
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}

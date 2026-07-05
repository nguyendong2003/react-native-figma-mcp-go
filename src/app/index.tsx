import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import "../global.css";

export default function App() {
  return (
    <View className="flex-1 bg-neutral-6 justify-center items-center px-6">
      <Link href="/sign-in" asChild>
        <Pressable className="bg-primary-1 py-3 px-8 rounded-2xl shadow-card-1 active:bg-primary-2">
          <Text className="text-neutral-6 text-title-3 font-semibold">
            Go to Sign-in Screen
          </Text>
        </Pressable>
      </Link>
      <Text className="text-red-500 text-xl">Hello World!</Text>
    </View>
  );
}

import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuthStore } from "../stores/auth-store";

export default function Index() {
  const { session, isLoading, isOnboarded } = useAuthStore();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-brand-950">
        <ActivityIndicator size="large" color="#3381FF" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  if (!isOnboarded) {
    return <Redirect href="/onboarding/role" />;
  }

  return <Redirect href="/(tabs)/today" />;
}

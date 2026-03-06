import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

function DashboardCard({
  title,
  subtitle,
  accent,
}: {
  title: string;
  subtitle: string;
  accent: string;
}) {
  return (
    <View className="bg-brand-900 rounded-2xl p-5 mb-4">
      <View className="flex-row items-center mb-2">
        <View className={`w-2 h-2 rounded-full mr-2 ${accent}`} />
        <Text className="text-white font-semibold text-lg">{title}</Text>
      </View>
      <Text className="text-brand-300">{subtitle}</Text>
      <View className="mt-4 bg-brand-800 rounded-xl py-8 items-center">
        <Text className="text-brand-400 text-sm font-medium">
          Coming Soon
        </Text>
      </View>
    </View>
  );
}

export default function TodayScreen() {
  return (
    <ScrollView className="flex-1 bg-brand-950 px-5 pt-4">
      <Text className="text-2xl font-bold text-white mb-1">Today</Text>
      <Text className="text-brand-300 mb-6">Your daily training overview</Text>

      <DashboardCard
        title="Run"
        subtitle="Your scheduled run for today"
        accent="bg-green-400"
      />
      <DashboardCard
        title="Strength"
        subtitle="Your strength session"
        accent="bg-orange-400"
      />
      <DashboardCard
        title="Nutrition"
        subtitle="Calories & macro targets"
        accent="bg-blue-400"
      />
      <DashboardCard
        title="Recovery"
        subtitle="Sleep, readiness & heart rate"
        accent="bg-purple-400"
      />

      <TouchableOpacity
        className="mb-8 items-center"
        onPress={() => router.push("/settings")}
      >
        <Text className="text-brand-400 text-sm">Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

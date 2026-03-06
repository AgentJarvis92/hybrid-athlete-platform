import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { OnboardingShell } from "../../components/onboarding/OnboardingShell";
import { useOnboardingStore } from "../../stores/onboarding-store";

const TOTAL_STEPS = 7;

export default function RaceScreen() {
  const { raceDistance, raceDate, setRaceDistance, setRaceDate } =
    useOnboardingStore();

  return (
    <OnboardingShell
      title="Race Details"
      subtitle="Optional — add if you're training for a specific race"
      step={3}
      totalSteps={TOTAL_STEPS}
      canContinue={true}
      onContinue={() => router.push("/onboarding/schedule")}
    >
      <View className="mb-5">
        <Text className="text-sm text-brand-200 mb-2">Race Distance</Text>
        <TextInput
          className="bg-brand-900 text-white px-4 py-3.5 rounded-xl text-base"
          placeholder="e.g. Marathon, Half Marathon, 10K"
          placeholderTextColor="#59A3FF"
          value={raceDistance}
          onChangeText={setRaceDistance}
        />
      </View>

      <View className="mb-5">
        <Text className="text-sm text-brand-200 mb-2">Race Date</Text>
        <TextInput
          className="bg-brand-900 text-white px-4 py-3.5 rounded-xl text-base"
          placeholder="e.g. November 2, 2026"
          placeholderTextColor="#59A3FF"
          value={raceDate}
          onChangeText={setRaceDate}
        />
      </View>

      <TouchableOpacity
        className="mt-2"
        onPress={() => router.push("/onboarding/schedule")}
      >
        <Text className="text-brand-400 text-base">Skip this step</Text>
      </TouchableOpacity>
    </OnboardingShell>
  );
}

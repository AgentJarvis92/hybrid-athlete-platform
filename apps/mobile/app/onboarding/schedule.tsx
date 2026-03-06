import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { OnboardingShell } from "../../components/onboarding/OnboardingShell";
import { useOnboardingStore } from "../../stores/onboarding-store";

const TOTAL_STEPS = 7;
const DAY_OPTIONS = [3, 4, 5, 6, 7];

export default function ScheduleScreen() {
  const { trainingDaysPerWeek, setTrainingDays } = useOnboardingStore();

  return (
    <OnboardingShell
      title="Training Schedule"
      subtitle="How many days per week can you train?"
      step={4}
      totalSteps={TOTAL_STEPS}
      canContinue={true}
      onContinue={() => router.push("/onboarding/experience")}
    >
      <View className="flex-row flex-wrap gap-3">
        {DAY_OPTIONS.map((days) => (
          <TouchableOpacity
            key={days}
            className={`w-16 h-16 rounded-xl items-center justify-center border-2 ${
              trainingDaysPerWeek === days
                ? "border-brand-500 bg-brand-900"
                : "border-brand-800 bg-brand-950"
            }`}
            onPress={() => setTrainingDays(days)}
          >
            <Text
              className={`text-2xl font-bold ${
                trainingDaysPerWeek === days ? "text-brand-400" : "text-white"
              }`}
            >
              {days}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text className="text-brand-300 mt-4 text-sm">
        {trainingDaysPerWeek} days per week
      </Text>
    </OnboardingShell>
  );
}

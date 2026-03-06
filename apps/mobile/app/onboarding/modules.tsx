import { View, Text, TouchableOpacity, Switch } from "react-native";
import { router } from "expo-router";
import { OnboardingShell } from "../../components/onboarding/OnboardingShell";
import { useOnboardingStore } from "../../stores/onboarding-store";

const TOTAL_STEPS = 7;

const MODULE_INFO = [
  { key: "running" as const, label: "Running", desc: "Run training, GPS tracking, Strava sync" },
  { key: "strength" as const, label: "Strength", desc: "Workout programming, set logging" },
  { key: "nutrition" as const, label: "Nutrition", desc: "Meal logging, macro tracking" },
];

export default function ModulesScreen() {
  const { modules, toggleModule } = useOnboardingStore();

  const atLeastOne = modules.running || modules.strength || modules.nutrition;

  return (
    <OnboardingShell
      title="Your Modules"
      subtitle="Choose which training modules to enable"
      step={6}
      totalSteps={TOTAL_STEPS}
      canContinue={atLeastOne}
      onContinue={() => router.push("/onboarding/coach")}
    >
      {MODULE_INFO.map(({ key, label, desc }) => (
        <View
          key={key}
          className="flex-row items-center justify-between bg-brand-900 px-5 py-4 rounded-xl mb-3"
        >
          <View className="flex-1 mr-4">
            <Text className="text-white text-lg font-semibold">{label}</Text>
            <Text className="text-brand-300 text-sm mt-1">{desc}</Text>
          </View>
          <Switch
            value={modules[key]}
            onValueChange={() => toggleModule(key)}
            trackColor={{ false: "#19378F", true: "#3381FF" }}
            thumbColor="#fff"
          />
        </View>
      ))}
    </OnboardingShell>
  );
}

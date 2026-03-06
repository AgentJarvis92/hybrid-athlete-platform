import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

interface Props {
  title: string;
  subtitle: string;
  step: number;
  totalSteps: number;
  canContinue: boolean;
  onContinue: () => void;
  children: React.ReactNode;
}

export function OnboardingShell({
  title,
  subtitle,
  step,
  totalSteps,
  canContinue,
  onContinue,
  children,
}: Props) {
  return (
    <View className="flex-1 bg-brand-950 px-8 pt-16 pb-8">
      {/* Progress bar */}
      <View className="flex-row mb-8 gap-1.5">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <View
            key={i}
            className={`flex-1 h-1 rounded-full ${i < step ? "bg-brand-500" : "bg-brand-900"}`}
          />
        ))}
      </View>

      <Text className="text-3xl font-bold text-white mb-2">{title}</Text>
      <Text className="text-base text-brand-300 mb-8">{subtitle}</Text>

      <View className="flex-1">{children}</View>

      <View className="flex-row gap-3">
        {step > 1 && (
          <TouchableOpacity
            className="flex-1 py-4 rounded-xl items-center border border-brand-700"
            onPress={() => router.back()}
          >
            <Text className="text-brand-300 font-semibold">Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className={`flex-1 py-4 rounded-xl items-center ${canContinue ? "bg-brand-500" : "bg-brand-800"}`}
          onPress={onContinue}
          disabled={!canContinue}
        >
          <Text className="text-white font-semibold">
            {step === totalSteps ? "Get Started" : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

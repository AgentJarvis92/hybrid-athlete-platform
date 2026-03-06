import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { OnboardingShell } from "../../components/onboarding/OnboardingShell";
import { useOnboardingStore } from "../../stores/onboarding-store";
import { useAuthStore } from "../../stores/auth-store";
import { supabase } from "../../lib/supabase";

const TOTAL_STEPS = 7;

export default function CoachScreen() {
  const { inviteCode, setInviteCode, reset } = useOnboardingStore();
  const store = useOnboardingStore();
  const { setIsOnboarded, user } = useAuthStore();

  async function handleComplete() {
    try {
      // Save onboarding data to profile
      if (user) {
        const { error } = await supabase.from("user_profiles").upsert({
          id: user.id,
          role: store.role,
          training_goal: store.trainingGoal,
          race_distance: store.raceDistance || null,
          race_date: store.raceDate || null,
          training_days_per_week: store.trainingDaysPerWeek,
          experience_level: store.experienceLevel,
          modules_running: store.modules.running,
          modules_strength: store.modules.strength,
          modules_nutrition: store.modules.nutrition,
          invite_code: store.inviteCode || null,
          onboarded: true,
        });

        if (error) {
          console.warn("Profile save error (table may not exist yet):", error.message);
        }
      }

      setIsOnboarded(true);
      reset();
      router.replace("/(tabs)/today");
    } catch (err) {
      // Even if profile save fails, allow onboarding to complete
      setIsOnboarded(true);
      reset();
      router.replace("/(tabs)/today");
    }
  }

  return (
    <OnboardingShell
      title="Join a Coach"
      subtitle="Enter an invite code or skip to train solo"
      step={7}
      totalSteps={TOTAL_STEPS}
      canContinue={true}
      onContinue={handleComplete}
    >
      <View className="mb-5">
        <Text className="text-sm text-brand-200 mb-2">Invite Code</Text>
        <TextInput
          className="bg-brand-900 text-white px-4 py-3.5 rounded-xl text-base"
          placeholder="Enter coach invite code"
          placeholderTextColor="#59A3FF"
          value={inviteCode}
          onChangeText={setInviteCode}
          autoCapitalize="characters"
        />
      </View>

      <TouchableOpacity className="mt-2" onPress={handleComplete}>
        <Text className="text-brand-400 text-base">Skip — train solo</Text>
      </TouchableOpacity>
    </OnboardingShell>
  );
}

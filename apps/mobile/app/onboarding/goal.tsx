import { router } from "expo-router";
import { OnboardingShell } from "../../components/onboarding/OnboardingShell";
import { SelectionCard } from "../../components/onboarding/SelectionCard";
import { useOnboardingStore } from "../../stores/onboarding-store";

const TOTAL_STEPS = 7;

export default function GoalScreen() {
  const { trainingGoal, setTrainingGoal } = useOnboardingStore();

  return (
    <OnboardingShell
      title="Training Goal"
      subtitle="What are you training for?"
      step={2}
      totalSteps={TOTAL_STEPS}
      canContinue={trainingGoal !== null}
      onContinue={() => router.push("/onboarding/race")}
    >
      <SelectionCard
        label="Marathon / Half Marathon"
        description="Race-focused running with cross-training"
        selected={trainingGoal === "marathon"}
        onPress={() => setTrainingGoal("marathon")}
      />
      <SelectionCard
        label="General Fitness"
        description="Balanced running, strength, and nutrition"
        selected={trainingGoal === "general_fitness"}
        onPress={() => setTrainingGoal("general_fitness")}
      />
      <SelectionCard
        label="HYROX"
        description="Hybrid racing — run and functional fitness"
        selected={trainingGoal === "hyrox"}
        onPress={() => setTrainingGoal("hyrox")}
      />
    </OnboardingShell>
  );
}

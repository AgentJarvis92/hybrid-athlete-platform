import { router } from "expo-router";
import { OnboardingShell } from "../../components/onboarding/OnboardingShell";
import { SelectionCard } from "../../components/onboarding/SelectionCard";
import { useOnboardingStore } from "../../stores/onboarding-store";

const TOTAL_STEPS = 7;

export default function RoleScreen() {
  const { role, setRole } = useOnboardingStore();

  return (
    <OnboardingShell
      title="Welcome"
      subtitle="How will you use Hybrid Athlete?"
      step={1}
      totalSteps={TOTAL_STEPS}
      canContinue={role !== null}
      onContinue={() => router.push("/onboarding/goal")}
    >
      <SelectionCard
        label="Athlete"
        description="Train with personalized programs"
        selected={role === "athlete"}
        onPress={() => setRole("athlete")}
      />
      <SelectionCard
        label="Coach"
        description="Build programs and manage athletes"
        selected={role === "coach"}
        onPress={() => setRole("coach")}
      />
    </OnboardingShell>
  );
}

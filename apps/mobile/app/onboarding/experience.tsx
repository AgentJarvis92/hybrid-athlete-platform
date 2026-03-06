import { router } from "expo-router";
import { OnboardingShell } from "../../components/onboarding/OnboardingShell";
import { SelectionCard } from "../../components/onboarding/SelectionCard";
import { useOnboardingStore } from "../../stores/onboarding-store";

const TOTAL_STEPS = 7;

export default function ExperienceScreen() {
  const { experienceLevel, setExperienceLevel } = useOnboardingStore();

  return (
    <OnboardingShell
      title="Experience Level"
      subtitle="Where are you in your fitness journey?"
      step={5}
      totalSteps={TOTAL_STEPS}
      canContinue={experienceLevel !== null}
      onContinue={() => router.push("/onboarding/modules")}
    >
      <SelectionCard
        label="Beginner"
        description="New to structured training"
        selected={experienceLevel === "beginner"}
        onPress={() => setExperienceLevel("beginner")}
      />
      <SelectionCard
        label="Intermediate"
        description="1-3 years of consistent training"
        selected={experienceLevel === "intermediate"}
        onPress={() => setExperienceLevel("intermediate")}
      />
      <SelectionCard
        label="Advanced"
        description="3+ years, comfortable with periodization"
        selected={experienceLevel === "advanced"}
        onPress={() => setExperienceLevel("advanced")}
      />
    </OnboardingShell>
  );
}

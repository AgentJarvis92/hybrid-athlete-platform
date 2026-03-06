import { create } from "zustand";

export type Role = "athlete" | "coach";
export type TrainingGoal = "marathon" | "general_fitness" | "hyrox";
export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

interface OnboardingState {
  role: Role | null;
  trainingGoal: TrainingGoal | null;
  raceDistance: string;
  raceDate: string;
  trainingDaysPerWeek: number;
  experienceLevel: ExperienceLevel | null;
  modules: { running: boolean; strength: boolean; nutrition: boolean };
  inviteCode: string;
  setRole: (role: Role) => void;
  setTrainingGoal: (goal: TrainingGoal) => void;
  setRaceDistance: (distance: string) => void;
  setRaceDate: (date: string) => void;
  setTrainingDays: (days: number) => void;
  setExperienceLevel: (level: ExperienceLevel) => void;
  toggleModule: (module: "running" | "strength" | "nutrition") => void;
  setInviteCode: (code: string) => void;
  reset: () => void;
}

const initialState = {
  role: null,
  trainingGoal: null,
  raceDistance: "",
  raceDate: "",
  trainingDaysPerWeek: 5,
  experienceLevel: null,
  modules: { running: true, strength: true, nutrition: true },
  inviteCode: "",
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,
  setRole: (role) => set({ role }),
  setTrainingGoal: (trainingGoal) => set({ trainingGoal }),
  setRaceDistance: (raceDistance) => set({ raceDistance }),
  setRaceDate: (raceDate) => set({ raceDate }),
  setTrainingDays: (trainingDaysPerWeek) => set({ trainingDaysPerWeek }),
  setExperienceLevel: (experienceLevel) => set({ experienceLevel }),
  toggleModule: (module) =>
    set((state) => ({
      modules: { ...state.modules, [module]: !state.modules[module] },
    })),
  setInviteCode: (inviteCode) => set({ inviteCode }),
  reset: () => set(initialState),
}));

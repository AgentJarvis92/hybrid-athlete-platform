import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isOnboarded: boolean;
  setSession: (session: Session | null) => void;
  setIsOnboarded: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: true,
  isOnboarded: false,
  setSession: (session) =>
    set({ session, user: session?.user ?? null, isLoading: false }),
  setIsOnboarded: (isOnboarded) => set({ isOnboarded }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

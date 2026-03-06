import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
  Alert,
} from "react-native";
import { Stack, router } from "expo-router";
import { supabase } from "../lib/supabase";

function SectionHeader({ title }: { title: string }) {
  return (
    <Text className="text-xs uppercase tracking-wider text-brand-400 mb-3 mt-6">
      {title}
    </Text>
  );
}

function SettingsRow({
  label,
  value,
  onPress,
}: {
  label: string;
  value?: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between bg-brand-900 px-4 py-3.5 rounded-xl mb-2"
      onPress={onPress}
      disabled={!onPress}
    >
      <Text className="text-white text-base">{label}</Text>
      {value && <Text className="text-brand-300 text-sm">{value}</Text>}
    </TouchableOpacity>
  );
}

function ModuleToggle({
  label,
  enabled,
  onToggle,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <View className="flex-row items-center justify-between bg-brand-900 px-4 py-3.5 rounded-xl mb-2">
      <Text className="text-white text-base">{label}</Text>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: "#19378F", true: "#3381FF" }}
        thumbColor="#fff"
      />
    </View>
  );
}

export default function SettingsScreen() {
  const [modules, setModules] = useState({
    running: true,
    strength: true,
    nutrition: true,
  });

  function toggleModule(key: "running" | "strength" | "nutrition") {
    setModules((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Settings",
          headerStyle: { backgroundColor: "#0F172A" },
          headerTintColor: "#fff",
        }}
      />
      <ScrollView className="flex-1 bg-brand-950 px-5">
        <SectionHeader title="Profile" />
        <SettingsRow label="Edit Profile" value="Coming soon" />
        <SettingsRow label="Training Goal" value="General Fitness" />
        <SettingsRow label="Experience" value="Intermediate" />

        <SectionHeader title="Modules" />
        <ModuleToggle
          label="Running"
          enabled={modules.running}
          onToggle={() => toggleModule("running")}
        />
        <ModuleToggle
          label="Strength"
          enabled={modules.strength}
          onToggle={() => toggleModule("strength")}
        />
        <ModuleToggle
          label="Nutrition"
          enabled={modules.nutrition}
          onToggle={() => toggleModule("nutrition")}
        />

        <SectionHeader title="Integrations" />
        <SettingsRow label="Strava" value="Connect" />
        <SettingsRow label="Apple Health" value="Connect" />

        <SectionHeader title="Account" />
        <TouchableOpacity
          className="bg-red-900/30 px-4 py-3.5 rounded-xl mb-8"
          onPress={handleLogout}
        >
          <Text className="text-red-400 text-base text-center font-semibold">
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

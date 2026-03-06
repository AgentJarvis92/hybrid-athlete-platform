import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import { supabase } from "../lib/supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) Alert.alert("Login Error", error.message);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-brand-950"
    >
      <View className="flex-1 justify-center px-8">
        <Text className="text-4xl font-bold text-white mb-2">
          Hybrid Athlete
        </Text>
        <Text className="text-lg text-brand-300 mb-10">
          Run. Lift. Fuel. All in one.
        </Text>

        <View className="mb-4">
          <Text className="text-sm text-brand-200 mb-2">Email</Text>
          <TextInput
            className="bg-brand-900 text-white px-4 py-3.5 rounded-xl text-base"
            placeholder="you@example.com"
            placeholderTextColor="#59A3FF"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm text-brand-200 mb-2">Password</Text>
          <TextInput
            className="bg-brand-900 text-white px-4 py-3.5 rounded-xl text-base"
            placeholder="Your password"
            placeholderTextColor="#59A3FF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className={`py-4 rounded-xl items-center ${loading ? "bg-brand-700" : "bg-brand-500"}`}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-white font-semibold text-base">
            {loading ? "Signing in..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        <Link href="/register" asChild>
          <TouchableOpacity className="mt-6 items-center">
            <Text className="text-brand-300 text-base">
              Don't have an account?{" "}
              <Text className="text-brand-400 font-semibold">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

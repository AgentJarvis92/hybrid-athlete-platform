import { View, Text } from "react-native";

interface Props {
  title: string;
  description: string;
  phase: string;
}

export function PlaceholderScreen({ title, description, phase }: Props) {
  return (
    <View className="flex-1 bg-brand-950 items-center justify-center px-8">
      <View className="bg-brand-900 rounded-2xl p-8 items-center w-full">
        <Text className="text-3xl font-bold text-white mb-2">{title}</Text>
        <Text className="text-brand-300 text-center mb-4">{description}</Text>
        <View className="bg-brand-800 px-4 py-2 rounded-full">
          <Text className="text-brand-400 text-xs font-medium">{phase}</Text>
        </View>
      </View>
    </View>
  );
}

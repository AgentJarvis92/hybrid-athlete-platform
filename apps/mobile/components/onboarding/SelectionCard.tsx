import { TouchableOpacity, Text, View } from "react-native";

interface Props {
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
}

export function SelectionCard({ label, description, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      className={`px-5 py-4 rounded-xl mb-3 border-2 ${
        selected ? "border-brand-500 bg-brand-900" : "border-brand-800 bg-brand-950"
      }`}
      onPress={onPress}
    >
      <Text className={`text-lg font-semibold ${selected ? "text-brand-400" : "text-white"}`}>
        {label}
      </Text>
      {description && (
        <Text className="text-sm text-brand-300 mt-1">{description}</Text>
      )}
    </TouchableOpacity>
  );
}

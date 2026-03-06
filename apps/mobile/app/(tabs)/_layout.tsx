import { Tabs } from "expo-router";
import { Text } from "react-native";

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = {
    today: "T",
    training: "C",
    nutrition: "N",
    progress: "P",
    messages: "M",
  };
  return (
    <Text
      className={`text-base font-bold ${focused ? "text-brand-400" : "text-brand-600"}`}
    >
      {icons[name] ?? "?"}
    </Text>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#0F172A" },
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#0F172A",
          borderTopColor: "#19378F",
          borderTopWidth: 1,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#3381FF",
        tabBarInactiveTintColor: "#59A3FF",
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
          title: "Today",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="today" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: "Training",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="training" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: "Nutrition",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="nutrition" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="progress" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="messages" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

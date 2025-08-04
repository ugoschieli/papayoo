import { Tabs } from "expo-router";
import { Dices, Puzzle } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="[id]"
        options={{
          title: "Game",
          tabBarIcon: ({ color }) => (
            <Puzzle className="text-foreground" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dice"
        options={{
          title: "Dice",
          tabBarIcon: ({ color }) => (
            <Dices className="text-foreground" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

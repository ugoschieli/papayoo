import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Club, Diamond, Heart, Spade } from "~/lib/icons/icons";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = ["Hearts", "Diamonds", "Clubs", "Spades"] as const;
type Color = (typeof colors)[number];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function renderColor(color: Color | null) {
  if (!color)
    return (
      <>
        <Text>Click the roll button</Text>
      </>
    );
  switch (color) {
    case "Hearts":
      return <Heart className="text-foreground" size={50} />;
    case "Diamonds":
      return <Diamond className="text-foreground" size={50} />;
    case "Clubs":
      return <Club className="text-foreground" size={50} />;
    case "Spades":
      return <Spade className="text-foreground" size={50} />;
  }
}

async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default function DiceTab() {
  const [color, setColor] = useState<Color | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView className="flex-1">
      <Button
        className="mt-40 self-center w-48"
        variant={"destructive"}
        onPress={async () => {
          setLoading(true);
          setColor(colors[getRandomInt(colors.length)]);
          await sleep(1000);
          setLoading(false);
        }}
      >
        <Text>Roll</Text>
      </Button>
      <View className="mt-12 items-center">
        {loading ? <Text>...</Text> : renderColor(color)}
      </View>
    </SafeAreaView>
  );
}

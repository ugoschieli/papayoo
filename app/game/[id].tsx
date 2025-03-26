import { H1 } from "~/components/ui/typography";
import { useGame } from "~/lib/game/game";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GamePage() {
  const { id } = useLocalSearchParams();
  const { data: game, error, isPending } = useGame(id as string);

  return (
    <SafeAreaView className="flex-1">
      {game && (
        <View className="self-center">
          <H1 className="mt-4">{game.name}</H1>
        </View>
      )}
    </SafeAreaView>
  );
}

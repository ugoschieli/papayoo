import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { H1, H2, P } from "~/components/ui/typography";
import { useGame } from "~/lib/game/game";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GamePage() {
  const { id } = useLocalSearchParams();
  const { data: game } = useGame(id as string);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      {game && (
        <>
          <View className="self-center">
            <H1 className="mt-4">{game.name}</H1>
          </View>
          <Button
            className="mt-4 self-center"
            variant={"destructive"}
            onPress={() => {
              router.push(`/new-round/${id}`);
            }}
          >
            <Text>New round</Text>
          </Button>
          <View className="mx-4 mt-4">
            <H2 className="border-0">Summary</H2>
            <P>{`Number of players: ${game.players.length}`}</P>
            <P>{`Creation date: ${game.creationDate.toDateString()}`}</P>
            <P>{`Last played date: ${game.lastPlayedDate.toDateString()}`}</P>
          </View>
          <View className="mx-4 mt-4">
            <H2 className="border-0">Scores</H2>
            {game.players
              .sort((a, b) => a.score - b.score)
              .map((player, index) => (
                <Text
                  key={player.name}
                >{`${index + 1}. ${player.name}: ${player.score} points`}</Text>
              ))}
          </View>
          <View className="mx-4 mt-4">
            <H2 className="border-0">History</H2>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

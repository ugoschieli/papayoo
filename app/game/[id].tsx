import { Button } from "~/components/ui/button";
import {
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Text } from "~/components/ui/text";
import { H1, H2, P } from "~/components/ui/typography";
import { Round, useGame } from "~/lib/game/game";
import { randomUUID } from "expo-crypto";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ScoreTableRow({ item }: { item: Round }) {
  return (
    <TableRow>
      {item.map((i) => (
        <TableCell key={i.playerId} className="w-32">
          <Text>{i.score}</Text>
        </TableCell>
      ))}
    </TableRow>
  );
}

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
            {[...game.players]
              .sort((a, b) => a.score - b.score)
              .map((player) => {
                return { name: player.name, score: player.score, rank: 0 };
              })
              .map((player, index, array) => {
                let rank;
                if (index === 0) {
                  rank = 1;
                } else {
                  if (array[index - 1].score === player.score) {
                    rank = array[index - 1].rank;
                  } else {
                    rank = index + 1;
                  }
                }

                array[index].rank = rank;
                return { name: player.name, score: player.score, rank };
              })
              .map((player, _, array) => {
                let maxRank = array
                  .map((a) => a.rank)
                  .reduce((acc, curr) => {
                    return Math.max(acc, curr);
                  }, array[0].rank);

                let emoji = null;
                switch (player.rank) {
                  case 1:
                    emoji = "👑";
                    break;
                  case maxRank:
                    emoji = "🍆";
                    break;
                }

                return (
                  <Text
                    key={player.name}
                  >{`${player.rank}. ${player.name}: ${player.score} points ${emoji !== null ? emoji : ""}`}</Text>
                );
              })}
          </View>
          <View className="mx-4 mt-4 flex-1">
            <H2 className="border-0">History</H2>
            <ScrollView horizontal>
              <View className="flex-1 flex flex-col">
                <TableHeader>
                  <TableRow>
                    {game.players.map((player) => (
                      <TableHead key={player.id} className="w-32">
                        <Text>{player.name}</Text>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <FlatList
                  data={game.rounds}
                  keyExtractor={() => randomUUID()}
                  renderItem={({ item }) => <ScoreTableRow item={item} />}
                ></FlatList>
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

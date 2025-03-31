import PointsSelector from "~/components/PointsSelector";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { H1, H2 } from "~/components/ui/typography";
import { basePointsState, Player, PointsState, useGame } from "~/lib/game/game";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function PlayerCard({
  player,
  points,
  setPoints,
  getCurrentPoints,
}: {
  player: Player;
  points: PointsState;
  setPoints: React.Dispatch<React.SetStateAction<PointsState>>;
  getCurrentPoints: (points: PointsState, playerId: string) => number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Card key={player.id} className="mb-4 p-4">
      <View className="flex flex-row items-center justify-between">
        <CardHeader>
          <CardTitle>{player.name}</CardTitle>
          <CardDescription>{`Previous total: ${player.score} points`}</CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <Button
            onPress={() => {
              setOpen(!open);
            }}
          >
            <Text>Toggle</Text>
          </Button>
          <Badge variant={"destructive"} className="mt-2">
            <Text>{getCurrentPoints(points, player.id)}</Text>
          </Badge>
        </CardContent>
      </View>
      {open && (
        <PointsSelector player={player} points={points} setPoints={setPoints} />
      )}
    </Card>
  );
}

export default function NewRoundPage() {
  const { gameId } = useLocalSearchParams();
  const { data: game, getRoundPoints, add } = useGame(gameId as string);
  const [points, setPoints] = useState<PointsState>(basePointsState);

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
              add({ game, points, getRoundPoints });
            }}
          >
            <Text>Add round</Text>
          </Button>
          <View className="mx-4 mt-4 flex-1">
            <H2 className="border-0">Scores</H2>
            <ScrollView>
              {game.players.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  points={points}
                  setPoints={setPoints}
                  getCurrentPoints={getRoundPoints}
                />
              ))}
            </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

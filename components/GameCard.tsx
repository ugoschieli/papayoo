import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import type { Game } from "~/lib/game/game";
import { useCallback } from "react";
import { useRouter } from "expo-router";

export default function GameCard({ game }: { game: Game }) {
  const router = useRouter();

  const onContinuePress = useCallback((id: string) => {
    router.push(`/game/${id}`);
  }, []);

  return (
    <Card className="mt-4 mx-16" key={game.id}>
      <CardHeader>
        <CardTitle>{game.name}</CardTitle>
        <CardDescription>{`${game.players.length} players\ncreated: ${game.creationDate.toDateString()}\nlast played: ${game.lastPlayedDate.toDateString()}`}</CardDescription>
        <CardContent>
          {game.players.map((player) => (
            <Text
              key={player.name}
            >{`${player.name}: ${player.score} points`}</Text>
          ))}
          <Button
            className="mt-2"
            variant={"secondary"}
            onPress={() => {
              onContinuePress(game.id);
            }}
          >
            <Text>Continue Game</Text>
          </Button>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

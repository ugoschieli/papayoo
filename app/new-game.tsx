import { NumberInput } from "~/components/NumberInput";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { H1 } from "~/components/ui/typography";
import { useState, useCallback } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGames } from "~/lib/game/game";

export default function NewGame() {
  const { create } = useGames();
  const [name, setName] = useState("");
  const [playerNumber, setPlayerNumber] = useState(4);
  const [players, setPlayers] = useState<string[]>([]);

  const onChangeName = useCallback((name: string) => {
    setName(name);
  }, []);

  const onDecrement = useCallback(() => {
    setPlayerNumber((old) => (old > 4 ? old - 1 : old));
  }, []);

  const onIncrement = useCallback(() => {
    setPlayerNumber((old) => (old < 8 ? old + 1 : old));
  }, []);

  const onPlayerChange = useCallback((index: number, name: string) => {
    setPlayers((old) => {
      const next = [...old];
      next[index] = name;
      return next;
    });
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="self-center">
          <H1 className="mt-4">New Game</H1>
        </View>
        <View className="mt-4 mx-4">
          <Label nativeID="name">Game name</Label>
          <Input
            placeholder="Example"
            aria-labelledby="name"
            value={name}
            onChangeText={onChangeName}
          />
        </View>
        <View className="mt-4 mx-4">
          <Label nativeID="player-number">Player number</Label>
          <NumberInput
            value={playerNumber}
            onDecrement={onDecrement}
            onIncrement={onIncrement}
          />
        </View>
        {[...Array(playerNumber)].map((_, index) => (
          <View key={`player-${index}`} className="mt-4 mx-4">
            <Label nativeID={`player-${index}`}>{`Player ${index + 1}`}</Label>
            <Input
              placeholder="Player name"
              aria-labelledby={`player-${index}`}
              value={players[index]}
              onChangeText={(name) => {
                onPlayerChange(index, name);
              }}
            />
          </View>
        ))}
        <Button
          className="mt-4 mb-4 self-center"
          onPress={() => {
            create({ name, players });
          }}
        >
          <Text>Create Game</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

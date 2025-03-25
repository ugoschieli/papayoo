import { useCallback } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { Text } from "~/components/ui/text";
import { H1 } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";
import GameCard from "~/components/GameCard";

import { useGames } from "~/lib/game/game";
import type { Game } from "~/lib/game/game";

export default function App() {
  const { games, isLoading, resetGames } = useGames();

  const onBuyGamePress = useCallback(async () => {
    WebBrowser.openBrowserAsync(
      "https://www.philibertnet.com/en/gigamic/11512-papayoo-3421276805415.html",
    );
  }, []);

  const onNewGame = useCallback(() => {}, []);

  const renderGames = ({ item }: { item: Game }) => (
    <GameCard game={item}></GameCard>
  );

  return (
    <SafeAreaView className="flex-1 items-center">
      <H1 className="mt-4">Papayoo Points Counter</H1>
      <Text className="mt-2">Welcome to the Papayoo world ! ♥️♠️♦️♣️7️⃣</Text>
      <Button className="mt-8" onPress={onNewGame}>
        <Text className="px-8">New Game</Text>
      </Button>
      {!isLoading && (
        <FlatList
          className="w-full"
          data={games}
          renderItem={renderGames}
        ></FlatList>
      )}
      <Button className="mb-4" onPress={resetGames}>
        <Text>Reset state</Text>
      </Button>
      <Button className="mb-4" variant={"link"} onPress={onBuyGamePress}>
        <Text>Buy a Papayoo card game</Text>
      </Button>
    </SafeAreaView>
  );
}

import GameCard from "~/components/GameCard";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { H1 } from "~/components/ui/typography";
import { useGames, type Game } from "~/lib/game/game";
import { FileDown, FileUp } from "~/lib/icons/icons";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const { games, jsonExport, jsonImport } = useGames();
  const router = useRouter();

  const onBuyGamePress = useCallback(async () => {
    WebBrowser.openBrowserAsync(
      "https://www.philibertnet.com/en/gigamic/11512-papayoo-3421276805415.html",
    );
  }, []);

  const onNewGame = useCallback(() => {
    router.push("/new-game");
  }, [router]);

  const onExportGames = useCallback(() => {
    jsonExport();
  }, [jsonExport]);

  const onImportGames = useCallback(() => {
    jsonImport();
  }, [jsonImport]);

  const renderGames = ({ item }: { item: Game }) => (
    <GameCard game={item}></GameCard>
  );

  return (
    <SafeAreaView className="flex-1 items-center">
      <H1 className="mt-4 text-center">Papayoo Points Counter</H1>
      <Text className="mt-2">Welcome to the Papayoo world ! ♥️♠️♦️♣️7️⃣</Text>
      <View className="flex-row gap-4">
        <Button variant={"destructive"} className="mt-8" onPress={onNewGame}>
          <Text className="px-8">New Game</Text>
        </Button>
        <Button className="mt-8" onPress={onExportGames}>
          <FileUp className="text-background" />
        </Button>
        <Button className="mt-8" onPress={onImportGames}>
          <FileDown className="text-background" />
        </Button>
      </View>
      {!games || games.length === 0 ? (
        <View className="flex-1 flex justify-center">
          <Text>No games yet</Text>
        </View>
      ) : (
        <FlatList
          className="w-full"
          data={games}
          renderItem={renderGames}
        ></FlatList>
      )}
      <Button className="mb-4" variant={"link"} onPress={onBuyGamePress}>
        <Text>Buy a Papayoo card game</Text>
      </Button>
    </SafeAreaView>
  );
}

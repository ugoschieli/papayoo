import { randomUUID } from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export type Player = {
  name: string;
  score: number;
};

export type Game = {
  id: string;
  name: string;
  players: Player[];
  creationDate: Date;
  lastPlayedDate: Date;
};

const reviver = (key: string, value: any) => {
  if (key === "creationDate" || key === "lastPlayedDate") {
    return new Date(value);
  }
  return value;
};

const fetchGames = () =>
  AsyncStorage.getItem("games").then((data) => {
    if (!data) return null;
    return JSON.parse(data, reviver) as Game[];
  });

const createGame = async (game: { name: string; players: string[] }) => {
  const newGame: Game = {
    id: randomUUID(),
    name: game.name,
    players: game.players.map((name) => {
      return { name, score: 0 };
    }),
    creationDate: new Date(),
    lastPlayedDate: new Date(),
  };

  const data = await AsyncStorage.getItem("games");
  if (!data) {
    await AsyncStorage.setItem("games", JSON.stringify([newGame] as Game[]));
    return newGame;
  }

  const games = JSON.parse(data, reviver) as Game[];
  games.push(newGame);
  await AsyncStorage.setItem("games", JSON.stringify(games));

  return newGame;
};

export const queryClient = new QueryClient();

export function useGames() {
  const router = useRouter();

  const { isPending, error, data } = useQuery({
    queryKey: ["games"],
    queryFn: () => fetchGames(),
  });

  const { mutate: create, data: created } = useMutation({
    mutationFn: (game: { name: string; players: string[] }) => {
      return createGame(game);
    },
    onSuccess: (game) => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      router.replace(`/game/${game.id}`);
    },
  });

  return { isPending, error, games: data, create, created };
}

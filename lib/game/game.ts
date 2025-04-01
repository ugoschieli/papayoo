import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { randomUUID } from "expo-crypto";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export type Player = {
  id: string;
  name: string;
  score: number;
};

export type Round = { playerId: string; score: number }[];

export type Game = {
  id: string;
  name: string;
  players: Player[];
  rounds: Round[];
  creationDate: Date;
  lastPlayedDate: Date;
};

export type Point =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "papayoo";

export type PointsState = Record<Point, string | null>;

export const basePointsState: PointsState = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
  10: null,
  11: null,
  12: null,
  13: null,
  14: null,
  15: null,
  16: null,
  17: null,
  18: null,
  19: null,
  20: null,
  papayoo: null,
};

const reviver = (key: string, value: any) => {
  if (key === "creationDate" || key === "lastPlayedDate") {
    return new Date(value);
  }
  return value;
};

const fetchGameById = async (id: string) => {
  const data = await AsyncStorage.getItem("games");
  if (!data) throw new Error("Didn't find any games in AsyncStorage");

  const games = JSON.parse(data, reviver) as Game[];
  const selected = games.filter((game) => game.id === id)[0];
  return selected;
};

const fetchGames = () =>
  AsyncStorage.getItem("games").then((data) => {
    if (!data) return null;
    return JSON.parse(data, reviver) as Game[];
  });

const createGame = async (game: { name: string; players: string[] }) => {
  const newGame: Game = {
    id: randomUUID(),
    name: game.name.trim(),
    players: game.players.map((name) => {
      return { id: randomUUID(), name: name.trim(), score: 0 };
    }),
    rounds: [],
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

const deleteGameById = async (params: { id: string }) => {
  const data = await AsyncStorage.getItem("games");
  if (!data) return;

  const games = JSON.parse(data, reviver) as Game[];
  const filtered = games.filter((game) => game.id !== params.id);

  await AsyncStorage.setItem("games", JSON.stringify(filtered));
};

const updateGame = async (game: Game) => {
  const data = await AsyncStorage.getItem("games");
  if (!data) throw new Error("Didn't find any games in AsyncStorage");

  const games = JSON.parse(data, reviver) as Game[];
  const index = findGameIndex(games, game)!;
  games[index] = game;

  await AsyncStorage.setItem("games", JSON.stringify(games));
};

const getRoundPointsFn = (points: PointsState, playerId: string) => {
  const currentPoints = Object.entries(points)
    .filter(([_, state]) => state === playerId)
    .map(([point, _]) => point as Point);

  let sum = 0;
  currentPoints.forEach((point) => {
    if (point === "papayoo") {
      sum += 40;
      return;
    }

    sum += Number(point);
  });

  return sum;
};

const findGameIndex = (games: Game[], game: Game) => {
  for (let i = 0; i < games.length; i++) {
    if (games[i].id === game.id) return i;
  }
  return null;
};

const findPlayerIndex = (players: Player[], player: Player) => {
  for (let i = 0; i < players.length; i++) {
    if (players[i].id === player.id) return i;
  }
  return null;
};

const addRound = async (
  game: Game,
  points: PointsState,
  getRoundPoints: (points: PointsState, player: string) => number,
) => {
  const scores: Round = game.players.map((player) => {
    return { playerId: player.id, score: getRoundPoints(points, player.id) };
  });

  const total = scores
    .map((player) => player.score)
    .reduce((prev, curr) => prev + curr, 0);

  if (total !== 250) throw new Error("Not all points are distributed");

  game.players.forEach((player) => {
    const score = scores.find((score) => score.playerId === player.id)!.score;
    const index = findPlayerIndex(game.players, player)!;
    game.players[index].score += score;
  });

  game.rounds.push(scores);
  game.lastPlayedDate = new Date();

  await updateGame(game);
};

export const queryClient = new QueryClient();

export function useGame(id: string) {
  const router = useRouter();

  const { isPending, error, data } = useQuery({
    queryKey: ["games", id],
    queryFn: () => fetchGameById(id),
  });

  const getRoundPoints = useCallback(getRoundPointsFn, []);

  const { mutate: add } = useMutation({
    mutationFn: (params: {
      game: Game;
      points: PointsState;
      getRoundPoints: (points: PointsState, player: string) => number;
    }) => addRound(params.game, params.points, params.getRoundPoints),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      router.dismissTo(`/game/${id}`);
    },
  });

  return { isPending, error, data, getRoundPoints, add };
}

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

  const { mutate: deleteById } = useMutation({
    mutationFn: (params: { id: string }) => {
      return deleteGameById(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });

  return {
    isPending,
    error,
    games: data,
    create,
    created,
    deleteById,
    // addRound,
  };
}

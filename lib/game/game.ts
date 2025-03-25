import { randomUUID } from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

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

const gamesBase: Game[] = [
  {
    id: randomUUID(),
    name: "La chicha",
    players: [
      {
        name: "Ugo",
        score: 512,
      },
      {
        name: "Etienne",
        score: 1002,
      },
      {
        name: "Coco",
        score: 0,
      },
      {
        name: "Loic",
        score: 187,
      },
    ],
    creationDate: new Date(),
    lastPlayedDate: new Date(),
  },
  {
    id: randomUUID(),
    name: "La chicha",
    players: [
      {
        name: "Ugo",
        score: 512,
      },
      {
        name: "Etienne",
        score: 1002,
      },
      {
        name: "Coco",
        score: 0,
      },
      {
        name: "Loic",
        score: 187,
      },
    ],
    creationDate: new Date(),
    lastPlayedDate: new Date(),
  },
  {
    id: randomUUID(),
    name: "La chicha",
    players: [
      {
        name: "Ugo",
        score: 512,
      },
      {
        name: "Etienne",
        score: 1002,
      },
      {
        name: "Coco",
        score: 0,
      },
      {
        name: "Loic",
        score: 187,
      },
    ],
    creationDate: new Date(),
    lastPlayedDate: new Date(),
  },
];

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("games").then((data) => {
      if (!data) {
        setIsLoading(false);
        return;
      }

      const reviver = (key: string, value: any) => {
        if (key === "creationDate" || key === "lastPlayedDate") {
          return new Date(value);
        }
        return value;
      };

      const games: Game[] = JSON.parse(data, reviver);
      setGames(games);
      setIsLoading(false);
    });
  }, [refetch]);

  const resetGames = useCallback(async () => {
    await AsyncStorage.removeItem("games");
    await AsyncStorage.setItem("games", JSON.stringify(gamesBase));
    setRefetch(!refetch);
  }, []);

  return { games, isLoading, resetGames };
}

import { randomUUID } from "expo-crypto";

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

export const games: Game[] = [
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

import { Surface, TennisGround } from "./TennisGround";
import { Tournament } from "./Tournament";
import { User } from "./User";

export type Match = {
  id: number;
  firstPlayer: User;
  secondPlayer: User;
  date: Date;
  firstPlayerScore: number;
  secondPlayerScore: number;
  ground: TennisGround;
  surface: Surface;
  finished: boolean;
  round?: number;
  firstPlayerStats?: PlayerStats;
  secondPlayerStats?: PlayerStats;
  tournament?: Tournament;
};

export type PlayerStats = {
  aces: number;
  doubleFaults: number;
  firstServePercentage: number;
  pointsWonOnFirstServe: number;
  pointsWonOnSecondServe: number;
  breakPointsSaved: number;
  returnPointsWonOnFirstServe: number;
  returnPointsWonOnSecondServe: number;
  breakPointsConverted: number;
  winners: number;
  unforcedErrors: number;
  netPointsWon: number;
  consecutivePointsWon: number;
  servicePointsWon: number;
  returnPointsWon: number;
};

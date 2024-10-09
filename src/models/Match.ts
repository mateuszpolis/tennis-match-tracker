import { PlayerStats } from "./PlayerStats";
import { Surface, TennisGround } from "./TennisGround";
import { TournamentEdition } from "./TournamentEdition";
import { User } from "./User";

export type Match = {
  id: number;
  firstPlayerId: number;
  secondPlayerId: number;
  firstPlayer: User;
  secondPlayer: User;
  date: Date;
  firstPlayerScore: number;
  secondPlayerScore: number;
  groundId: number;
  ground: TennisGround;
  surface: Surface;
  finished: boolean;
  round?: number;
  firstPlayerStats?: PlayerStats;
  secondPlayerStats?: PlayerStats;
  tournamentEdition?: TournamentEdition;
  tournamentEditionId?: number;
};

export type MatchCreationAttributes = {
  firstPlayerId: number;
  secondPlayerId: number;
  date: Date;
  firstPlayerScore: number;
  secondPlayerScore: number;
  groundId: number;
  finished: boolean;
  round?: number;
  firstPlayerStats?: PlayerStats;
  secondPlayerStats?: PlayerStats;
  tournamentEditionId?: number;
};

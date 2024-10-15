import { Surface, TennisGround } from "./TennisGround";
import { TournamentEdition } from "./TournamentEdition";

export type Tournament = {
  id: number;
  name: string;
  points: number;
  surface: Surface;
  ground: TennisGround;
  tennisGroundId: number;
  createdAt: Date;
  editedAt: Date;
  editions?: TournamentEdition[];
};

export type TournamentEditionAttributes = {
  id: number;
  name: string;
  tennisGroundId: number;
  points: number;
};

export type TournamentCreationAttributes = {
  name: string;
  tennisGroundId: number;
  points: number;
};

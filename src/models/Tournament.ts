import { Surface, TennisGround } from "./TennisGround";
import { TournamentEdition } from "./TournamentEdition";

export type Tournament = {
  id: number;
  name: string;
  surface: Surface;
  ground: TennisGround;
  createdAt: Date;
  editedAt: Date;
  editions?: TournamentEdition[];
};

export type TournamentEditionAttributes = {
  id: number;
  name: string;
  tennisGroundId: number;
};

export type TournamentCreationAttributes = {
  name: string;
  tennisGroundId: number;
};

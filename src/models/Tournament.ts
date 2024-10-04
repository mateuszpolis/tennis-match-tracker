import { Surface, TennisGround } from "./TennisGround";

export type Tournament = {
  id: number;
  name: string;
  surface: Surface;
  ground: TennisGround;
};

export type TournamentCreationAttributes = {
  name: string;
  surface: Surface;
  tennisGroundId: number;
};

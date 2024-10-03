import { Surface, TennisGround } from "./TennisGround";

export type Tournament = {
  id: number;
  name: string;
  surface: Surface;
  startDate: Date;
  endDate: Date;
  ground: TennisGround;
};

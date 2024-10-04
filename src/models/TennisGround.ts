import { Tournament } from "./Tournament";

export type TennisGround = {
  id: number;
  name: string;
  description: string;
  constructionDate: Date;
  country: string;
  city: string;
  surface: Surface;
  tournaments?: Tournament[];
};

export type TennisGroundCreationAttributes = {
  name: string;
  description: string;
  constructionDate: Date;
  country: string;
  city: string;
  surface: Surface;
};

export enum Surface {
  CLAY = "CLAY",
  GRASS = "GRASS",
  HARD = "HARD",
}

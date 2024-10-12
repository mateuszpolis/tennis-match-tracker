import { Match } from "./Match";

export enum UserRole {
  Admin = "Admin",
  Moderator = "Moderator",
  User = "User",
}

export enum UserStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export type PlayerAbility = {
  name: string;
  rating: number;
};

export type PlayerInfo = {
  activeSince: Date;
  wins: number;
  losses: number;
  gameHistory: Match[];
  playerPower: PlayerAbility[];
};

export type User = {
  id: number;
  name: string;
  email: string;
  surname: string;
  role: UserRole;
  status: UserStatus;
  rankingPoints: number;
  playerInfo?: PlayerInfo;
};

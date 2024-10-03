import { Match } from "./Match";
import { Surface } from "./TennisGround";

export enum UserRole {
  BACKEND_ADMIN = "BACKEND_ADMIN",
  MANAGER = "MANAGER",
  USER = "USER",
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
  strongPoints: PlayerAbility[];
  weakPoints: PlayerAbility[];
};

export type User = {
  id: number;
  name: string;
  email: string;
  surname: string;
  role: UserRole;
  status: UserStatus;
  playerInfo?: PlayerInfo;
};

// Mock Player Abilities
const strongPoints: PlayerAbility[] = [
  { name: "Serve", rating: 85 },
  { name: "Forehand", rating: 80 },
  { name: "Backhand", rating: 78 },
];

const weakPoints: PlayerAbility[] = [
  { name: "Volley", rating: 60 },
  { name: "Endurance", rating: 65 },
];

// Mock Matches
const gameHistory: Match[] = [
  {
    id: 1,
    firstPlayer: {
      id: 101,
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
      role: UserRole.USER,
      status: UserStatus.Active,
      playerInfo: undefined,
    },
    secondPlayer: {
      id: 102,
      name: "James",
      surname: "Smith",
      email: "james.smith@example.com",
      role: UserRole.USER,
      status: UserStatus.Active,
      playerInfo: undefined,
    },
    date: new Date(2023, 7, 25),
    firstPlayerScore: 6,
    secondPlayerScore: 4,
    ground: {
      id: 1,
      name: "Central Park Tennis Center",
      description:
        "A premier tennis facility located in the heart of Central Park.",
      constructionDate: new Date("2000-05-20"),
      country: "USA",
      city: "New York",
      surface: Surface.HARD,
    },
    surface: Surface.CLAY,
    firstPlayerStats: {
      aces: 5,
      doubleFaults: 2,
      firstServePercentage: 70,
      pointsWonOnFirstServe: 75,
      pointsWonOnSecondServe: 65,
      breakPointsSaved: 3,
      returnPointsWonOnFirstServe: 50,
      returnPointsWonOnSecondServe: 40,
      breakPointsConverted: 2,
      winners: 25,
      unforcedErrors: 15,
      netPointsWon: 8,
      consecutivePointsWon: 5,
      servicePointsWon: 50,
      returnPointsWon: 30,
    },
    secondPlayerStats: {
      aces: 3,
      doubleFaults: 4,
      firstServePercentage: 65,
      pointsWonOnFirstServe: 60,
      pointsWonOnSecondServe: 55,
      breakPointsSaved: 2,
      returnPointsWonOnFirstServe: 45,
      returnPointsWonOnSecondServe: 35,
      breakPointsConverted: 1,
      winners: 20,
      unforcedErrors: 18,
      netPointsWon: 6,
      consecutivePointsWon: 4,
      servicePointsWon: 45,
      returnPointsWon: 28,
    },
  },
  {
    id: 2,
    firstPlayer: {
      id: 101,
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
      role: UserRole.USER,
      status: UserStatus.Active,
      playerInfo: undefined,
    },
    secondPlayer: {
      id: 103,
      name: "David",
      surname: "Johnson",
      email: "david.johnson@example.com",
      role: UserRole.USER,
      status: UserStatus.Active,
      playerInfo: undefined,
    },
    date: new Date(2023, 4, 15),
    firstPlayerScore: 4,
    secondPlayerScore: 6,
    ground: {
      id: 1,
      name: "Central Park Tennis Center",
      description:
        "A premier tennis facility located in the heart of Central Park.",
      constructionDate: new Date("2000-05-20"),
      country: "USA",
      city: "New York",
      surface: Surface.HARD,
    },
    surface: Surface.CLAY,
    firstPlayerStats: {
      aces: 2,
      doubleFaults: 3,
      firstServePercentage: 60,
      pointsWonOnFirstServe: 65,
      pointsWonOnSecondServe: 50,
      breakPointsSaved: 2,
      returnPointsWonOnFirstServe: 40,
      returnPointsWonOnSecondServe: 35,
      breakPointsConverted: 1,
      winners: 18,
      unforcedErrors: 20,
      netPointsWon: 7,
      consecutivePointsWon: 3,
      servicePointsWon: 45,
      returnPointsWon: 25,
    },
    secondPlayerStats: {
      aces: 6,
      doubleFaults: 1,
      firstServePercentage: 80,
      pointsWonOnFirstServe: 78,
      pointsWonOnSecondServe: 70,
      breakPointsSaved: 4,
      returnPointsWonOnFirstServe: 55,
      returnPointsWonOnSecondServe: 45,
      breakPointsConverted: 3,
      winners: 30,
      unforcedErrors: 12,
      netPointsWon: 10,
      consecutivePointsWon: 6,
      servicePointsWon: 60,
      returnPointsWon: 40,
    },
  },
];

// Mock Player Info
const playerInfo: PlayerInfo = {
  activeSince: new Date(2019, 1, 1),
  wins: 1,
  losses: 1,
  gameHistory,
  strongPoints,
  weakPoints,
};

// Mock User Object
export const mockUser: User = {
  id: 101,
  name: "John",
  surname: "Doe",
  email: "john.doe@example.com",
  role: UserRole.USER,
  status: UserStatus.Active,
  playerInfo,
};


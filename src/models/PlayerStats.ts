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

export const higherBetter: string[] = [
  "aces",
  "firstServePercentage",
  "pointsWonOnFirstServe",
  "pointsWonOnSecondServe",
  "breakPointsSaved",
  "returnPointsWonOnFirstServe",
  "returnPointsWonOnSecondServe",
  "breakPointsConverted",
  "winners",
  "netPointsWon",
  "consecutivePointsWon",
  "servicePointsWon",
  "returnPointsWon",
];

export const lowerBetter: string[] = ["doubleFaults", "unforcedErrors"];

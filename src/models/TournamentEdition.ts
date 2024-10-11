import { Match } from "./Match";
import { Tournament } from "./Tournament";
import { User } from "./User";

export type TournamentEdition = {
  id: number;
  year: number;
  tournamentId: number;
  editionName?: string;
  startDate: Date;
  endDate: Date;
  maximumNumberOfContestants: number;
  currentNumberOfContestants: number;
  registrationOpen: boolean;
  winnerId?: number;
  winner?: User;
  tournament?: Tournament;
  players?: UserTournamentEdition[];
  matches?: Match[];
};

export type TournamentEditionCreationAttributes = {
  tournamentId: number;
  editionName?: string;
  startDate: Date;
  endDate: Date;
  maximumNumberOfContestants: number;
};

export type UserTournamentEdition = {
  userId: number;
  tournamentEditionId: number;
  numberOfMatches: number;
  numberOfWins: number;
  numberOfLosses: number;
  round: number;
  pointsReceived: number;

  user?: User;
};

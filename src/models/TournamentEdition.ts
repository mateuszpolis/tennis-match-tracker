import { Tournament } from "./Tournament";

export type TournamentEdition = {
  year: number;
  tournamentId: number;
  editionName?: string;
  startDate: Date;
  endDate: Date;
  maximumNumberOfContestants: number;
  currentNumberOfContestants: number;
  tournament?: Tournament;
};

export type TournamentEditionCreationAttributes = {
  tournamentId: number;
  editionName?: string;
  startDate: Date;
  endDate: Date;
  maximumNumberOfContestants: number;
};

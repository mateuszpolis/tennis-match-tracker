import { CalendarToday, SportsTennis } from "@mui/icons-material";
import React from "react";
import { TournamentEdition } from "../../models/TournamentEdition";
import { Link } from "react-router-dom";

type Props = {
  tournamentEdition: TournamentEdition;
};

function TournamentEditionCard({ tournamentEdition }: Props) {
  console.log(tournamentEdition);

  return (
    <Link
      to={`/tournaments/${tournamentEdition.tournamentId}/edition/${tournamentEdition.year}`}
      key={tournamentEdition.year + tournamentEdition.tournamentId}
      className="bg-white p-5 transition-all shadow-md flex flex-col justify-between hover:shadow-custom"
    >
      <div className="w-full flex items-start justify-between">
        <div>
          {new Date(tournamentEdition.startDate) <= new Date() &&
          new Date(tournamentEdition.endDate) >= new Date() ? (
            <span>Live</span>
          ) : new Date(tournamentEdition.startDate) > new Date() ? (
            <span>Upcoming tournament</span>
          ) : (
            <span>See results</span>
          )}
          <SportsTennis />
        </div>
        {new Date(tournamentEdition.startDate) > new Date() && (
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-1">
              <span>No. of contestants:</span>
              <span
                className={`${
                  tournamentEdition.currentNumberOfContestants <
                  tournamentEdition.maximumNumberOfContestants
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {tournamentEdition.currentNumberOfContestants}
              </span>
              <span>/</span>
              <span>{tournamentEdition.maximumNumberOfContestants}</span>
            </div>
            {tournamentEdition.currentNumberOfContestants <
              tournamentEdition.maximumNumberOfContestants && (
              <div className="p-2 rounded-md bg-primary w-fit text-background font-semibold">
                Sign up!
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">
          {tournamentEdition.editionName || ""}{" "}
          {tournamentEdition.tournament?.name} {tournamentEdition.year}
        </h2>
        <div className="flex items-center space-x-2">
          <CalendarToday />
          <span>
            {new Date(tournamentEdition.startDate).toLocaleDateString("pl-PL")}
          </span>
          <span>-</span>
          <span>
            {new Date(tournamentEdition.endDate).toLocaleDateString("pl-PL")}
          </span>
        </div>
        <div
          className={`text-xs text-background font-semibold py-1 px-2 rounded w-fit ${
            tournamentEdition.tournament?.surface === "CLAY"
              ? "bg-orange-700"
              : tournamentEdition.tournament?.surface === "GRASS"
              ? "bg-green-700"
              : "bg-blue-700"
          }`}
        >
          {tournamentEdition.tournament?.surface}
        </div>
      </div>
    </Link>
  );
}

export default TournamentEditionCard;

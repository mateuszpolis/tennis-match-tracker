import { CalendarToday, SportsTennis } from "@mui/icons-material";
import React from "react";
import { TournamentEdition } from "../../models/TournamentEdition";
import { Link } from "react-router-dom";
import StarsIcon from "@mui/icons-material/Stars";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

type Props = {
  tournamentEdition: TournamentEdition;
};

function TournamentEditionCard({ tournamentEdition }: Props) {
  return (
    <Link
      to={`/tournaments/${tournamentEdition.tournamentId}/edition/${tournamentEdition.year}`}
      key={tournamentEdition.year + tournamentEdition.tournamentId}
      className="bg-white backdrop-blur-lg bg-opacity-80 p-5 transition-all shadow-md flex flex-col justify-between hover:shadow-custom hover:bg-opacity-100"
    >
      {tournamentEdition.registrationOpen && (
        <div className="w-fit text-primary font-semibold">
          Registration open
        </div>
      )}
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
                    tournamentEdition.maximumNumberOfContestants &&
                  tournamentEdition.registrationOpen
                    ? "text-green-600"
                    : ""
                }`}
              >
                {tournamentEdition.currentNumberOfContestants}
              </span>
              <span>/</span>
              <span>{tournamentEdition.maximumNumberOfContestants}</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">
          {tournamentEdition.editionName || ""}{" "}
          {tournamentEdition.tournament?.name} {tournamentEdition.year}
        </h2>
        <div className={`text-xl font-bold flex items-center space-x-2`}>
          {tournamentEdition.tournament?.points}
          {tournamentEdition.tournament?.points === 2000 && <StarsIcon />}
        </div>
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
      <div>
        {tournamentEdition.winner && (
          <div className="flex items-center space-x-2">
            <span>Winner:</span>
            <span className="text-xl font-bold">
              {tournamentEdition.winner.name} {tournamentEdition.winner.surname}
            </span>
            <EmojiEventsIcon />
          </div>
        )}
      </div>
    </Link>
  );
}

export default TournamentEditionCard;

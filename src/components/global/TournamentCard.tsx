import React from "react";
import { Tournament } from "../../models/Tournament";
import { Link } from "react-router-dom";
import { CalendarToday } from "@mui/icons-material";
import StarsIcon from "@mui/icons-material/Stars";

type Props = {
  tournament: Tournament;
};

function TournamentCard({ tournament }: Props) {
  return (
    <Link
      to={`/tournaments/${tournament.id}`}
      key={tournament.id}
      className="bg-white backdrop-blur-lg bg-opacity-80 p-5 transition-all shadow-md flex flex-col justify-between hover:shadow-custom hover:bg-opacity-100"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2">{tournament.name}</h2>
          {tournament.ground && (
            <p className="text-sm text-gray-500">
              {tournament.ground.city}, {tournament.ground.country}
            </p>
          )}
        </div>
        <div className={`text-xl font-bold flex items-center space-x-2`}>
          {tournament.points}
          <StarsIcon />
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center text-gray-600">
          <CalendarToday />
          <p>Since: {new Date(tournament.createdAt).getFullYear()}</p>
        </div>

        <div
          className={`text-xs text-background font-semibold py-1 px-2 rounded ${
            tournament.surface === "CLAY"
              ? "bg-orange-700"
              : tournament.surface === "GRASS"
              ? "bg-green-700"
              : "bg-blue-700"
          }`}
        >
          {tournament.surface}
        </div>
      </div>
    </Link>
  );
}

export default TournamentCard;

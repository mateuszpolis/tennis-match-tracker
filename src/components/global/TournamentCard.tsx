import React from "react";
import { Tournament } from "../../models/Tournament";
import { Link } from "react-router-dom";
import { CalendarToday, SportsTennis } from "@mui/icons-material";

type Props = {
  tournament: Tournament;
};

function TournamentCard({ tournament }: Props) {
  return (
    <Link
      to={`/tournament/${tournament.id}`}
      key={tournament.id}
      className="bg-white p-5 transition-all shadow-md flex flex-col justify-between hover:shadow-custom"
    >
      <div className="flex items-center space-x-2 h-10">
        {tournament.startDate <= new Date() &&
        tournament.endDate >= new Date() ? (
          <div>
            <span>Live</span>
            <SportsTennis />
          </div>
        ) : (
          <div>
            <span>See results</span>
            <SportsTennis />
          </div>
        )}
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">{tournament.name}</h2>
        <p className="text-sm text-gray-500">
          {tournament.ground.city}, {tournament.ground.country}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center text-gray-600">
          <CalendarToday />
          <p>
            {tournament.startDate.toLocaleDateString()} -{" "}
            {tournament.endDate.toLocaleDateString()}
          </p>
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

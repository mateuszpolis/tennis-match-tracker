import React from "react";
import { Link } from "react-router-dom";
import TournamentEditionCard from "../../../components/global/TournamentEditionCard";
import { Tournament } from "../../../models/Tournament";

type Props = {
  tournament: Tournament;
};

function RecentTournamentEditions({ tournament }: Props) {
  return (
    <div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2 text-primary">Ground</h2>
        <Link
          className="text-gray-600 underline"
          to={`/tennis-grounds/${tournament.ground.id}`}
        >
          <span className="font-semibold">{tournament.ground.name}</span>
        </Link>
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Recent Editions
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {tournament.editions?.map((edition) => (
            <TournamentEditionCard
              tournamentEdition={edition}
              key={edition.year}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentTournamentEditions;

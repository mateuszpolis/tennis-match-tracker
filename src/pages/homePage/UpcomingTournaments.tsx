import React from "react";
import TournamentEditionCard from "../../components/global/TournamentEditionCard";
import { TournamentEdition } from "../../models/TournamentEdition";

type Props = {
  tournaments: TournamentEdition[];
};

function UpcomingTournaments({ tournaments }: Props) {
  return (
    <div>
      <h2 className="text-4xl font-bold uppercase font-display text-background mb-6 drop-shadow-2xl">
        Upcoming Tournaments
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.length === 0 && (
          <div className="text-center text-2xl font-bold text-background">
            No upcoming tournaments
          </div>
        )}
        {tournaments.map((tournament) => (
          <TournamentEditionCard
            tournamentEdition={tournament}
            key={tournament.id}
          />
        ))}
      </div>
    </div>
  );
}

export default UpcomingTournaments;

import React from "react";
import { TournamentEdition } from "../../../../models/TournamentEdition";
import MatchCard from "../../../../components/global/MatchCard";

type Props = {
  tournamentEdition: TournamentEdition;
};

function TournamentMatches({ tournamentEdition }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-background">Matches</h2>
      <div className="p-2 space-y-2">
        {tournamentEdition.matches!.length === 0 && (
          <div className="text-background">No matches yet</div>
        )}
        {tournamentEdition.matches!.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}

export default TournamentMatches;

import React from "react";
import MatchCard from "../../components/global/MatchCard";
import { Match } from "../../models/Match";

type Props = {
  matches: Match[];
  playerId: number;
  didPlayerWin: (match: Match, playerId: number) => boolean;
};

function GameHistory({ matches, playerId, didPlayerWin }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold uppercase text-primary">
        Last matches
      </h2>
      <div className="space-y-2">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            result={didPlayerWin(match, playerId) ? "win" : "loss"}
          />
        ))}
      </div>
    </div>
  );
}

export default GameHistory;

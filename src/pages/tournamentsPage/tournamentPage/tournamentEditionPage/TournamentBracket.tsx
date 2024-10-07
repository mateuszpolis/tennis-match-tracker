import React from "react";
import MatchCard from "../../../../components/global/MatchCard";
import { Match } from "../../../../models/Match";

type TournamentBracketProps = {
  matches: Match[];
};

const TournamentBracket: React.FC<TournamentBracketProps> = ({ matches }) => {
  // Group matches by round
  const rounds: { [key: number]: Match[] } = matches.reduce((acc, match) => {
    const round = match.round ?? 1;
    if (!acc[round]) acc[round] = [];
    acc[round].push(match);
    return acc;
  }, {} as { [key: number]: Match[] });

  // Sort rounds by round number
  const sortedRounds = Object.keys(rounds).sort(
    (a, b) => Number(a) - Number(b)
  );

  return (
    <div className="tournament-bracket">
      {sortedRounds.map((round) => (
        <div className="round" key={round}>
          <h3>Round {round}</h3>
          <div className="matches">
            {rounds[Number(round)].map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TournamentBracket;

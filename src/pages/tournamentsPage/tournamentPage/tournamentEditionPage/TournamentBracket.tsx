import React from "react";
import { TournamentEdition } from "../../../../models/TournamentEdition";
import { Link } from "react-router-dom";
import { Match } from "../../../../models/Match";

type TournamentBracketProps = {
  tournamentEdition: TournamentEdition;
};

const TournamentBracket: React.FC<TournamentBracketProps> = ({
  tournamentEdition,
}) => {
  const numRounds = Math.log2(tournamentEdition.maximumNumberOfContestants);

  const matchesByRound: { [key: number]: Match[] } = {};

  for (let roundNumber = 1; roundNumber <= numRounds; roundNumber++) {
    matchesByRound[roundNumber] = [];
  }

  (tournamentEdition.matches ?? []).forEach((match) => {
    const round = match.round ?? 1;
    if (!matchesByRound[round]) {
      matchesByRound[round] = [];
    }
    matchesByRound[round].push(match);
  });

  const rounds = [];

  for (let roundNumber = 1; roundNumber <= numRounds; roundNumber++) {
    const totalMatches = Math.pow(2, numRounds - roundNumber);

    const matches = matchesByRound[roundNumber] || [];

    const roundMatches = [];

    for (let i = 0; i < totalMatches; i++) {
      if (matches[i]) {
        roundMatches.push(matches[i]);
      } else {
        roundMatches.push(null);
      }
    }

    rounds.push({ roundNumber, matches: roundMatches });
  }

  return (
    <div className="tournament-bracket w-full p-2 bg-white bg-opacity-80 backdrop-blur-sm">
      <h2 className="text-2xl font-bold font-display text-primary">
        Tournament Bracket
      </h2>
      <div className="bracket-grid grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        {rounds.map((round) => (
          <div className="round" key={round.roundNumber}>
            <h3 className="text-xl uppercase font-display text-primary font-bold text-center">
              {round.roundNumber === numRounds
                ? "Final"
                : round.roundNumber === numRounds - 1
                ? "Semi-Final"
                : `Round ${round.roundNumber}`}
            </h3>
            <div className="h-full flex flex-col justify-center">
              <div className="matches space-y-4">
                {round.matches.map((match, index) =>
                  match ? (
                    <Link
                      to={`/match/${match.id}`}
                      key={index}
                      className="match bg-white shadow rounded flex flex-col items-center justify-center divide-y p-2 hover:shadow-primary"
                    >
                      <div
                        className={`flex items-center w-full p-1
                          ${
                            round.roundNumber === numRounds &&
                            match.firstPlayerScore > match.secondPlayerScore
                              ? "bg-yellow-400"
                              : match.firstPlayerScore > match.secondPlayerScore
                              ? "bg-green-100"
                              : ""
                          }
                        `}
                      >
                        <div className="w-1/4">{match.firstPlayerScore}</div>
                        <div className="w-3/4">
                          {match.firstPlayer.name +
                            " " +
                            match.firstPlayer.surname}
                        </div>
                      </div>
                      <div
                        className={`flex items-center w-full p-1 ${
                          round.roundNumber === numRounds &&
                          match.secondPlayerScore > match.firstPlayerScore
                            ? "bg-yellow-400"
                            : match.firstPlayerScore < match.secondPlayerScore
                            ? "bg-green-100"
                            : ""
                        }`}
                      >
                        <div className="w-1/4">{match.secondPlayerScore}</div>
                        <div className="w-3/4">
                          {match.secondPlayer.name +
                            " " +
                            match.secondPlayer.surname}
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div
                      key={index}
                      className="match bg-gray-200 p-4 shadow rounded flex items-center justify-center"
                    >
                      TBD
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBracket;

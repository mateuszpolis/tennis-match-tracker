import React from "react";
import { StatComparison } from "../../components/pages/matchPage/StatComparison";
import { Match } from "../../models/Match";
import { Link } from "react-router-dom";
import MatchCard from "../../components/global/MatchCard";
import { UserRole } from "../../models/User";
import { useAuth } from "../../context/AuthContext";

type Props = {
  match: Match;
  lastMatches: Match[];
};

function MatchInfo({ match, lastMatches }: Props) {
  const { user } = useAuth();

  const { firstPlayer, secondPlayer, firstPlayerStats, secondPlayerStats } =
    match;

  return (
    <div
      className="p-8 space-y-10"
      style={{
        backgroundImage: `url(/match_page_background.webp)`,
      }}
    >
      <div className="flex justify-between items-start bg-white bg-opacity-80 backdrop-blur-sm p-5 md:flex-row flex-col">
        <div>
          {match.tournamentEdition ? (
            <Link
              to={`/tournaments/${match.tournamentEdition.tournament?.id}/edition/${match.tournamentEdition.year}`}
            >
              <p className="font-semibold underline">
                Tournament:{" "}
                {match.tournamentEdition.editionName +
                  " " +
                  match.tournamentEdition?.tournament?.name +
                  " " +
                  match.tournamentEdition?.year}
              </p>
            </Link>
          ) : (
            <p className="font-semibold">Friendly Game</p>
          )}

          <p className="font-semibold">
            Surface:{" "}
            <span
              className={`w-fit p-1 text-background rounded-md ${
                match.surface === "CLAY"
                  ? "bg-orange-700"
                  : match.surface === "GRASS"
                  ? "bg-green-700"
                  : "bg-blue-700"
              }`}
            >
              {match.surface}
            </span>
          </p>
          <Link to={`/tennis-grounds/${match.ground?.id}`}>
            <p className="font-semibold underline">
              Court: {match.ground?.name}
            </p>
          </Link>
          <p className="font-semibold">
            Location: {match.ground?.city}, {match.ground?.country}
          </p>

          <p className="font-semibold">
            Date: {new Date(match.date).toLocaleDateString()}
          </p>
        </div>
        {!match.finished &&
          (user?.role === UserRole.Admin ||
            user?.role === UserRole.Moderator) && (
            <Link
              to={`edit`}
              className="shadow-md p-4 text-background rounded-md bg-secondary hover:bg-accent hover:opacity-50 active:bg-primary w-fit hover:text-background font-semibold uppercase transition-all"
            >
              Fill in results
            </Link>
          )}
      </div>
      <div className="py-10 bg-white bg-opacity-80 backdrop-blur-sm p-5">
        <div className="text-4xl font-bold text-center mb-8 flex space-x-2 items-center justify-center">
          <Link
            className="hover:underline w-full text-right"
            to={`/player/${match.firstPlayer.id}`}
          >
            <span
              className={`${
                match.firstPlayerScore > match.secondPlayerScore
                  ? "text-gray-800"
                  : "text-gray-500"
              }`}
            >
              {firstPlayer.name + " " + firstPlayer.surname}
            </span>{" "}
          </Link>
          <span className="w-12">vs</span>
          <Link
            className="hover:underline w-full text-left"
            to={`/player/${match.secondPlayer.id}`}
          >
            <span
              className={`${
                match.secondPlayerScore > match.firstPlayerScore
                  ? "text-gray-800"
                  : "text-gray-500"
              }`}
            >
              {secondPlayer.name + " " + secondPlayer.surname}
            </span>
          </Link>
        </div>
        {match.finished ? (
          <h1 className="text-3xl font-bold text-center mb-8">
            {match.firstPlayerScore} : {match.secondPlayerScore}
          </h1>
        ) : (
          <h1 className="text-3xl font-bold text-center mb-8">
            The game has not yet been played
          </h1>
        )}

        {(!firstPlayerStats || !secondPlayerStats) && (
          <div className="mt-10">
            <h2 className="text-xl font-bold uppercase text-center">
              Stats not available for this game
            </h2>
          </div>
        )}

        {firstPlayerStats && secondPlayerStats && (
          <div className="mt-4">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-right font-semibold">{firstPlayer.name}</div>
              <div className="text-center font-semibold">Statistic</div>
              <div className="text-left font-semibold">{secondPlayer.name}</div>
            </div>
            <StatComparison
              statName="Aces"
              statCode="aces"
              player1Stat={firstPlayerStats.aces}
              player2Stat={secondPlayerStats.aces}
            />
            <StatComparison
              statName="Double Faults"
              statCode="doubleFaults"
              player1Stat={firstPlayerStats.doubleFaults}
              player2Stat={secondPlayerStats.doubleFaults}
            />
            <StatComparison
              statName="First Serve %"
              statCode="firstServePercentage"
              player1Stat={firstPlayerStats.firstServePercentage}
              player2Stat={secondPlayerStats.firstServePercentage}
            />
            <StatComparison
              statName="Points Won on 1st Serve"
              statCode="pointsWonOnFirstServe"
              player1Stat={firstPlayerStats.pointsWonOnFirstServe}
              player2Stat={secondPlayerStats.pointsWonOnFirstServe}
            />
            <StatComparison
              statName="Points Won on 2nd Serve"
              statCode="pointsWonOnSecondServe"
              player1Stat={firstPlayerStats.pointsWonOnSecondServe}
              player2Stat={secondPlayerStats.pointsWonOnSecondServe}
            />
            <StatComparison
              statName="Break Points Saved"
              statCode="breakPointsSaved"
              player1Stat={firstPlayerStats.breakPointsSaved}
              player2Stat={secondPlayerStats.breakPointsSaved}
            />
            <StatComparison
              statName="Break Points Converted"
              statCode="breakPointsConverted"
              player1Stat={firstPlayerStats.breakPointsConverted}
              player2Stat={secondPlayerStats.breakPointsConverted}
            />
            <StatComparison
              statName="Winners"
              statCode="winners"
              player1Stat={firstPlayerStats.winners}
              player2Stat={secondPlayerStats.winners}
            />
            <StatComparison
              statName="Unforced Errors"
              statCode="unforcedErrors"
              player1Stat={firstPlayerStats.unforcedErrors}
              player2Stat={secondPlayerStats.unforcedErrors}
            />
            <StatComparison
              statName="Net Points Won %"
              statCode="netPointsWon"
              player1Stat={firstPlayerStats.netPointsWon}
              player2Stat={secondPlayerStats.netPointsWon}
            />
            <StatComparison
              statName="Consecutive Points Won"
              statCode="consecutivePointsWon"
              player1Stat={firstPlayerStats.consecutivePointsWon}
              player2Stat={secondPlayerStats.consecutivePointsWon}
            />
            <StatComparison
              statName="Service Points Won %"
              statCode="servicePointsWon"
              player1Stat={firstPlayerStats.servicePointsWon}
              player2Stat={secondPlayerStats.servicePointsWon}
            />
            <StatComparison
              statName="Return Points Won %"
              statCode="returnPointsWon"
              player1Stat={firstPlayerStats.returnPointsWon}
              player2Stat={secondPlayerStats.returnPointsWon}
            />
          </div>
        )}
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold uppercase text-primary">H2H</h2>
        <div className="space-y-2">
          {lastMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MatchInfo;

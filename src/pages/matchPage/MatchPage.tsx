import React from "react";
import { Link, useParams } from "react-router-dom";
import { Match, PlayerStats } from "../../models/Match";
import { Surface } from "../../models/TennisGround";

// Sample player stats
const playerStats1: PlayerStats = {
  aces: 5,
  doubleFaults: 1,
  firstServePercentage: 60,
  pointsWonOnFirstServe: 69,
  pointsWonOnSecondServe: 68,
  breakPointsSaved: 60,
  returnPointsWonOnFirstServe: 25,
  returnPointsWonOnSecondServe: 39,
  breakPointsConverted: 50,
  winners: 32,
  unforcedErrors: 20,
  netPointsWon: 87,
  consecutivePointsWon: 7,
  servicePointsWon: 68,
  returnPointsWon: 30,
};

const playerStats2: PlayerStats = {
  aces: 11,
  doubleFaults: 0,
  firstServePercentage: 63,
  pointsWonOnFirstServe: 75,
  pointsWonOnSecondServe: 61,
  breakPointsSaved: 50,
  returnPointsWonOnFirstServe: 31,
  returnPointsWonOnSecondServe: 32,
  breakPointsConverted: 40,
  winners: 33,
  unforcedErrors: 33,
  netPointsWon: 73,
  consecutivePointsWon: 5,
  servicePointsWon: 70,
  returnPointsWon: 32,
};

// Mock matches
export const mockMatches = [
  {
    id: 1,
    firstPlayer: { name: "Player 1" },
    secondPlayer: { name: "Player 2" },
    firstPlayerScore: 3,
    secondPlayerScore: 2,
    firstPlayerStats: playerStats1,
    secondPlayerStats: playerStats2,
    surface: Surface.CLAY,
  },
] as Match[];

interface StatComparisonProps {
  statName: string;
  player1Stat: number;
  player2Stat: number;
}

const StatComparison: React.FC<StatComparisonProps> = ({
  statName,
  player1Stat,
  player2Stat,
}) => {
  const player1Better = player1Stat > player2Stat;
  const player2Better = player2Stat > player1Stat;

  const player1Width = (player1Stat / Math.max(player1Stat, player2Stat)) * 80;
  const player2Width = (player2Stat / Math.max(player1Stat, player2Stat)) * 80;

  return (
    <div className="grid grid-cols-3 gap-4 items-center py-2">
      <div
        className="flex items-center justify-end space-x-1"
        style={{ width: "100%" }}
      >
        <div className="flex items-center" style={{ width: "120px" }}>
          <div
            className="flex items-center justify-end"
            style={{ width: "80px" }}
          >
            <div
              className={`h-2 bg-primary ${
                player1Better ? "opacity-100" : "opacity-50"
              }`}
              style={{
                width: player1Width,
              }}
            ></div>
          </div>
          <div
            className={`text-right ${
              player1Better ? "font-bold text-green-500" : ""
            }`}
            style={{ width: "40px", textAlign: "right" }}
          >
            {player1Stat}
          </div>
        </div>
      </div>

      <div className="text-center font-semibold">{statName}</div>

      <div
        className="flex items-center justify-start space-x-1"
        style={{ width: "100%" }}
      >
        <div
          className="grid grid-cols-2 items-center"
          style={{ maxWidth: "80px" }}
        >
          <div
            className={`text-left ${
              player2Better ? "font-bold text-green-500" : ""
            }`}
            style={{ minWidth: "40px", textAlign: "left" }}
          >
            {player2Stat}
          </div>
          <div
            className={`h-2 bg-primary ${
              player2Better ? "opacity-100" : "opacity-50"
            }`}
            style={{
              width: player2Width,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

function MatchPage() {
  const { id } = useParams<{ id: string }>();

  const match = mockMatches.find((m) => m.id === parseInt(id!));

  if (!match) return <div>Match not found</div>;

  const { firstPlayer, secondPlayer, firstPlayerStats, secondPlayerStats } =
    match;

  return (
    <div className="p-8 divide-y space-y-2">
      <div>
        <div>
          {match.tournament ? (
            <Link to={`/tournament/${match.tournament.id}`}>
              <p className="font-semibold">
                Tournament: {match.tournament.name}
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

          <p className="font-semibold">
            Date: {new Date(match.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-bold text-center mb-8">
          <span
            className={`${
              match.firstPlayerScore > match.secondPlayerScore
                ? ""
                : "text-gray-800"
            }`}
          >
            {firstPlayer.name}
          </span>{" "}
          vs{" "}
          <span
            className={`${
              match.secondPlayerScore > match.firstPlayerScore
                ? ""
                : "text-gray-500"
            }`}
          >
            {secondPlayer.name}
          </span>
        </h1>
        <h1 className="text-3xl font-bold text-center mb-8">
          {match.firstPlayerScore} : {match.secondPlayerScore}
        </h1>

        <div className="grid grid-cols-3 gap-8">
          <div className="text-right font-semibold">{firstPlayer.name}</div>
          <div className="text-center font-semibold">Statistic</div>
          <div className="text-left font-semibold">{secondPlayer.name}</div>
        </div>

        {firstPlayerStats && secondPlayerStats && (
          <div className="mt-4">
            <StatComparison
              statName="Aces"
              player1Stat={firstPlayerStats.aces}
              player2Stat={secondPlayerStats.aces}
            />
            <StatComparison
              statName="Double Faults"
              player1Stat={firstPlayerStats.doubleFaults}
              player2Stat={secondPlayerStats.doubleFaults}
            />
            <StatComparison
              statName="First Serve %"
              player1Stat={firstPlayerStats.firstServePercentage}
              player2Stat={secondPlayerStats.firstServePercentage}
            />
            <StatComparison
              statName="Points Won on 1st Serve"
              player1Stat={firstPlayerStats.pointsWonOnFirstServe}
              player2Stat={secondPlayerStats.pointsWonOnFirstServe}
            />
            <StatComparison
              statName="Points Won on 2nd Serve"
              player1Stat={firstPlayerStats.pointsWonOnSecondServe}
              player2Stat={secondPlayerStats.pointsWonOnSecondServe}
            />
            <StatComparison
              statName="Break Points Saved"
              player1Stat={firstPlayerStats.breakPointsSaved}
              player2Stat={secondPlayerStats.breakPointsSaved}
            />
            <StatComparison
              statName="Break Points Converted"
              player1Stat={firstPlayerStats.breakPointsConverted}
              player2Stat={secondPlayerStats.breakPointsConverted}
            />
            <StatComparison
              statName="Winners"
              player1Stat={firstPlayerStats.winners}
              player2Stat={secondPlayerStats.winners}
            />
            <StatComparison
              statName="Unforced Errors"
              player1Stat={firstPlayerStats.unforcedErrors}
              player2Stat={secondPlayerStats.unforcedErrors}
            />
            <StatComparison
              statName="Net Points Won %"
              player1Stat={firstPlayerStats.netPointsWon}
              player2Stat={secondPlayerStats.netPointsWon}
            />
            <StatComparison
              statName="Consecutive Points Won"
              player1Stat={firstPlayerStats.consecutivePointsWon}
              player2Stat={secondPlayerStats.consecutivePointsWon}
            />
            <StatComparison
              statName="Service Points Won %"
              player1Stat={firstPlayerStats.servicePointsWon}
              player2Stat={secondPlayerStats.servicePointsWon}
            />
            <StatComparison
              statName="Return Points Won %"
              player1Stat={firstPlayerStats.returnPointsWon}
              player2Stat={secondPlayerStats.returnPointsWon}
            />
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold uppercase text-primary">H2H</h2>
    </div>
  );
}

export default MatchPage;

import React from "react";
import { Link } from "react-router-dom";
import { Match } from "../../models/Match";

type Props = {
  match: Match;
  result?: "win" | "loss" | "draw";
};

function MatchCard({ match, result = "draw" }: Props) {
  return (
    <Link
      to={`/match/${match.id}`}
      key={match.id}
      className={`bg-white p-2 shadow-md flex justify-between items-center hover:shadow-custom ${
        result === "win"
          ? "bg-green-100"
          : result === "loss"
          ? "bg-red-100"
          : ""
      }`}
    >
      <div className="text-lg">
        <p className="font-semibold">
          {match.firstPlayer.name + " " + match.firstPlayer.surname} vs.{" "}
          {match.secondPlayer.name + " " + match.secondPlayer.surname}
        </p>
        {match.finished ? (
          <p className="text-gray-600">
            Score:{" "}
            <span className="font-semibold">
              {match.firstPlayerScore} - {match.secondPlayerScore}
            </span>
          </p>
        ) : (
          <p className="text-gray-600">Upcoming match</p>
        )}
        <p className="text-gray-500 text-sm">
          Date: {new Date(match.date).toLocaleDateString("pl-PL")}
        </p>
      </div>

      {match.ground && (
        <div className="text-right">
          <p className="text-gray-600 text-sm">Ground: {match.ground.name}</p>
        </div>
      )}
    </Link>
  );
}

export default MatchCard;

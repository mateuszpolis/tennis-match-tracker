import React from "react";
import { Link } from "react-router-dom";
import { Match } from "../../models/Match";

type Props = {
  match: Match;
};

function MatchCard({ match }: Props) {
  return (
    <Link
      to={`/match/${match.id}`}
      key={match.id}
      className="bg-white p-2 shadow-md flex justify-between items-center hover:shadow-custom"
    >
      <div className="text-lg">
        <p className="font-semibold">
          {match.firstPlayer.name} vs. {match.secondPlayer.name}
        </p>
        <p className="text-gray-600">
          Score:{" "}
          <span className="font-semibold">
            {match.firstPlayerScore} - {match.secondPlayerScore}
          </span>
        </p>
        <p className="text-gray-500 text-sm">
          Date: {match.date.toLocaleDateString("pl-PL")}
        </p>
      </div>

      <div className="text-right">
        <p className="text-gray-600 text-sm">Ground: {match.ground.name}</p>
      </div>
    </Link>
  );
}

export default MatchCard;

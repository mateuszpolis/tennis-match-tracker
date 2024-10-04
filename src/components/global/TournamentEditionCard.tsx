import { SportsTennis } from "@mui/icons-material";
import React from "react";
import { TournamentEdition } from "../../models/TournamentEdition";
import { Link } from "react-router-dom";

type Props = {
  tournamentEdition: TournamentEdition;
};

function TournamentEditionCard({ tournamentEdition }: Props) {
  return (
    <Link
      to={`/tournament/${tournamentEdition.year}`}
      key={tournamentEdition.year + tournamentEdition.tournamentId}
      className="bg-white p-5 transition-all shadow-md flex flex-col justify-between hover:shadow-custom"
    >
      {" "}
      <div className="flex items-center space-x-2 h-10">
        {tournamentEdition.startDate <= new Date() &&
        tournamentEdition.endDate >= new Date() ? (
          <div>
            <span>Live</span>
            <SportsTennis />
          </div>
        ) : (
          <div>
            <span>See results</span>
            <SportsTennis />
          </div>
        )}
      </div>
    </Link>
  );
}

export default TournamentEditionCard;

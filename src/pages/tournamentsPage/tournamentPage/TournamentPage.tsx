import React, { useEffect, useState } from "react";
import { Tournament } from "../../../models/Tournament";
import { Link, useNavigate, useParams } from "react-router-dom";
import MatchCard from "../../../components/global/MatchCard";
import { useTournament } from "../../../context/TournamentContext";
import { toast } from "react-toastify";
import TournamentEditionCard from "../../../components/global/TournamentEditionCard";
import { CalendarToday } from "@mui/icons-material";

function TournamentPage() {
  const { id } = useParams();

  const { getTournament } = useTournament();
  const [tournament, setTournament] = useState<Tournament | null>(null);

  const fetchTournament = async () => {
    try {
      setTournament(await getTournament(Number(id!)));
    } catch (e: any) {
      toast.error("Failed to fetch tournament.");
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/tournaments");
    }
    fetchTournament();
  }, []);

  if (!tournament) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="bg-white p-6 shadow-md space-y-3">
        <h1 className="text-4xl font-bold mb-4">{tournament.name}</h1>
        <p className="text-lg text-gray-700 mb-2">
          {tournament.ground.city}, {tournament.ground.country}
        </p>
        <div
          className={`w-fit p-1 rounded-md ${
            tournament.surface === "CLAY"
              ? "bg-orange-700"
              : tournament.surface === "GRASS"
              ? "bg-green-700"
              : "bg-blue-700"
          }`}
        >
          <p className={`text-background`}>
            Surface: <span className="font-semibold">{tournament.surface}</span>
          </p>
        </div>
        <div className="flex items-center text-gray-600">
          <CalendarToday />
          <p>Since: {new Date(tournament.createdAt).getFullYear()}</p>
        </div>
        <div className="text-gray-600">{tournament.ground.description}</div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2 text-primary">Ground</h2>
        <Link
          className="text-gray-600 underline"
          to={`/tennis-grounds/${tournament.ground.id}`}
        >
          <span className="font-semibold">{tournament.ground.name}</span>
        </Link>
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Recent Editions
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {tournament.editions?.map((edition) => (
            <TournamentEditionCard
              tournamentEdition={edition}
              key={edition.year}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TournamentPage;

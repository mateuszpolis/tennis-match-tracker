import React, { useEffect, useState } from "react";
import { Tournament } from "../../../models/Tournament";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useTournament } from "../../../context/TournamentContext";
import { toast } from "react-toastify";
import TournamentEditionCard from "../../../components/global/TournamentEditionCard";
import { CalendarToday } from "@mui/icons-material";
import AddTournamentEditionPage from "./addTournamentEditionPage/AddTournamentEditionPage";
import { Button } from "@mui/material";
import TournamentEditionPage from "./tournamentEditionPage/TournamentEditionPage";
import RecentTournamentEditions from "./RecentTournamentEditions";

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
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold mb-4">{tournament.name}</h1>
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              navigate(`create`);
            }}
          >
            Create new edition
          </Button>
        </div>
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
      <Routes>
        <Route
          path="/"
          element={<RecentTournamentEditions tournament={tournament} />}
        />
        <Route
          path="/edition/:year"
          element={<TournamentEditionPage tournamentId={tournament.id} />}
        />
        <Route
          path="create"
          element={<AddTournamentEditionPage tournamentId={tournament.id} />}
        />
      </Routes>
    </div>
  );
}

export default TournamentPage;

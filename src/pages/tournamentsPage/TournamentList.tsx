import { Add, PlusOne } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTournament } from "../../context/TournamentContext";
import { Tournament } from "../../models/Tournament";
import { toast } from "react-toastify";
import TournamentCard from "../../components/global/TournamentCard";
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../models/User";

function TournamentList() {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();

  const { fetchTournaments } = useTournament();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  const getTournaments = async () => {
    try {
      setTournaments(await fetchTournaments());
    } catch (e: any) {
      toast.error(e.response.data.message || "Failed to fetch tournaments");
    }
  };

  useEffect(() => {
    getTournaments();
  }, []);

  return (
    <div className="p-2 md:p-8">
      {isAuthenticated && user?.role === UserRole.Admin && (
        <Button
          size="small"
          color="success"
          onClick={() => {
            navigate("add");
          }}
          endIcon={<Add />}
        >
          Add new Tournament
        </Button>
      )}
      <h1 className="text-2xl font-bold uppercase text-primary">
        List of Tournaments:
      </h1>
      <div className="p-3 space-y-2">
        {tournaments.map((tournament) => (
          <TournamentCard tournament={tournament} key={tournament.id} />
        ))}
      </div>
    </div>
  );
}

export default TournamentList;

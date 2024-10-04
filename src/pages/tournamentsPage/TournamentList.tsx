import { PlusOne } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTournament } from "../../context/TournamentContext";
import { Tournament } from "../../models/Tournament";
import { toast } from "react-toastify";
import TournamentCard from "../../components/global/TournamentCard";

function TournamentList() {
  const navigate = useNavigate();

  const { fetchTournaments } = useTournament();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  const getTournaments = async () => {
    try {
      setTournaments(await fetchTournaments());
    } catch (e: any) {
      toast.error("Failed to fetch tournaments");
    }
  };

  useEffect(() => {
    getTournaments();
  }, []);

  return (
    <div>
      <Button
        size="small"
        color="success"
        variant="outlined"
        onClick={() => {
          navigate("add");
        }}
        endIcon={<PlusOne />}
      >
        Add new Tournament
      </Button>
      <h1 className="text-2xl font-bold uppercase text-primary">
        List of Tennis Grounds:
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

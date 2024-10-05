import React, { useEffect, useState } from "react";
import { useTournament } from "../../context/TournamentContext";
import { TournamentEdition } from "../../models/TournamentEdition";
import { toast } from "react-toastify";
import TournamentEditionCard from "../../components/global/TournamentEditionCard";

function HomePage() {
  const { getTournamentEditions } = useTournament();
  const [tournaments, setTournaments] = useState<TournamentEdition[]>([]);

  const fetchUpcomingTournaments = async () => {
    try {
      setTournaments(
        await getTournamentEditions({
          startDateAfter: new Date(),
        })
      );
    } catch (e: any) {
      toast.error(
        e.response.data.message || "Failed to fetch upcoming tournaments"
      );
    }
  };

  useEffect(() => {
    fetchUpcomingTournaments();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold uppercase text-primary mb-6">
        Upcoming Tournaments
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <TournamentEditionCard tournamentEdition={tournament} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;

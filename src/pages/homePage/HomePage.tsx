import React, { useEffect, useState } from "react";
import { useTournament } from "../../context/TournamentContext";
import { TournamentEdition } from "../../models/TournamentEdition";
import { toast } from "react-toastify";
import UpcomingTournaments from "./UpcomingTournaments";
import Information from "./Information";

function HomePage() {
  const { getTournamentEditions } = useTournament();
  const [tournaments, setTournaments] = useState<TournamentEdition[]>([]);

  useEffect(() => {
    document.title = `TTM - Home`;
  }, []);

  const fetchUpcomingTournaments = async () => {
    try {
      setTournaments(
        await getTournamentEditions({
          endDateAfter: new Date(),
          isFinished: "no"
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
    <div
      className="bg-cover bg-center min-h-screen space-y-10"
      style={{
        backgroundImage: `url("home_page_background.webp")`,
      }}
    >
      <div className="p-8">
        <UpcomingTournaments tournaments={tournaments} />
      </div>
      <Information />
    </div>
  );
}

export default HomePage;

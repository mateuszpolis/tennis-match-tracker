import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { useTournament } from "../../context/TournamentContext";
import { TournamentEdition } from "../../models/TournamentEdition";
import TournamentEditionCard from "../../components/global/TournamentEditionCard";
import { useMatch } from "../../context/MatchContext";
import { Match } from "../../models/Match";
import MatchCard from "../../components/global/MatchCard";

function ProfilePage() {
  const { user, logout } = useAuth();
  const { getTournamentEditionsForUser } = useTournament();
  const { getMatchesForUser } = useMatch();

  const [tournaments, setTournaments] = useState<TournamentEdition[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  const fetchTournaments = async () => {
    const data = await getTournamentEditionsForUser(user?.id!);
    setTournaments(data);
  };

  const fetchMatches = async () => {
    const data = await getMatchesForUser(user?.id!);
    setMatches(data);
  };

  useEffect(() => {
    fetchTournaments();
    fetchMatches();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-2 text-primary">
          <h2 className="text-2xl font-bold font-display">Hi, {user?.name}</h2>
          <WavingHandIcon />
        </div>
        <Button
          variant="contained"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </Button>
      </div>
      <div>
        <h2 className="text-2xl font-bold font-display mt-8">
          Upcoming games:
        </h2>
        <div className="space-y-2">
          {matches.length === 0 && (
            <div className="text-lg text-gray-500">No upcoming games.</div>
          )}
          {matches.map((match) => (
            <MatchCard match={match} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold font-display mt-8">
          Your tournaments:
        </h2>
        <div className="space-y-2">
          {tournaments.length === 0 && (
            <div className="text-lg text-gray-500">
              You have not participated in any tournaments yet.
            </div>
          )}
          {tournaments.map((tournament) => (
            <TournamentEditionCard tournamentEdition={tournament} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

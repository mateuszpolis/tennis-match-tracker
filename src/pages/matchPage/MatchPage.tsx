import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Match } from "../../models/Match";
import { useMatch } from "../../context/MatchContext";
import { toast } from "react-toastify";
import MatchInfo from "./MatchInfo";
import AddMatchPage from "./addMatchPage/AddMatchPage";
import PrivateRoute from "../../components/global/PrivateRoute";
import { UserRole } from "../../models/User";

function MatchPage() {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [lastMatches, setLastMatches] = useState<Match[]>([]);
  const { getMatch } = useMatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await getMatch(Number(id));
        setMatch(response.match);
        setLastMatches(response.lastMatches);
      } catch (e: any) {
        toast.error(
          e.response.data.message || "Failed to fetch upcoming tournaments"
        );
      }
    };

    if (!id) {
      toast.error("Invalid match id");
      navigate("/");
    }
    fetchMatch();
  }, [getMatch, id, navigate]);

  useEffect(() => {
    document.title = `TTM - ${
      match?.firstPlayer?.name + " " + match?.firstPlayer.surname
    } vs ${match?.secondPlayer?.name + " " + match?.secondPlayer.surname}`;
  }, []);

  if (!match) return <div>Match not found</div>;

  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={<MatchInfo match={match} lastMatches={lastMatches} />}
        />

        <Route
          path="edit"
          element={
            <PrivateRoute checkRole={[UserRole.Admin, UserRole.Moderator]}>
              <AddMatchPage match={match} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default MatchPage;

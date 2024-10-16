import React, { useEffect, useState } from "react";
import { Tournament } from "../../../models/Tournament";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useTournament } from "../../../context/TournamentContext";
import { toast } from "react-toastify";
import { Add, CalendarToday, Delete, Edit } from "@mui/icons-material";
import AddTournamentEditionPage from "./addTournamentEditionPage/AddTournamentEditionPage";
import { Button, IconButton } from "@mui/material";
import TournamentEditionPage from "./tournamentEditionPage/TournamentEditionPage";
import RecentTournamentEditions from "./RecentTournamentEditions";
import { useAuth } from "../../../context/AuthContext";
import { UserRole } from "../../../models/User";
import { confirmAlert } from "react-confirm-alert";
import LoadingScreen from "../../../components/global/LoadingScreen";
import PrivateRoute from "../../../components/global/PrivateRoute";
import AddTournamentPage from "../addTournamentPage/AddTournamentPage";

function TournamentPage() {
  const { user, isAuthenticated } = useAuth();

  const { id } = useParams();

  const { getTournament, deleteTournament } = useTournament();
  const [tournament, setTournament] = useState<Tournament | null>(null);

  const removeTournament = async () => {
    const toastId = toast.loading("Removing tournament edition...");
    try {
      await deleteTournament(tournament!.id);

      toast.update(toastId, {
        render: "Tournament edition removed successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate(`/tournaments`);
    } catch (e: any) {
      toast.update(toastId, {
        render:
          e.response.data.message || "Failed to remove tournament edition",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const showRemoveConfirmation = () => {
    confirmAlert({
      title: "Confirm to remove",
      message: "Are you sure you want to remove this tournament edition?",
      buttons: [
        {
          label: "Yes",
          onClick: () => removeTournament(),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const fetchTournament = async () => {
    try {
      setTournament(await getTournament(Number(id!)));
    } catch (e: any) {
      toast.error(e.response.data.message || "Failed to fetch tournament.");
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
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route
        path="/edit"
        element={
          <PrivateRoute checkRole={UserRole.Admin}>
            <AddTournamentPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/*"
        element={
          <div
            className="p-2 md:p-8 min-h-[85vh]"
            style={{
              backgroundImage: `url(/tournament_page_background.webp)`,
            }}
          >
            <div className="space-y-3 bg-white bg-opacity-70 backdrop-blur-md p-4">
              <div className="flex items-center justify-between md:flex-row flex-col">
                <h1 className="text-6xl font-bold mb-4 drop-shadow-xl font-display text-primary">
                  {tournament.name}
                </h1>
                {isAuthenticated && user?.role === UserRole.Admin && (
                  <div className="flex items-center space-x-2">
                    <IconButton
                      color="success"
                      onClick={() => {
                        navigate(`create`);
                      }}
                    >
                      <Add sx={{ fontSize: 40 }} />
                    </IconButton>
                    <IconButton
                      onClick={() => navigate(`edit`)}
                      color="primary"
                      size="large"
                    >
                      <Edit sx={{ fontSize: 40 }} />
                    </IconButton>
                    <IconButton onClick={showRemoveConfirmation} color="error">
                      <Delete sx={{ fontSize: 40 }} />
                    </IconButton>
                  </div>
                )}
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
                  Surface:{" "}
                  <span className="font-semibold">{tournament.surface}</span>
                </p>
              </div>
              <div className="flex items-center text-gray-600">
                <CalendarToday />
                <p>Since: {new Date(tournament.createdAt).getFullYear()}</p>
              </div>
            </div>
            <Routes>
              <Route
                path="/"
                element={<RecentTournamentEditions tournament={tournament} />}
              />
              <Route
                path="/edition/:year/*"
                element={<TournamentEditionPage tournamentId={tournament.id} />}
              />
              <Route
                path="create"
                element={
                  <PrivateRoute checkRole={UserRole.Admin}>
                    <AddTournamentEditionPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        }
      />
    </Routes>
  );
}

export default TournamentPage;

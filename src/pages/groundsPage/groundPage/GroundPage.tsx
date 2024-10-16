import React, { useEffect, useState } from "react";
import TournamentCard from "../../../components/global/TournamentCard";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useTennisGround } from "../../../context/TennisGroundContext";
import { TennisGround } from "../../../models/TennisGround";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import LoadingScreen from "../../../components/global/LoadingScreen";
import { Icon, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useAuth } from "../../../context/AuthContext";
import { UserRole } from "../../../models/User";
import PrivateRoute from "../../../components/global/PrivateRoute";
import AddGroundPage from "../addGroundPage/AddGroundPage";

function GroundPage() {
  const { id } = useParams();

  const { user, isAuthenticated } = useAuth();

  const { getGround } = useTennisGround();
  const [ground, setGround] = useState<TennisGround | null>(null);

  const getTennisGround = async () => {
    try {
      setGround(await getGround(Number(id!)));
    } catch (e: any) {
      toast.error(e.response.data.message || "Error loading tennis ground");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      toast.error("No Tennis Ground found");
      navigate("/tennis-grounds");
    }
    getTennisGround();
  }, [id, navigate]);

  const { deleteGround } = useTennisGround();

  const removeGround = async () => {
    const toastId = toast.loading("Removing tournament edition...");
    try {
      await deleteGround(ground!.id);

      toast.update(toastId, {
        render: "Tournament edition removed successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate(`/tennis-grounds`);
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
          onClick: () => removeGround(),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  if (!ground) {
    return <LoadingScreen />;
  }

  const backgroundUrl = `/tennis_ground_${ground.surface.toLowerCase()}.webp`;

  return (
    <Routes>
      <Route
        path="/edit"
        element={
          <PrivateRoute checkRole={UserRole.Admin}>
            <AddGroundPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/"
        element={
          <div
            className="p-2 md:p-8 min-h-screen bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundUrl})`,
            }}
          >
            <div className="bg-white bg-opacity-70 backdrop-blur-md p-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-6xl font-bold mb-4 drop-shadow-xl font-display text-primary">
                  {ground.name}
                </h1>
                {isAuthenticated && user?.role === UserRole.Admin && (
                  <div>
                    <IconButton
                      onClick={() => navigate("edit")}
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

              <p className="mb-2">{ground.description}</p>
              <p className="mb-2">
                <strong>Construction Date:</strong>{" "}
                {new Date(ground.constructionDate).toLocaleDateString("pl-PL")}
              </p>
              <p className="mb-2">
                <strong>Location:</strong> {ground.city}, {ground.country}
              </p>
              <div
                className={`text-xs text-background font-semibold py-1 px-2 w-fit rounded ${
                  ground.surface === "CLAY"
                    ? "bg-orange-700"
                    : ground.surface === "GRASS"
                    ? "bg-green-700"
                    : "bg-blue-700"
                }`}
              >
                {ground.surface}
              </div>
            </div>

            <h2 className="text-4xl font-bold mt-8 mb-4 uppercase text-white font-display">
              Tournaments Held
            </h2>
            {ground.tournaments && ground.tournaments.length > 0 ? (
              <ul className="list-disc space-y-2">
                {ground.tournaments.map((tournament) => (
                  <TournamentCard tournament={tournament} key={tournament.id} />
                ))}
              </ul>
            ) : (
              <p>No tournaments have been held at this ground.</p>
            )}
          </div>
        }
      />
    </Routes>
  );
}

export default GroundPage;

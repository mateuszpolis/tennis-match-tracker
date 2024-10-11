import React, { useEffect, useState } from "react";
import TournamentCard from "../../../components/global/TournamentCard";
import { useNavigate, useParams } from "react-router-dom";
import { useTennisGround } from "../../../context/TennisGroundContext";
import { TennisGround } from "../../../models/TennisGround";
import { toast } from "react-toastify";

function GroundPage() {
  const { id } = useParams();

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

  if (!ground) {
    return <div>Loading...</div>;
  }

  const backgroundUrl = `/tennis_ground_${ground.surface.toLowerCase()}.webp`;

  return (
    <div
      className="p-8 min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
      }}
    >
      <div className="bg-white bg-opacity-70 backdrop-blur-md p-4">
        <h1 className="text-6xl font-bold mb-4 drop-shadow-xl font-display text-primary">
          {ground.name}
        </h1>

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
            <TournamentCard tournament={tournament} />
          ))}
        </ul>
      ) : (
        <p>No tournaments have been held at this ground.</p>
      )}
    </div>
  );
}

export default GroundPage;

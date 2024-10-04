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
      toast.error("Error loading tennis ground");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      toast.error("No Tennis Ground found");
      navigate("/tennis-grounds");
    }
    getTennisGround();
  });

  if (!ground) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">{ground.name}</h1>
      <p className="mb-2">{ground.description}</p>
      <p className="mb-2">
        <strong>Construction Date:</strong>{" "}
        {new Date(ground.constructionDate).toLocaleDateString("pl")}
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

      <h2 className="text-3xl font-bold mt-8 mb-4">Tournaments Held</h2>
      {ground.tournaments && ground.tournaments.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
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

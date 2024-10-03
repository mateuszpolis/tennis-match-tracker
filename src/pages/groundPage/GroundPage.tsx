import React from "react";
import { Surface, TennisGround } from "../../models/TennisGround";
import { Tournament } from "../../models/Tournament";
import TournamentCard from "../../components/global/TournamentCard";

const mockTournaments: Tournament[] = [
  {
    id: 1,
    name: "Clay Masters",
    surface: Surface.CLAY,
    startDate: new Date("2023-04-01"),
    endDate: new Date("2023-04-10"),
    ground: {} as TennisGround,
  },
  {
    id: 2,
    name: "Grass Open",
    surface: Surface.GRASS,
    startDate: new Date("2023-06-15"),
    endDate: new Date("2023-06-22"),
    ground: {} as TennisGround,
  },
];

const mockGround: TennisGround = {
  id: 1,
  name: "Central Park Tennis Center",
  description:
    "A premier tennis facility located in the heart of Central Park.",
  constructionDate: new Date("2000-05-20"),
  country: "USA",
  city: "New York",
  surface: Surface.HARD,
  tournaments: mockTournaments,
};

mockTournaments.forEach((tournament) => {
  tournament.ground = mockGround;
});

function GroundPage() {
  const {
    name,
    description,
    constructionDate,
    country,
    city,
    surface,
    tournaments,
  } = mockGround;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">{name}</h1>
      <p className="mb-2">{description}</p>
      <p className="mb-2">
        <strong>Construction Date:</strong> {constructionDate.toDateString()}
      </p>
      <p className="mb-2">
        <strong>Location:</strong> {city}, {country}
      </p>
      <div
        className={`text-xs text-background font-semibold py-1 px-2 w-fit rounded ${
          surface === "CLAY"
            ? "bg-orange-700"
            : surface === "GRASS"
            ? "bg-green-700"
            : "bg-blue-700"
        }`}
      >
        {surface}
      </div>

      <h2 className="text-3xl font-bold mt-8 mb-4">Tournaments Held</h2>
      {tournaments && tournaments.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
          {tournaments.map((tournament) => (
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

import React from "react";
import { Tournament } from "../../models/Tournament";
import { Match } from "../../models/Match";
import { UserRole, UserStatus } from "../../models/User";
import { Link } from "react-router-dom";
import { Surface } from "../../models/TennisGround";
import MatchCard from "../../components/global/MatchCard";

const tournament = {
  id: 2,
  name: "Wimbledon",
  surface: "GRASS",
  // startDate: new Date(2024, 6, 1),
  // endDate: new Date(2024, 6, 14),
  ground: {
    id: 2,
    name: "All England Lawn Tennis and Croquet Club",
    description:
      "The prestigious venue for Wimbledon, the oldest tennis tournament in the world.",
    constructionDate: new Date(1877, 6, 9),
    country: "United Kingdom",
    city: "London",
  },
} as Tournament;

const matches: Match[] = [
  {
    id: 1,
    firstPlayer: {
      id: 1,
      name: "Novak Djokovic",
      email: "",
      surname: "",
      role: UserRole.USER,
      status: UserStatus.Active,
    },
    secondPlayer: {
      id: 2,
      name: "Roger Federer",
      email: "",
      surname: "",
      role: UserRole.USER,
      status: UserStatus.Active,
    },
    date: new Date(2024, 6, 3),
    firstPlayerScore: 6,
    secondPlayerScore: 4,
    ground: tournament.ground,
    tournament: tournament,
    surface: Surface.CLAY,
  },
  {
    id: 2,
    firstPlayer: {
      id: 3,
      name: "Rafael Nadal",
      email: "",
      surname: "",
      role: UserRole.USER,
      status: UserStatus.Active,
    },
    secondPlayer: {
      id: 4,
      name: "Andy Murray",
      email: "",
      surname: "",
      role: UserRole.USER,
      status: UserStatus.Active,
    },
    date: new Date(2024, 6, 4),
    firstPlayerScore: 7,
    secondPlayerScore: 5,
    ground: tournament.ground,
    tournament: tournament,
    surface: Surface.CLAY,
  },
];

function TournamentPage() {
  return (
    <div className="p-8">
      <div className="bg-white p-6 shadow-md">
        <h1 className="text-4xl font-bold mb-4">{tournament.name}</h1>
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
            Surface: <span className="font-semibold">{tournament.surface}</span>
          </p>
        </div>
        <p className="text-gray-600">
          Dates:{" "}
          <span className="font-semibold">
            {/* {tournament.startDate.toLocaleDateString()} -{" "}
            {tournament.endDate.toLocaleDateString()} */}
          </span>
        </p>
        <p className="text-gray-600">{tournament.ground.description}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2 text-primary">Ground</h2>
        <Link className="text-gray-600 underline" to={`/ground/${tournament.ground.id}`}>
          <span className="font-semibold">{tournament.ground.name}</span>
        </Link>
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4 text-primary">Recent Matches</h2>
        <div className="grid grid-cols-1 gap-4">
          {matches.map((match) => (
            <MatchCard match={match} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TournamentPage;
